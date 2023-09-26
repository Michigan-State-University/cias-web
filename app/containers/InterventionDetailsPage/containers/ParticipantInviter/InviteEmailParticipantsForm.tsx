import React, { FC, useMemo } from 'react';
import { Form, Formik, FormikConfig } from 'formik';
import { useIntl } from 'react-intl';

import Column from 'components/Column';
import { SelectOption } from 'components/Select/types';
import FormikSelect from 'components/FormikSelect';
import Row from 'components/Row';
import { Button } from 'components/Button';
import { FormikEmailsInput } from 'components/FormikEmailsInput';

import messages from './messages';
import { createInviteEmailsParticipantsFormSchema } from './utils';
import { InviteEmailParticipantsFormValues } from './types';

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
            {isReportingIntervention && (
              <FormikSelect
                formikKey="healthClinicOption"
                label={formatMessage(messages.clinicSelectLabel)}
                inputProps={{
                  placeholder: formatMessage(messages.clinicSelectPlaceholder),
                }}
                options={healthClinicOptions}
                required
              />
            )}
            <FormikEmailsInput
              formikKey="emails"
              label={formatMessage(messages.emailsInputLabel)}
              placeholder={formatMessage(messages.emailsInputPlaceholder)}
              transparent
              required
            />
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
