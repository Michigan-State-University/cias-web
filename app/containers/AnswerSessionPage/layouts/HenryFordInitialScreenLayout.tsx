import React, {
  MutableRefObject,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useIntl } from 'react-intl';
import { Col, Container, Row, ScreenClassMap } from 'react-grid-system';
import { Form, Formik, FormikConfig, FormikProps } from 'formik';
import * as Yup from 'yup';
import { IntlShape } from 'react-intl/src/types';
import { CountryCode } from 'libphonenumber-js/types';

import { colors, themeColors } from 'theme';
import globalMessages from 'global/i18n/globalMessages';
import validatorsMessages from 'global/i18n/validatorsMessages';
import { zipCodeRegex } from 'global/constants';

import {
  HfhsPatientData,
  HfhsPatientDetail,
  PhoneType,
  Sex,
} from 'models/HfhsPatient';
import { ApiMessageError } from 'models/Api';

import {
  requiredValidationSchema,
  nameValidationSchema,
} from 'utils/validators';
import { getUTCDateString } from 'utils/dateUtils';

import Box from 'components/Box';
import { SelectOption } from 'components/Select/types';
import FormikInput from 'components/FormikInput';
import FormikSelect from 'components/FormikSelect';
import FormikDatePicker from 'components/FormikDatePicker';
import Text from 'components/Text';
import { HelpIconTooltip } from 'components/HelpIconTooltip';
import {
  FormikPhoneNumberInput,
  phoneNumberSchema,
  DEFAULT_COUNTRY_CODE,
} from 'components/FormikPhoneNumberInput';

import { formatPhoneNumberForHfhs, parsePhoneNumberFromHfhs } from '../utils';
import { ActionButtons } from '../components/ActionButtons';
import { ApiErrorMessage } from '../components/ApiErrorMessage';
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
      firstName: nameValidationSchema.concat(requiredValidationSchema),
      lastName: nameValidationSchema.concat(requiredValidationSchema),
      sexOption: Yup.object()
        .required(formatMessage(validatorsMessages.required))
        .nullable(),
      dobDate: Yup.date()
        .required(formatMessage(validatorsMessages.required))
        .nullable(),
      zipCode: requiredValidationSchema.matches(
        zipCodeRegex,
        formatMessage(validatorsMessages.zipCode),
      ),
      phoneTypeOption: Yup.object()
        .required(formatMessage(validatorsMessages.required))
        .nullable(),
    })
    // @ts-ignore
    .concat(phoneNumberSchema(formatMessage, true, false));

enum PatientDataFormError {
  BASE_DATA_VERIFICATION,
  MRN_VERIFICATION,
}

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
  showContinueButton?: boolean;
  onSubmitPatientData?: (patientData: HfhsPatientData) => void;
  verifying?: boolean;
  verifyingError?: Nullable<ApiMessageError>;
  hfhsPatientDetail?: Nullable<HfhsPatientDetail>;
  previewMedicalNumberInput?: boolean;
};

const HenryFordInitialScreenLayout = ({
  forceMobile,
  disabled,
  showContinueButton,
  onSubmitPatientData,
  verifying = false,
  verifyingError,
  hfhsPatientDetail,
  previewMedicalNumberInput,
}: Props) => {
  const { formatMessage } = useIntl();

  const columnClassMap: ScreenClassMap<number> = {
    xs: 12,
    sm: forceMobile ? 12 : 6,
  };

  const sexSelectOptions: MutableRefObject<SelectOption<Sex>[]> = useRef(
    Object.values(Sex).map((sex) => ({
      value: sex,
      // @ts-ignore
      label: formatMessage(globalMessages.sex[sex]),
    })),
  );

  const phoneTypeSelectOptions: MutableRefObject<SelectOption<PhoneType>[]> =
    useRef(
      Object.values(PhoneType).map((phoneType) => ({
        value: phoneType,
        // @ts-ignore
        label: formatMessage(globalMessages.phoneType[phoneType]),
      })),
    );

  const initialValues: PatientDataFormValues = useMemo(() => {
    if (!hfhsPatientDetail) return emptyInitialValues;
    const { sex, dob, phoneNumber, phoneType, ...restValues } =
      hfhsPatientDetail;

    const parsedPhone = parsePhoneNumberFromHfhs(phoneNumber);

    return {
      sexOption: sexSelectOptions.current.find(({ value }) => value === sex),
      dobDate: new Date(dob),
      iso: {
        value: parsedPhone?.country ?? DEFAULT_COUNTRY_CODE,
        label: '',
      },
      number: parsedPhone?.formatNational() ?? '',
      phoneTypeOption: phoneTypeSelectOptions.current.find(
        ({ value }) => value === phoneType,
      ),
      mrn: '',
      ...restValues,
    };
  }, [hfhsPatientDetail]);

  const onSubmit: FormikConfig<PatientDataFormValues>['onSubmit'] = (
    values,
  ) => {
    if (!onSubmitPatientData) return;
    const { sexOption, dobDate, phoneTypeOption, iso, number, ...restValues } =
      values;

    onSubmitPatientData({
      ...restValues,
      sex: sexOption!.value,
      dob: getUTCDateString(dobDate!),
      phoneNumber: formatPhoneNumberForHfhs({ iso: iso!.value, number }),
      phoneType: phoneTypeOption!.value,
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

  return (
    <Formik
      validationSchema={schema(formatMessage)}
      initialValues={initialValues}
      onSubmit={onSubmit}
      innerRef={formRef}
    >
      {({ handleSubmit, isValid }) => (
        <Form>
          <Box my={24} mx={26}>
            <Container fluid style={{ padding: 0 }}>
              <Row gutterWidth={24} style={{ rowGap: '24px' }}>
                <Col {...columnClassMap}>
                  <FormikInput
                    formikKey="firstName"
                    label={formatMessage(messages.firstName)}
                    placeholder={formatMessage(messages.firstNamePlaceholder)}
                    type="text"
                    inputProps={{ ...inputStyles, disabled }}
                  />
                </Col>
                <Col {...columnClassMap}>
                  <FormikInput
                    formikKey="lastName"
                    label={formatMessage(messages.lastName)}
                    placeholder={formatMessage(messages.lastNamePlaceholder)}
                    type="text"
                    inputProps={{ ...inputStyles, disabled }}
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
                      isDisabled: disabled,
                      placeholder: formatMessage(messages.sexPlaceholder),
                    }}
                  />
                </Col>
                <Col {...columnClassMap}>
                  <FormikDatePicker
                    formikKey="dobDate"
                    label={formatMessage(messages.dateOfBirth)}
                    inputProps={inputStyles}
                    disabled={disabled}
                    datePickerProps={{
                      maxDate: new Date(),
                    }}
                  />
                </Col>
                <Col {...columnClassMap}>
                  <FormikInput
                    formikKey="zipCode"
                    label={formatMessage(messages.zipCode)}
                    placeholder={formatMessage(messages.zipCodePlaceholder)}
                    type="text"
                    inputProps={{ ...inputStyles, disabled }}
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
                      placeholder: formatMessage(messages.phoneTypePlaceholder),
                      isDisabled: disabled,
                    }}
                  />
                </Col>
                <Col xs={12}>
                  <FormikPhoneNumberInput
                    isoKey="iso"
                    numberKey="number"
                    prefixLabel={messages.phoneNumberPrefix}
                    phoneLabel={messages.phoneNumber}
                    disabled={disabled}
                    prefixInputProps={{
                      ...inputStyles,
                      ...selectStyles,
                      isDisabled: disabled,
                    }}
                    numberInputProps={{ ...inputStyles, disabled }}
                  />
                </Col>
              </Row>
            </Container>
            {verifyingError &&
              formError === PatientDataFormError.BASE_DATA_VERIFICATION && (
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
                            formatMessage(messages.medicalNumberResearcherInfo)
                          }
                        >
                          <Text>{formatMessage(messages.medicalNumber)}</Text>
                        </HelpIconTooltip>
                      }
                      placeholder={formatMessage(
                        messages.medicalNumberPlaceholder,
                      )}
                      type="text"
                      inputProps={{
                        ...inputStyles,
                        disabled,
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
            {showContinueButton && (
              <Box>
                <ActionButtons
                  renderContinueButton
                  continueButtonDisabled={!isValid}
                  continueButtonLoading={verifying}
                  onContinueClick={handleSubmit}
                />
              </Box>
            )}
          </Box>
        </Form>
      )}
    </Formik>
  );
};
export default HenryFordInitialScreenLayout;
