import React, {
  MutableRefObject,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useIntl } from 'react-intl';
import { Col, Container, Row, ScreenClassMap } from 'react-grid-system';
import {
  Form,
  Formik,
  FormikConfig,
  FormikProps,
  useFormikContext,
} from 'formik';
import * as Yup from 'yup';
import { IntlShape } from 'react-intl/src/types';
import { CountryCode } from 'libphonenumber-js/types';
import { useSelector } from 'react-redux';

import { colors, fontSizes, themeColors } from 'theme';

import phoneTypesMessages from 'global/i18n/phoneTypesMessages';
import validatorsMessages from 'global/i18n/validatorsMessages';
import { zipCodeRegex } from 'global/constants';
import sexMessages from 'global/i18n/sexMessages';

import {
  HfhsPatientData,
  HfhsPatientDetail,
  HfhsPatientDetailAnonymized,
  PhoneType,
  Sex,
} from 'models/HfhsPatient';
import { ApiMessageError } from 'models/Api';
import { QuestionTypes } from 'models/Question';

import { nameValidationSchema } from 'utils/validators';
import { getUTCDateString } from 'utils/dateUtils';

import { makeSelectInterventionFixedElementsDirection } from 'global/reducers/globalState';

import Box from 'components/Box';
import { SelectOption } from 'components/Select/types';
import FormikInput from 'components/FormikInput';
import FormikSelect from 'components/FormikSelect';
import FormikDatePicker from 'components/FormikDatePicker';
import Text from 'components/Text';
import Button from 'components/Button';
import { HelpIconTooltip } from 'components/HelpIconTooltip';
import {
  DEFAULT_COUNTRY_CODE,
  FormikPhoneNumberInput,
  phoneNumberSchema,
} from 'components/FormikPhoneNumberInput';
import Tabs from 'components/Tabs';
import AztecQRScanner from 'components/AztecQRScanner/Loadable';

import { formatPhoneNumberForHfhs, parsePhoneNumberFromHfhs } from '../utils';
import { ActionButtons } from '../components/ActionButtons';
import { ApiErrorMessage } from '../components/ApiErrorMessage';
import answerSessionPageMessages from '../messages';
import messages from './messages';

const inputStyles = {
  width: '100%',
  bg: themeColors.highlight,
  opacity: 1,
};

const selectStyles = {
  placeholderOpacity: 0.54,
  placeholderColorActive: colors.bluewood,
  placeholderColorDisabled: colors.casper,
  valueColorDisabled: colors.casper,
};

export type PatientDataFormValues = Pick<
  HfhsPatientData,
  'firstName' | 'lastName' | 'zipCode' | 'mrn'
> & {
  sexOption: Nullable<SelectOption<Sex>>;
  dobDate: Nullable<Date>;
  phoneTypeOption: Nullable<SelectOption<PhoneType>>;
  iso: Nullable<SelectOption<CountryCode>>;
  number: string;
};

const schema = (formatMessage: IntlShape['formatMessage']) =>
  Yup.object()
    .shape({
      firstName: nameValidationSchema(formatMessage),
      lastName: nameValidationSchema(formatMessage),
      sexOption: Yup.object().nullable(),
      dobDate: Yup.date().nullable(),
      zipCode: Yup.string()
        .trim()
        .matches(zipCodeRegex, formatMessage(validatorsMessages.zipCode)),
      phoneTypeOption: Yup.object().nullable(),
    })
    // @ts-ignore
    .concat(phoneNumberSchema(formatMessage, false, true));

enum PatientDataFormError {
  BASE_DATA_VERIFICATION,
  MRN_VERIFICATION,
}

// Tabs unmounts the inactive pane; keep typed values across a tab round-trip.
const KeepDraftValues = ({
  draftRef,
}: {
  draftRef: MutableRefObject<Nullable<PatientDataFormValues>>;
}) => {
  const { values } = useFormikContext<PatientDataFormValues>();
  useEffect(() => {
    // eslint-disable-next-line no-param-reassign
    draftRef.current = values;
  }, [values]);
  return null;
};

const emptyInitialValues: PatientDataFormValues = {
  firstName: '',
  lastName: '',
  sexOption: null,
  dobDate: null,
  zipCode: '',
  phoneTypeOption: null,
  iso: {
    value: DEFAULT_COUNTRY_CODE,
    label: '',
  },
  number: '',
  mrn: '',
};

export type Props = {
  forceMobile?: boolean;
  disabled?: boolean;
  onSubmitPatientData?: (patientData: HfhsPatientData) => void;
  onQRCodeScan?: (decodedString: string) => void;
  verifying?: boolean;
  verifyingError?: Nullable<ApiMessageError>;
  hfhsPatientDetail?: Nullable<HfhsPatientDetail>;
  hfhsPatientDetailAnonymized?: Nullable<HfhsPatientDetailAnonymized>;
  previewMedicalNumberInput?: boolean;
  continueButtonDisabled?: boolean;
  qrVerifying?: boolean;
  qrVerifyingError?: Nullable<ApiMessageError>;
  onTogglePatientDataDisplay?: () => void;
  showPatientDataDisplay?: boolean;
};

const HenryFordInitialScreenLayout = ({
  forceMobile,
  disabled,
  onSubmitPatientData,
  onQRCodeScan,
  verifying = false,
  verifyingError,
  hfhsPatientDetail,
  hfhsPatientDetailAnonymized,
  previewMedicalNumberInput,
  continueButtonDisabled,
  qrVerifying = false,
  qrVerifyingError,
  onTogglePatientDataDisplay,
  showPatientDataDisplay,
}: Props) => {
  const { formatMessage } = useIntl();

  const fixedElementsDirection = useSelector(
    makeSelectInterventionFixedElementsDirection(),
  );

  const [activeTab, setActiveTab] = useState(
    formatMessage(messages.enterManuallyTab),
  );

  const isVerifying = verifying || qrVerifying;

  const isManualInputDisabled = disabled;

  const handleTabChange = (tab: string) => {
    if (!isVerifying) setActiveTab(tab);
  };

  // `verifyingError` is shared; the confirm screen shows it only after its own Continue.
  const [qrContinueSubmitted, setQrContinueSubmitted] = useState(false);

  const manualDraftRef = useRef<Nullable<PatientDataFormValues>>(null);

  const isConfirmScreenShown = Boolean(
    showPatientDataDisplay && hfhsPatientDetailAnonymized,
  );
  const confirmHeadingRef = useRef<HTMLElement>(null);

  // The scanner unmounts here; keep focus from dropping to <body>.
  useEffect(() => {
    if (isConfirmScreenShown) confirmHeadingRef.current?.focus();
  }, [isConfirmScreenShown]);

  const columnClassMap: ScreenClassMap<number> = {
    xs: 12,
    sm: forceMobile ? 12 : 6,
  };

  const sexSelectOptions: MutableRefObject<SelectOption<Sex>[]> = useRef(
    Object.values(Sex).map((sex) => ({
      value: sex,
      label: formatMessage(sexMessages[sex]),
    })),
  );

  const phoneTypeSelectOptions: MutableRefObject<SelectOption<PhoneType>[]> =
    useRef(
      Object.values(PhoneType).map((phoneType) => ({
        value: phoneType,
        label: formatMessage(phoneTypesMessages[phoneType]),
      })),
    );

  const detailInitialValues: Nullable<PatientDataFormValues> = useMemo(() => {
    if (!hfhsPatientDetail) return null;
    const {
      sex,
      dob,
      phoneNumber,
      phoneType,
      firstName,
      lastName,
      zipCode,
      ...restValues
    } = hfhsPatientDetail;

    const parsedPhone = phoneNumber
      ? parsePhoneNumberFromHfhs(phoneNumber)
      : undefined;

    return {
      sexOption: sexSelectOptions.current.find(({ value }) => value === sex),
      dobDate: dob ? new Date(dob) : null,
      iso: {
        value: parsedPhone?.country ?? DEFAULT_COUNTRY_CODE,
        label: '',
      },
      number: parsedPhone ? parsedPhone.formatNational() : '',
      phoneTypeOption: phoneTypeSelectOptions.current.find(
        ({ value }) => value === phoneType,
      ),
      mrn: '',
      ...restValues,
      // A QR-matched record has no typed values; inputs must not get null.
      firstName: firstName ?? '',
      lastName: lastName ?? '',
      zipCode: zipCode ?? '',
    };
  }, [hfhsPatientDetail]);

  // Not memoized: a remounted pane must pick up the kept draft.
  const initialValues: PatientDataFormValues =
    detailInitialValues ?? manualDraftRef.current ?? emptyInitialValues;

  const onSubmit: FormikConfig<PatientDataFormValues>['onSubmit'] = (
    values,
  ) => {
    if (!onSubmitPatientData) return;
    setQrContinueSubmitted(false);
    const { sexOption, dobDate, phoneTypeOption, iso, number, ...restValues } =
      values;

    onSubmitPatientData({
      ...restValues,
      sex: sexOption?.value,
      dob: dobDate ? getUTCDateString(dobDate) : '',
      phoneNumber:
        iso && number
          ? formatPhoneNumberForHfhs({ iso: iso.value, number })
          : '',
      phoneType: phoneTypeOption?.value,
    });
  };

  const formRef = useRef<FormikProps<PatientDataFormValues>>(null);

  const [formError, setFormError] =
    useState<Nullable<PatientDataFormError>>(null);
  const [showMedicalNumberInput, setShowMedicalNumberInput] = useState(false);

  useEffect(() => {
    if (verifyingError && formRef.current) {
      const baseDataInputsErrors = {
        firstName: '',
        lastName: '',
        sexOption: '',
        dobDate: '',
        zipCode: '',
        phoneTypeOption: '',
        iso: '',
        number: '',
      };

      if (formRef.current.values.mrn) {
        formRef.current.setErrors({
          ...baseDataInputsErrors,
          mrn: '',
        });
        setFormError(PatientDataFormError.MRN_VERIFICATION);
        return () => setFormError(null);
      }

      formRef.current.setErrors(baseDataInputsErrors);

      setFormError(PatientDataFormError.BASE_DATA_VERIFICATION);
      setShowMedicalNumberInput(true);
      return () => setFormError(null);
    }
  }, [verifyingError]);

  const handleQRScan = (decodedText: string) => {
    if (onQRCodeScan) {
      onQRCodeScan(decodedText);
    }
  };

  return (
    <Box my={24} mx={26}>
      {/* @ts-ignore - Tabs component uses custom label prop */}
      <Tabs
        controlled
        controlledTabActive={activeTab}
        controlledSetTabActive={handleTabChange}
        emphasizeActiveLink
        withBottomBorder
      >
        {/* @ts-ignore - Tabs component expects children with label prop */}
        <div label={formatMessage(messages.enterManuallyTab)}>
          <Formik
            // A verified participant only confirms a read-only form.
            validationSchema={
              hfhsPatientDetail ? undefined : schema(formatMessage)
            }
            initialValues={initialValues}
            onSubmit={onSubmit}
            innerRef={formRef}
          >
            {({ handleSubmit, isValid }) => (
              <Form autoComplete="off">
                <KeepDraftValues draftRef={manualDraftRef} />
                <Box>
                  <Container fluid style={{ padding: 0 }}>
                    <Row gutterWidth={24} style={{ rowGap: '24px' }}>
                      <Col {...columnClassMap}>
                        <FormikInput
                          formikKey="firstName"
                          label={formatMessage(messages.firstName)}
                          placeholder={formatMessage(
                            messages.firstNamePlaceholder,
                          )}
                          type="text"
                          inputProps={{
                            ...inputStyles,
                            disabled: isManualInputDisabled,
                          }}
                        />
                      </Col>
                      <Col {...columnClassMap}>
                        <FormikInput
                          formikKey="lastName"
                          label={formatMessage(messages.lastName)}
                          placeholder={formatMessage(
                            messages.lastNamePlaceholder,
                          )}
                          type="text"
                          inputProps={{
                            ...inputStyles,
                            disabled: isManualInputDisabled,
                          }}
                        />
                      </Col>
                      <Col {...columnClassMap}>
                        <FormikSelect
                          formikKey="sexOption"
                          label={formatMessage(messages.sex)}
                          options={sexSelectOptions.current}
                          submitOnChange={false}
                          inputProps={{
                            ...inputStyles,
                            ...selectStyles,
                            isDisabled: isManualInputDisabled,
                            placeholder: formatMessage(messages.sexPlaceholder),
                          }}
                        />
                      </Col>
                      <Col {...columnClassMap}>
                        <FormikDatePicker
                          formikKey="dobDate"
                          label={formatMessage(messages.dateOfBirth)}
                          inputProps={inputStyles}
                          disabled={isManualInputDisabled}
                          datePickerProps={{
                            maxDate: new Date(),
                          }}
                        />
                      </Col>
                      <Col {...columnClassMap}>
                        <FormikInput
                          formikKey="zipCode"
                          label={formatMessage(messages.zipCode)}
                          placeholder={formatMessage(
                            messages.zipCodePlaceholder,
                          )}
                          type="text"
                          inputProps={{
                            ...inputStyles,
                            disabled: isManualInputDisabled,
                          }}
                        />
                      </Col>
                      <Col {...columnClassMap}>
                        <FormikSelect
                          formikKey="phoneTypeOption"
                          label={formatMessage(messages.phoneType)}
                          options={phoneTypeSelectOptions.current}
                          submitOnChange={false}
                          inputProps={{
                            ...inputStyles,
                            ...selectStyles,
                            placeholder: formatMessage(
                              messages.phoneTypePlaceholder,
                            ),
                            isDisabled: isManualInputDisabled,
                          }}
                        />
                      </Col>
                      <Col xs={12}>
                        <FormikPhoneNumberInput
                          isoKey="iso"
                          numberKey="number"
                          prefixLabel={messages.phoneNumberPrefix}
                          phoneLabel={messages.phoneNumber}
                          disabled={isManualInputDisabled}
                          prefixInputProps={{
                            ...inputStyles,
                            ...selectStyles,
                            isDisabled: isManualInputDisabled,
                          }}
                          numberInputProps={{
                            ...inputStyles,
                            disabled: isManualInputDisabled,
                          }}
                        />
                      </Col>
                    </Row>
                  </Container>
                  {verifyingError &&
                    formError ===
                      PatientDataFormError.BASE_DATA_VERIFICATION && (
                      <ApiErrorMessage error={verifyingError} />
                    )}
                  {(previewMedicalNumberInput || showMedicalNumberInput) && (
                    <Container fluid style={{ padding: '32px 0 0 0' }}>
                      <Row gutterWidth={24} style={{ rowGap: '24px' }}>
                        <Col {...columnClassMap}>
                          <FormikInput
                            formikKey="mrn"
                            label={
                              <HelpIconTooltip
                                id="el-tooltip-mrn-researcher-info"
                                tooltipContent={
                                  previewMedicalNumberInput &&
                                  formatMessage(
                                    messages.medicalNumberResearcherInfo,
                                  )
                                }
                              >
                                <Text>
                                  {formatMessage(messages.medicalNumber)}
                                </Text>
                              </HelpIconTooltip>
                            }
                            placeholder={formatMessage(
                              messages.medicalNumberPlaceholder,
                            )}
                            type="text"
                            inputProps={{
                              ...inputStyles,
                              disabled: isManualInputDisabled,
                            }}
                          />
                        </Col>
                      </Row>
                    </Container>
                  )}
                  {verifyingError &&
                    formError === PatientDataFormError.MRN_VERIFICATION && (
                      <ApiErrorMessage error={verifyingError} />
                    )}
                  <Box dir={fixedElementsDirection}>
                    <ActionButtons
                      questionRequired
                      questionType={QuestionTypes.HENRY_FORD_INITIAL}
                      isCatMhSession={false}
                      renderContinueButton
                      continueButtonDisabled={
                        !isValid || continueButtonDisabled || isVerifying
                      }
                      continueButtonLoading={verifying}
                      onContinueClick={handleSubmit}
                    />
                  </Box>
                </Box>
              </Form>
            )}
          </Formik>
        </div>
        {/* @ts-ignore - Tabs component expects children with label prop */}
        <div label={formatMessage(messages.scanQRCodeTab)}>
          {isConfirmScreenShown && hfhsPatientDetailAnonymized ? (
            <Box data-private>
              <Container fluid style={{ padding: 0 }}>
                <Row gutterWidth={24} style={{ rowGap: '24px' }}>
                  <Col xs={12}>
                    <Text
                      ref={confirmHeadingRef}
                      tabIndex={-1}
                      fontSize="18px"
                      fontWeight="bold"
                      mb={16}
                    >
                      {formatMessage(messages.confirmPatientData)}
                    </Text>
                  </Col>

                  <Col {...columnClassMap}>
                    <Text fontSize="14px" color={colors.grey} mb={8}>
                      {formatMessage(messages.firstName)}
                    </Text>
                    <Text fontSize="16px" fontWeight="medium">
                      {hfhsPatientDetailAnonymized.firstName}
                    </Text>
                  </Col>

                  <Col {...columnClassMap}>
                    <Text fontSize="14px" color={colors.grey} mb={8}>
                      {formatMessage(messages.lastName)}
                    </Text>
                    <Text fontSize="16px" fontWeight="medium">
                      {hfhsPatientDetailAnonymized.lastName}
                    </Text>
                  </Col>

                  <Col {...columnClassMap}>
                    <Text fontSize="14px" color={colors.grey} mb={8}>
                      {formatMessage(messages.phoneNumber)}
                    </Text>
                    <Text fontSize="16px" fontWeight="medium">
                      {hfhsPatientDetailAnonymized.phoneNumber}
                    </Text>
                  </Col>

                  <Col {...columnClassMap}>
                    <Text fontSize="14px" color={colors.grey} mb={8}>
                      {formatMessage(messages.yearOfBirth)}
                    </Text>
                    <Text fontSize="16px" fontWeight="medium">
                      {hfhsPatientDetailAnonymized.dob}
                    </Text>
                  </Col>

                  <Col {...columnClassMap}>
                    <Text fontSize="14px" color={colors.grey} mb={8}>
                      {formatMessage(messages.medicalRecordNumber)}
                    </Text>
                    <Text fontSize="16px" fontWeight="medium">
                      {hfhsPatientDetailAnonymized.mrn}
                    </Text>
                  </Col>
                </Row>
              </Container>

              <Container fluid style={{ padding: '32px 0 0 0' }}>
                <Row gutterWidth={24} style={{ rowGap: '16px' }}>
                  <Col xs={12} sm={forceMobile ? 12 : 6}>
                    <Button
                      onClick={() => {
                        if (
                          onSubmitPatientData &&
                          hfhsPatientDetailAnonymized
                        ) {
                          setQrContinueSubmitted(true);
                          onSubmitPatientData({
                            id: hfhsPatientDetailAnonymized.id,
                          });
                        }
                      }}
                      loading={verifying}
                      disabled={
                        !hfhsPatientDetailAnonymized ||
                        continueButtonDisabled ||
                        isVerifying
                      }
                      width="100%"
                    >
                      {formatMessage(answerSessionPageMessages.nextQuestion)}
                    </Button>
                  </Col>
                  <Col xs={12} sm={forceMobile ? 12 : 6}>
                    <Button
                      inverted
                      onClick={() => {
                        setQrContinueSubmitted(false);
                        if (onTogglePatientDataDisplay) {
                          onTogglePatientDataDisplay();
                        }
                      }}
                      disabled={isVerifying}
                      width="100%"
                    >
                      {formatMessage(messages.rescan)}
                    </Button>
                  </Col>
                </Row>
              </Container>
              <Box role="alert">
                {qrContinueSubmitted && verifyingError && (
                  <ApiErrorMessage error={verifyingError} />
                )}
              </Box>
            </Box>
          ) : (
            <>
              <Text mb={16}>{formatMessage(messages.scanInstructions)}</Text>
              <AztecQRScanner
                onScan={handleQRScan}
                disabled={disabled || isVerifying || showPatientDataDisplay}
              />
              <Box role="alert">
                {qrVerifyingError && (
                  <>
                    <ApiErrorMessage error={qrVerifyingError} />
                    <Box mt={12}>
                      <Text fontSize={fontSizes.small} color={colors.grey}>
                        {formatMessage(messages.qrScanFailureHint)}
                      </Text>
                    </Box>
                  </>
                )}
              </Box>
              <Box aria-live="polite">
                {qrVerifying && (
                  <Box mt={20}>
                    <Text fontStyle="italic">
                      {formatMessage(messages.verifyingQRCode)}
                    </Text>
                  </Box>
                )}
              </Box>
            </>
          )}
        </div>
      </Tabs>
    </Box>
  );
};
export default HenryFordInitialScreenLayout;
