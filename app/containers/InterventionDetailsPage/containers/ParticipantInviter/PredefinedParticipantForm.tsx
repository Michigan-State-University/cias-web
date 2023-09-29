import React, { FC, useMemo } from 'react';
import { Form, Formik, FormikConfig } from 'formik';
import { useIntl } from 'react-intl';

import Column from 'components/Column';
import { SelectOption } from 'components/Select/types';
import FormikSelect from 'components/FormikSelect';
import Row from 'components/Row';
import { Button } from 'components/Button';
import { FormikPhoneNumberInput } from 'components/FormikPhoneNumberInput';
import FormikInput from 'components/FormikInput';

import messages from './messages';
import {
  createPredefinedParticipantFormSchema,
  getPredefinedParticipantFormInitialValues,
} from './utils';
import { PredefinedParticipantFormValues } from './types';

const COMMON_INPUT_PROPS = {
  inputProps: {
    width: '100%',
  },
};

export type Props = {
  isReportingIntervention: boolean;
  healthClinicOptions: SelectOption<string>[];
  onSubmit: FormikConfig<PredefinedParticipantFormValues>['onSubmit'];
  submitting: boolean;
};

export const PredefinedParticipantForm: FC<Props> = ({
  isReportingIntervention,
  healthClinicOptions,
  onSubmit,
  submitting,
}) => {
  const { formatMessage } = useIntl();

  const initialValues: PredefinedParticipantFormValues = useMemo(
    () => getPredefinedParticipantFormInitialValues(),
    [],
  );

  const validationSchema = useMemo(
    () =>
      createPredefinedParticipantFormSchema(
        formatMessage,
        isReportingIntervention,
      ),
    [isReportingIntervention],
  );

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
      enableReinitialize
    >
      {({ isValid, handleSubmit }) => (
        <Form
          style={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            gap: 24,
          }}
        >
          <Column gap={16}>
            <>
              {isReportingIntervention && (
                <FormikSelect
                  formikKey="healthClinicOption"
                  label={formatMessage(messages.clinicSelectLabel)}
                  inputProps={{
                    placeholder: formatMessage(
                      messages.clinicSelectPlaceholder,
                    ),
                    isClearable: true,
                  }}
                  options={healthClinicOptions}
                  required
                />
              )}
              <FormikInput
                formikKey="firstName"
                label={formatMessage(messages.firstNameInputLabel)}
                placeholder={formatMessage(messages.firstNameInputPlaceholder)}
                {...COMMON_INPUT_PROPS}
              />
              <FormikInput
                formikKey="lastName"
                label={formatMessage(messages.lastNameInputLabel)}
                placeholder={formatMessage(messages.lastNameInputPlaceholder)}
                {...COMMON_INPUT_PROPS}
              />
              <FormikInput
                formikKey="email"
                label={formatMessage(messages.emailInputLabel)}
                placeholder={formatMessage(messages.emailInputPlaceholder)}
                {...COMMON_INPUT_PROPS}
              />
              <FormikInput
                formikKey="externalId"
                label={formatMessage(messages.externalIdInputLabel)}
                placeholder={formatMessage(messages.externalIdInputPlaceholder)}
                {...COMMON_INPUT_PROPS}
              />
              <FormikPhoneNumberInput isoKey="iso" numberKey="number" />
            </>
          </Column>
          <Row justify="end">
            <Button
              disabled={!isValid}
              width="auto"
              px={24}
              type="submit"
              onClick={handleSubmit}
              loading={submitting}
            >
              {formatMessage(
                messages.createPredefinedParticipantSubmitButtonTitle,
              )}
            </Button>
          </Row>
        </Form>
      )}
    </Formik>
  );
};
