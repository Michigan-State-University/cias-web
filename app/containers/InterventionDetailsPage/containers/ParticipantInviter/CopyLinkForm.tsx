import React, { FC, useMemo } from 'react';
import { Form, Formik } from 'formik';
import { useIntl } from 'react-intl';

import share from 'assets/svg/share.svg';

import { Session } from 'models/Session';
import Column from 'components/Column';
import Divider from 'components/Divider';
import Row from 'components/Row';
import FormikSelect from 'components/FormikSelect';
import CopyToClipboard from 'components/CopyToClipboard';
import { SelectOption } from 'components/Select/types';

import { CopyLinkFormValues } from './types';
import messages from './messages';
import { createCopyLinkFormSchema, createInviteUrl } from './utils';

export type Props = {
  isModularIntervention: boolean;
  isReportingIntervention: boolean;
  interventionId: string;
  interventionLanguageCode: string;
  sessionOptions: Partial<Session>[];
  healthClinicOptions: SelectOption<string>[];
};

export const CopyLinkForm: FC<Props> = ({
  isModularIntervention,
  isReportingIntervention,
  interventionId,
  interventionLanguageCode,
  sessionOptions,
  healthClinicOptions,
}) => {
  const { formatMessage } = useIntl();

  const initialValues: CopyLinkFormValues = useMemo(
    () => ({ sessionOption: null, healthClinicOption: null }),
    [interventionId],
  );

  const validationSchema = useMemo(
    () =>
      createCopyLinkFormSchema(
        formatMessage,
        isModularIntervention,
        isReportingIntervention,
      ),
    [isModularIntervention, isReportingIntervention],
  );

  const filteredSessionOptions = sessionOptions.filter(
    (session) => session.type !== 'Session::Sms',
  );

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={() => {}}
    >
      {({ values, isValid, dirty, handleSubmit }) => (
        <Form>
          <Column>
            <Divider />
            {(!isModularIntervention || isReportingIntervention) && (
              <Row mt={16} gap={16}>
                {!isModularIntervention && (
                  <FormikSelect
                    formikKey="sessionOption"
                    label={formatMessage(messages.sessionSelectLabel)}
                    inputProps={{
                      placeholder: formatMessage(
                        messages.sessionSelectPlaceholder,
                      ),
                    }}
                    options={filteredSessionOptions}
                  />
                )}
                {isReportingIntervention && (
                  <FormikSelect
                    formikKey="healthClinicOption"
                    label={formatMessage(messages.clinicSelectLabel)}
                    inputProps={{
                      placeholder: formatMessage(
                        messages.clinicSelectPlaceholder,
                      ),
                    }}
                    options={healthClinicOptions}
                  />
                )}
              </Row>
            )}
            <CopyToClipboard
              // @ts-ignore
              textToCopy={createInviteUrl(
                isModularIntervention,
                isReportingIntervention,
                interventionId,
                values.sessionOption?.value,
                values.healthClinicOption?.value,
                interventionLanguageCode,
              )}
              icon={share}
              iconAlt={formatMessage(messages.copyLinkIconAlt)}
              disabled={!isValid}
              buttonDisabled={
                !isValid ||
                ((!isModularIntervention || isReportingIntervention) && !dirty)
              }
              onClick={handleSubmit}
              mt={21}
              mb={13}
            >
              {formatMessage(messages.copyLinkButtonTitle, {
                isModularIntervention,
              })}
            </CopyToClipboard>
          </Column>
        </Form>
      )}
    </Formik>
  );
};
