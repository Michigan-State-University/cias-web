import React, { FC, useEffect, useMemo, useState } from 'react';
import { Form, Formik, FormikConfig } from 'formik';
import { useIntl } from 'react-intl';

import { PredefinedParticipant } from 'models/PredefinedParticipant';

import { themeColors } from 'theme';

import globalMessages from 'global/i18n/globalMessages';

import Column from 'components/Column';
import { SelectOption } from 'components/Select/types';
import FormikSelect from 'components/FormikSelect';
import Row from 'components/Row';
import { Button, TextButton } from 'components/Button';
import { FormikPhoneNumberInput } from 'components/FormikPhoneNumberInput';
import FormikInput from 'components/FormikInput';
import Text from 'components/Text';

import messages from './messages';
import {
  createPredefinedParticipantFormSchema,
  getPredefinedParticipantFormInitialValues,
} from './utils';
import {
  PredefinedParticipantFormMode,
  PredefinedParticipantFormValues,
} from './types';
import { TEXT_BUTTON_PROPS } from './constants';

const COMMON_INPUT_PROPS = {
  inputProps: {
    width: '100%',
  },
};

export type UpdateModeProps = {
  mode: PredefinedParticipantFormMode.UPDATE;
  participant: PredefinedParticipant;
  onDeactivate: () => void;
  deactivating: boolean;
  onActivate: () => void;
  activating: boolean;
};

export type CreateModeProps = {
  mode: PredefinedParticipantFormMode.CREATE;
  participant?: undefined;
  onDeactivate?: undefined;
  deactivating?: undefined;
  onActivate?: undefined;
  activating?: undefined;
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
  onDeactivate,
  deactivating,
  onActivate,
  activating,
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
        isUpdateMode,
      ),
    [isReportingIntervention, isUpdateMode],
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
            {!disabled && (
              <Text mb={8}>{formatMessage(globalMessages.requiredFields)}</Text>
            )}
            {isReportingIntervention && (
              <FormikSelect
                formikKey="healthClinicOption"
                label={formatMessage(messages.clinicSelectLabel)}
                inputProps={{
                  placeholder: formatMessage(messages.clinicSelectPlaceholder),
                  isClearable: true,
                }}
                options={healthClinicOptions}
                required={!disabled}
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
              required={!disabled && isUpdateMode}
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
          </Column>
          <Row justify="between" gap={16}>
            <Row>
              {disabled && isUpdateMode && participant?.active && (
                <TextButton
                  buttonProps={{
                    ...TEXT_BUTTON_PROPS,
                    color: themeColors.alert,
                  }}
                  onClick={onDeactivate}
                  loading={deactivating}
                >
                  {formatMessage(
                    messages.deactivatePredefinedParticipantButtonTitle,
                  )}
                </TextButton>
              )}
            </Row>
            <Row gap={16}>
              {(!isUpdateMode || participant?.active) && (
                <>
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
                      disabled={deactivating}
                    >
                      {formatMessage(messages.editDetailsButtonTitle)}
                    </Button>
                  )}
                </>
              )}
              {isUpdateMode && participant && !participant.active && (
                <Button
                  width="auto"
                  px={24}
                  type="button"
                  onClick={onActivate}
                  loading={activating}
                  inverted
                >
                  {formatMessage(
                    messages.activatePredefinedParticipantButtonTitle,
                  )}
                </Button>
              )}
            </Row>
          </Row>
        </Form>
      )}
    </Formik>
  );
};
