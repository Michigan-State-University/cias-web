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

import { HfhsPatientData, HfhsPatientDetail, Sex } from 'models/HfhsPatient';
import { ApiMessageError } from 'models/Api';

import { requiredValidationSchema } from 'utils/validators';
import { getUTCDateString } from 'utils/dateUtils';

import Box from 'components/Box';
import { SelectOption } from 'components/Select/types';
import FormikInput from 'components/FormikInput';
import FormikSelect from 'components/FormikSelect';
import FormikDatePicker from 'components/FormikDatePicker';
import Text from 'components/Text';

import { ActionButtons } from '../components/ActionButtons';
import messages from './messages';

const inputStyles = {
  width: '100%',
  bg: themeColors.highlight,
  opacity: 1,
};

export type PatientDataFormValues = Pick<
  HfhsPatientData,
  'firstName' | 'lastName' | 'zipCode'
> & {
  sexOption: Nullable<SelectOption<Sex>>;
  dobDate: Nullable<Date>;
};

const schema = (formatMessage: IntlShape['formatMessage']) =>
  Yup.object().shape({
    firstName: requiredValidationSchema,
    lastName: requiredValidationSchema,
    sexOption: Yup.object()
      .required(
        // @ts-ignore
        formatMessage(globalMessages.validators.required),
      )
      .nullable(),
    dobDate: Yup.date()
      .required(
        // @ts-ignore
        formatMessage(globalMessages.validators.required),
      )
      .nullable(),
    zipCode: requiredValidationSchema.matches(
      zipCodeRegex,
      // @ts-ignore
      formatMessage(globalMessages.validators.zipCode),
    ),
  });

enum PatientDataFormError {
  BASE_DATA_VERIFICATION,
}

const emptyInitialValues: PatientDataFormValues = {
  firstName: '',
  lastName: '',
  sexOption: null,
  dobDate: null,
  zipCode: '',
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
      sexOption: sexSelectOptions.current.find(({ value }) => value === sex),
      dobDate: new Date(dob),
      ...restValues,
    };
  }, [hfhsPatientDetail]);

  const onSubmit: FormikConfig<PatientDataFormValues>['onSubmit'] = (
    values,
  ) => {
    if (!onSubmitPatientData) return;
    const { sexOption, dobDate, ...restValues } = values;

    onSubmitPatientData({
      ...restValues,
      sex: sexOption!.value,
      dob: getUTCDateString(dobDate!),
    });
  };

  const formRef = useRef<FormikProps<PatientDataFormValues>>(null);

  const [formError, setFormError] =
    useState<Nullable<PatientDataFormError>>(null);

  useEffect(() => {
    if (verifyingError && formRef.current) {
      formRef.current.setErrors({
        firstName: '',
        lastName: '',
        sexOption: '',
        dobDate: '',
        zipCode: '',
      });
      setFormError(PatientDataFormError.BASE_DATA_VERIFICATION);
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
                      isDisabled: disabled,
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
                    placeholder={formatMessage(messages.dateOfBirthPlaceholder)}
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
