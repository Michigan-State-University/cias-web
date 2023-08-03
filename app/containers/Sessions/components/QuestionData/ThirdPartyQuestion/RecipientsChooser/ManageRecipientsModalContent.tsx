import React, { useMemo, useRef } from 'react';
import { useIntl } from 'react-intl';
import { FieldArray, Form, Formik, FormikConfig } from 'formik';

import globalMessages from 'global/i18n/globalMessages';

import Tabs from 'components/Tabs';
import { ModalContentRenderer } from 'components/Modal';
import Row from 'components/Row';
import { Button } from 'components/Button';

import messages from './messages';
import { Recipients, RecipientsFormValues } from './types';
import { OldRecipientTable } from './OldRecipientTable';
import { createRecipientsFormSchema } from './utils';

export const ManageRecipientsModalContent: ModalContentRenderer<Recipients> = ({
  modalState,
  closeModal,
}) => {
  const { formatMessage } = useIntl();

  const { current: validationSchema } = useRef(
    createRecipientsFormSchema(formatMessage),
  );

  const initialValues: RecipientsFormValues = useMemo(() => {
    if (!modalState)
      return {
        emails: [],
        faxes: [],
      };

    const { emails, faxes } = modalState;

    return {
      emails: emails.map((email) => ({ value: email, old: true })),
      faxes: faxes.map((fax) => ({ value: fax, old: true })),
    };
  }, [modalState]);

  const onSubmit: FormikConfig<RecipientsFormValues>['onSubmit'] = ({
    emails,
    faxes,
  }) => {
    closeModal({
      emails: emails.map(({ value }) => value),
      faxes: faxes.map(({ value }) => value),
    });
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ values: { emails, faxes }, isValid, dirty, handleSubmit }) => (
        <Form>
          {/* @ts-ignore */}
          <Tabs
            mt={14}
            withBottomBorder
            emphasizeActiveLink
            containerProps={{ mb: 0, mt: 16 }}
          >
            {/* @ts-ignore */}
            <div label={formatMessage(messages.emailRecipients)}>
              <FieldArray name="emails">
                {({ remove }) => (
                  <OldRecipientTable
                    recipients={emails.filter(({ old }) => old)}
                    onRemove={remove}
                  />
                )}
              </FieldArray>
            </div>
            {/* @ts-ignore */}
            <div label={formatMessage(messages.faxRecipients)}>
              <FieldArray name="faxes">
                {({ remove }) => (
                  <OldRecipientTable
                    recipients={faxes.filter(({ old }) => old)}
                    onRemove={remove}
                  />
                )}
              </FieldArray>
            </div>
          </Tabs>
          <Row gap={12} mt={16}>
            <Button
              // @ts-ignore
              px={30}
              width="auto"
              title={formatMessage(globalMessages.save)}
              disabled={!isValid || !dirty}
              onClick={handleSubmit}
              type="submit"
            />
            <Button
              // @ts-ignore
              px={30}
              width="auto"
              inverted
              title={formatMessage(globalMessages.cancel)}
              onClick={closeModal}
            />
          </Row>
        </Form>
      )}
    </Formik>
  );
};
