import React, { FC, useMemo } from 'react';
import { FieldArray, Form, Formik, FormikConfig } from 'formik';
import { useIntl } from 'react-intl';

import AddSign from 'assets/svg/addSign2.svg';

import Column from 'components/Column';
import { SelectOption } from 'components/Select/types';
import FormikSelect from 'components/FormikSelect';
import Row from 'components/Row';
import { Button, TextButton } from 'components/Button';
import { FormikEmailsInput } from 'components/FormikEmailsInput';
import Divider from 'components/Divider';
import Icon from 'components/Icon';

import messages from './messages';
import { createInviteEmailsParticipantsFormSchema } from './utils';
import { InviteEmailParticipantsFormValues } from './types';
import { TEXT_BUTTON_PROPS } from './constants';

export type Props = {
  isModularIntervention: boolean;
  isReportingIntervention: boolean;
  sessionOptions: SelectOption<string>[];
  healthClinicOptions: SelectOption<string>[];
  onSubmit: FormikConfig<InviteEmailParticipantsFormValues>['onSubmit'];
  submitting: boolean;
  initialFormValues?: Nullable<InviteEmailParticipantsFormValues>;
};

export const InviteEmailParticipantsForm: FC<Props> = ({
  isModularIntervention,
  isReportingIntervention,
  sessionOptions,
  healthClinicOptions,
  onSubmit,
  submitting,
  initialFormValues,
}) => {
  const { formatMessage } = useIntl();

  const initialValues: InviteEmailParticipantsFormValues = useMemo(() => {
    if (initialFormValues) return initialFormValues;
    if (isReportingIntervention) {
      return {
        isReportingIntervention: true,
        sessionOption: null,
        clinics: [{ healthClinicOption: null, emails: [] }],
      };
    }
    return {
      isReportingIntervention: false,
      sessionOption: null,
      emails: [],
    };
  }, [initialFormValues]);

  const validationSchema = useMemo(
    () =>
      createInviteEmailsParticipantsFormSchema(
        formatMessage,
        isModularIntervention,
        isReportingIntervention,
      ),
    [isModularIntervention, isReportingIntervention],
  );

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
      enableReinitialize
    >
      {({ isValid, handleSubmit, values }) => (
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
            {!isModularIntervention && (
              <FormikSelect
                formikKey="sessionOption"
                label={formatMessage(messages.sessionSelectLabel)}
                inputProps={{
                  placeholder: formatMessage(messages.sessionSelectPlaceholder),
                }}
                options={sessionOptions}
                required
              />
            )}
            {!values.isReportingIntervention && (
              <FormikEmailsInput
                formikKey="emails"
                label={formatMessage(messages.emailsInputLabel)}
                placeholder={formatMessage(messages.emailsInputPlaceholder)}
                transparent
                required
              />
            )}
            {values.isReportingIntervention && (
              <FieldArray name="clinics">
                {({ push, remove }) => (
                  <>
                    {values.clinics.map((_, index) => (
                      <>
                        {(!isModularIntervention || !!index) && <Divider />}
                        <FormikSelect
                          formikKey={`clinics.${index}.healthClinicOption`}
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
                        <FormikEmailsInput
                          formikKey={`clinics.${index}.emails`}
                          label={formatMessage(messages.emailsInputLabel)}
                          placeholder={formatMessage(
                            messages.emailsInputPlaceholder,
                          )}
                          transparent
                          required
                        />
                        {index !== 0 && (
                          <Row>
                            <TextButton
                              onClick={() => remove(index)}
                              buttonProps={TEXT_BUTTON_PROPS}
                            >
                              {formatMessage(messages.removeClinicButtonTitle)}
                            </TextButton>
                          </Row>
                        )}
                      </>
                    ))}
                    <Divider />
                    <Row>
                      <TextButton
                        onClick={() =>
                          push({ healthClinicOption: null, emails: [] })
                        }
                        buttonProps={TEXT_BUTTON_PROPS}
                      >
                        <Icon src={AddSign} />
                        {formatMessage(messages.addClinicButtonTitle)}
                      </TextButton>
                    </Row>
                  </>
                )}
              </FieldArray>
            )}
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
              {formatMessage(messages.inviteEmailParticipantSubmitButtonTitle)}
            </Button>
          </Row>
        </Form>
      )}
    </Formik>
  );
};
