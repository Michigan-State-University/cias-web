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

import { colors, themeColors } from 'theme';
import globalMessages from 'global/i18n/globalMessages';
import { zipCodeRegex } from 'global/constants';

import {
  BaseHfhsPatientData,
  HfhsPatientData,
  HfhsPatientDetail,
  MedicalNumberHfhsPatientData,
  Sex,
} from 'models/HfhsPatient';
import { ApiMessageError } from 'models/Api';

import { requiredValidationSchema } from 'utils/validators';
import { getUTCDateString } from 'utils/dateUtils';

import Box from 'components/Box';
import { SelectOption } from 'components/Select/types';
import FormikInput from 'components/FormikInput';
import FormikSelect from 'components/FormikSelect';
import FormikDatePicker from 'components/FormikDatePicker';
import Text from 'components/Text';
import Divider from 'components/Divider';

import { ActionButtons } from '../components/ActionButtons';
import messages from './messages';

const inputStyles = {
  width: '100%',
  bg: themeColors.highlight,
  opacity: 1,
};

export type PatientDataFormValues = Pick<
  BaseHfhsPatientData,
  'firstName' | 'lastName' | 'zipCode'
> &
  MedicalNumberHfhsPatientData & {
    sexOption: Nullable<SelectOption<Sex>>;
    dobDate: Nullable<Date>;
  };

const schema = (formatMessage: IntlShape['formatMessage']) =>
  Yup.object().shape({
    firstName: Yup.string().when('mrn', {
      is: (mrn) => !mrn,
      then: requiredValidationSchema,
    }),
    lastName: Yup.string().when('mrn', {
      is: (mrn) => !mrn,
      then: requiredValidationSchema,
    }),
    sexOption: Yup.object().when('mrn', {
      is: (mrn) => !mrn,
      then: Yup.object()
        .required(
          // @ts-ignore
          formatMessage(globalMessages.validators.required),
        )
        .nullable(),
    }),
    dobDate: Yup.date().when('mrn', {
      is: (mrn) => !mrn,
      then: Yup.date()
        .required(
          // @ts-ignore
          formatMessage(globalMessages.validators.required),
        )
        .nullable(),
    }),
    zipCode: Yup.string().when('mrn', {
      is: (mrn) => !mrn,
      then: requiredValidationSchema.matches(
        zipCodeRegex,
        // @ts-ignore
        formatMessage(globalMessages.validators.zipCode),
      ),
    }),
  });

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
};

const HenryFordInitialScreenLayout = ({
  forceMobile,
  disabled,
  showContinueButton,
  onSubmitPatientData,
  verifying = false,
  verifyingError,
  hfhsPatientDetail,
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

  const initialValues: PatientDataFormValues = useMemo(() => {
    if (!hfhsPatientDetail) return emptyInitialValues;
    const { sex, dob, ...restValues } = hfhsPatientDetail;
    return {
      mrn: '',
      sexOption: sexSelectOptions.current.find(({ value }) => value === sex),
      dobDate: new Date(dob),
      ...restValues,
    };
  }, [hfhsPatientDetail]);

  const onSubmit: FormikConfig<PatientDataFormValues>['onSubmit'] = (
    values,
  ) => {
    if (!onSubmitPatientData) return;
    const { sexOption, dobDate, mrn, ...restValues } = values;

    if (!mrn) {
      onSubmitPatientData({
        ...restValues,
        sex: sexOption!.value,
        dob: getUTCDateString(dobDate!),
      });
      return;
    }

    onSubmitPatientData({
      mrn,
    });
  };

  const formRef = useRef<FormikProps<PatientDataFormValues>>(null);

  const [formError, setFormError] =
    useState<Nullable<PatientDataFormError>>(null);
  const [showMedicalNumberInput, setShowMedicalNumberInput] = useState(false);

  useEffect(() => {
    if (verifyingError && formRef.current) {
      if (formRef.current.values.mrn) {
        formRef.current.setErrors({
          mrn: '',
        });
        setFormError(PatientDataFormError.MRN_VERIFICATION);
        return () => setFormError(null);
      }

      formRef.current.setErrors({
        firstName: '',
        lastName: '',
        sexOption: '',
        dobDate: '',
        zipCode: '',
      });
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
      {({ handleSubmit, isValid, values: { mrn } }) => {
        const baseDataControlsDisabled = disabled || Boolean(mrn);

        return (
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
                      inputProps={{
                        ...inputStyles,
                        disabled: baseDataControlsDisabled,
                      }}
                    />
                  </Col>
                  <Col {...columnClassMap}>
                    <FormikInput
                      formikKey="lastName"
                      label={formatMessage(messages.lastName)}
                      placeholder={formatMessage(messages.lastNamePlaceholder)}
                      type="text"
                      inputProps={{
                        ...inputStyles,
                        disabled: baseDataControlsDisabled,
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
                        isDisabled: baseDataControlsDisabled,
                        placeholder: formatMessage(messages.sexPlaceholder),
                        placeholderOpacity: 0.54,
                        placeholderColorActive: colors.bluewood,
                        placeholderColorDisabled: colors.casper,
                        valueColorDisabled: colors.casper,
                      }}
                    />
                  </Col>
                  <Col {...columnClassMap}>
                    <FormikDatePicker
                      formikKey="dobDate"
                      label={formatMessage(messages.dateOfBirth)}
                      placeholder={formatMessage(
                        messages.dateOfBirthPlaceholder,
                      )}
                      disabled={baseDataControlsDisabled}
                      inputProps={{
                        ...inputStyles,
                      }}
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
                      inputProps={{
                        ...inputStyles,
                        disabled: baseDataControlsDisabled,
                      }}
                    />
                  </Col>
                </Row>
              </Container>
              {formError === PatientDataFormError.BASE_DATA_VERIFICATION && (
                <Text
                  color={themeColors.warning}
                  fontWeight="bold"
                  lineHeight="23px"
                  mt={32}
                >
                  {formatMessage(messages.baseDataVerificationErrorMessage)}
                </Text>
              )}
              {showMedicalNumberInput && (
                <>
                  {formError === PatientDataFormError.MRN_VERIFICATION && (
                    <Divider mt={54.5} mb={22.5} />
                  )}
                  <Container fluid style={{ padding: '32px 0 0 0' }}>
                    <Row gutterWidth={24} style={{ rowGap: '24px' }}>
                      <Col {...columnClassMap}>
                        <FormikInput
                          formikKey="mrn"
                          label={formatMessage(messages.medicalNumber)}
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
                </>
              )}
              {formError === PatientDataFormError.MRN_VERIFICATION && (
                <Text
                  color={themeColors.warning}
                  fontWeight="bold"
                  lineHeight="23px"
                  mt={32}
                >
                  {formatMessage(messages.mrnVerificationErrorMessage)}
                </Text>
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
        );
      }}
    </Formik>
  );
};

export default HenryFordInitialScreenLayout;
