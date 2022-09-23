import React, { MutableRefObject, useRef } from 'react';
import { useIntl } from 'react-intl';
import { Col, Container, Row, ScreenClassMap } from 'react-grid-system';
import { Formik, FormikConfig } from 'formik';
import * as Yup from 'yup';
import { IntlShape } from 'react-intl/src/types';

import { colors, themeColors } from 'theme';
import globalMessages from 'global/i18n/globalMessages';
import { zipCodeRegex } from 'global/constants';

import { HfhsPatientData, Sex } from 'models/HfhsPatient';
import { HenryFordInitialScreenDTO } from 'models/Question';

import { requiredValidationSchema } from 'utils/validators';

import Box from 'components/Box';
import { SelectOption } from 'components/Select/types';
import FormikInput from 'components/FormikInput';
import FormikSelect from 'components/FormikSelect';
import FormikDatePicker from 'components/FormikDatePicker';

import { ActionButtons } from '../components/ActionButtons';
import { SharedProps } from '../components/sharedProps';
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

const initialValues: PatientDataFormValues = {
  firstName: '',
  lastName: '',
  sexOption: null,
  dobDate: null,
  zipCode: '',
};

export type Props = {
  forceMobile?: boolean;
  disabled?: boolean;
} & Partial<Pick<SharedProps<HenryFordInitialScreenDTO>, 'saveAnswer'>>;

const HenryFordInitialScreenLayout = ({
  forceMobile,
  disabled,
  saveAnswer,
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

  const onSubmit: FormikConfig<PatientDataFormValues>['onSubmit'] = (
    values,
    { setSubmitting },
  ) => {
    if (saveAnswer) {
      saveAnswer();
    }
    setSubmitting(false);
  };

  return (
    <Formik
      validationSchema={schema(formatMessage)}
      initialValues={initialValues}
      onSubmit={onSubmit}
    >
      {({ handleSubmit, isSubmitting, isValid }) => (
        <Box my={24} mx={12} width="100%">
          <Container fluid>
            <Row gutterWidth={24} style={{ rowGap: '24px' }}>
              <Col {...columnClassMap}>
                <FormikInput
                  formikKey="firstName"
                  label={formatMessage(messages.firstName)}
                  placeholder={formatMessage(messages.firstNamePlaceholder)}
                  type="text"
                  inputProps={{
                    ...inputStyles,
                    disabled,
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
                    disabled,
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
                    isDisabled: disabled,
                    placeholder: formatMessage(messages.sexPlaceholder),
                    placeholderOpacity: 0.54,
                    placeholderColor: disabled
                      ? colors.casper
                      : colors.bluewood,
                  }}
                />
              </Col>
              <Col {...columnClassMap}>
                <FormikDatePicker
                  formikKey="dobDate"
                  label={formatMessage(messages.dateOfBirth)}
                  placeholder={formatMessage(messages.dateOfBirthPlaceholder)}
                  disabled={disabled}
                  inputProps={{
                    ...inputStyles,
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
                    disabled,
                  }}
                />
              </Col>
            </Row>
          </Container>
          {!disabled && (
            <Box>
              <ActionButtons
                renderSkipQuestionButton={false}
                skipQuestionButtonDisabled={false}
                onSkipQuestionClick={() => {}}
                renderContinueButton
                continueButtonDisabled={!isValid}
                continueButtonLoading={isSubmitting}
                onContinueClick={handleSubmit}
              />
            </Box>
          )}
        </Box>
      )}
    </Formik>
  );
};

export default HenryFordInitialScreenLayout;
