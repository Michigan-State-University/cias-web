import React, { FC, useEffect, useMemo, useState } from 'react';
import { Form, Formik, FormikConfig } from 'formik';
import { useIntl } from 'react-intl';

import { PredefinedParticipant } from 'models/PredefinedParticipant';

import globalMessages from 'global/i18n/globalMessages';

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
import {
  PredefinedParticipantFormMode,
  PredefinedParticipantFormValues,
} from './types';

const COMMON_INPUT_PROPS = {
  inputProps: {
    width: '100%',
  },
};

export type UpdateModeProps = {
  mode: PredefinedParticipantFormMode.UPDATE;
  participant: PredefinedParticipant;
};

export type CreateModeProps = {
  mode: PredefinedParticipantFormMode.CREATE;
  participant?: undefined;
};

export type CommonProps = {
  isReportingIntervention: boolean;
  healthClinicOptions: SelectOption<string>[];
  onSubmit: FormikConfig<PredefinedParticipantFormValues>['onSubmit'];
  submitting: boolean;
};

export type Props = CommonProps & (CreateModeProps | UpdateModeProps);

export const PredefinedParticipantForm: FC<Props> = ({
  mode,
  isReportingIntervention,
  healthClinicOptions,
  onSubmit,
  submitting,
  participant,
}) => {
  const { formatMessage } = useIntl();

  const isUpdateMode = mode === PredefinedParticipantFormMode.UPDATE;

  const [disabled, setDisabled] = useState(isUpdateMode);

  useEffect(() => {
    if (isUpdateMode) {
      setDisabled(true);
    }
  }, [isUpdateMode, participant]);

  const initialValues: PredefinedParticipantFormValues = useMemo(
    () =>
      getPredefinedParticipantFormInitialValues(
        healthClinicOptions,
        participant,
      ),
    [healthClinicOptions, participant],
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
      {({ isValid, dirty, handleSubmit, resetForm }) => (
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
                  disabled={disabled}
                />
              )}
              <FormikInput
                formikKey="firstName"
                label={formatMessage(messages.firstNameInputLabel)}
                placeholder={formatMessage(messages.firstNameInputPlaceholder)}
                disabled={disabled}
                {...COMMON_INPUT_PROPS}
              />
              <FormikInput
                formikKey="lastName"
                label={formatMessage(messages.lastNameInputLabel)}
                placeholder={formatMessage(messages.lastNameInputPlaceholder)}
                disabled={disabled}
                {...COMMON_INPUT_PROPS}
              />
              <FormikInput
                formikKey="email"
                label={formatMessage(messages.emailInputLabel)}
                placeholder={formatMessage(messages.emailInputPlaceholder)}
                disabled={disabled}
                {...COMMON_INPUT_PROPS}
              />
              <FormikInput
                formikKey="externalId"
                label={formatMessage(messages.externalIdInputLabel)}
                placeholder={formatMessage(messages.externalIdInputPlaceholder)}
                disabled={disabled}
                {...COMMON_INPUT_PROPS}
              />
              <FormikPhoneNumberInput
                isoKey="iso"
                numberKey="number"
                disabled={disabled}
              />
            </>
          </Column>
          <Row justify="end" gap={16}>
            {!disabled && isUpdateMode && (
              <Button
                width="auto"
                px={24}
                type="reset"
                onClick={() => {
                  resetForm();
                  setDisabled(true);
                }}
                inverted
                disabled={submitting}
              >
                {formatMessage(globalMessages.cancel)}
              </Button>
            )}
            {!disabled && (
              <Button
                disabled={!isValid || (isUpdateMode && !dirty)}
                width="auto"
                px={24}
                type="submit"
                onClick={handleSubmit}
                loading={submitting}
              >
                {formatMessage(
                  messages.predefinedParticipantFormSubmitButtonTitle,
                  { mode },
                )}
              </Button>
            )}
            {disabled && (
              <Button
                width="auto"
                px={24}
                type="button"
                onClick={() => setDisabled(false)}
              >
                {formatMessage(messages.editDetailsButtonTitle)}
              </Button>
            )}
          </Row>
        </Form>
      )}
    </Formik>
  );
};
