import React, { useMemo, useRef } from 'react';
import { useIntl } from 'react-intl';
import { FieldArray, Form, Formik, FormikConfig } from 'formik';

import RedBin from 'assets/svg/bin-red-no-bg.svg';

import globalMessages from 'global/i18n/globalMessages';

import Tabs from 'components/Tabs';
import { ModalContentRenderer } from 'components/Modal';
import Row from 'components/Row';
import { Button, ImageButton, TextButton } from 'components/Button';
import FormikInput from 'components/FormikInput';
import Column from 'components/Column';

import messages from './messages';
import { Recipients, RecipientsFormValues } from './types';
import { OldRecipientTable } from './OldRecipientTable';
import { createRecipientsFormSchema } from './utils';
import { ADD_RECIPIENT_BUTTON_PROPS } from './constants';

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
        oldEmails: [],
        newEmails: [],
        oldFaxes: [],
        newFaxes: [],
      };

    const { emails, faxes } = modalState;

    return {
      oldEmails: emails,
      newEmails: [],
      oldFaxes: faxes,
      newFaxes: [],
    };
  }, [modalState]);

  const onSubmit: FormikConfig<RecipientsFormValues>['onSubmit'] = ({
    oldEmails,
    newEmails,
    oldFaxes,
    newFaxes,
  }) => {
    closeModal({
      emails: [...oldEmails, ...newEmails],
      faxes: [...oldFaxes, ...newFaxes],
    });
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({
        values: { oldEmails, newEmails, oldFaxes, newFaxes },
        isValid,
        dirty,
        handleSubmit,
      }) => (
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
              <FieldArray name="oldEmails">
                {({ remove }) => (
                  <OldRecipientTable recipients={oldEmails} onRemove={remove} />
                )}
              </FieldArray>
              <FieldArray name="newEmails">
                {({ push, remove }) => (
                  <Column gap={8} mt={8}>
                    {newEmails.map((_, index) => (
                      <Row
                        gap={8}
                        pr={8}
                        align="start"
                        key={`newEmails.${index}`}
                      >
                        <FormikInput
                          formikKey={`newEmails.${index}`}
                          placeholder={formatMessage(
                            messages.enterEmailAddress,
                          )}
                          flex={1}
                          inputProps={{
                            width: '100%',
                          }}
                        />
                        <ImageButton
                          src={RedBin}
                          onClick={() => remove(index)}
                          title={formatMessage(messages.deleteRecipient)}
                          mt={8}
                        />
                      </Row>
                    ))}
                    <Row>
                      <TextButton
                        buttonProps={ADD_RECIPIENT_BUTTON_PROPS}
                        onClick={() => push('')}
                      >
                        {formatMessage(messages.addNewEmail)}
                      </TextButton>
                    </Row>
                  </Column>
                )}
              </FieldArray>
            </div>
            {/* @ts-ignore */}
            <div label={formatMessage(messages.faxRecipients)}>
              <FieldArray name="oldFaxes">
                {({ remove }) => (
                  <OldRecipientTable recipients={oldFaxes} onRemove={remove} />
                )}
              </FieldArray>
              <FieldArray name="newFaxes">
                {({ push, remove }) => (
                  <Column gap={8} mt={8}>
                    {newFaxes.map((_, index) => (
                      <Row
                        gap={8}
                        pr={8}
                        align="start"
                        key={`newFaxes.${index}`}
                      >
                        <FormikInput
                          formikKey={`newFaxes.${index}`}
                          placeholder={formatMessage(messages.enterFax)}
                          flex={1}
                          inputProps={{
                            width: '100%',
                          }}
                        />
                        <ImageButton
                          src={RedBin}
                          onClick={() => remove(index)}
                          title={formatMessage(messages.deleteRecipient)}
                          mt={8}
                        />
                      </Row>
                    ))}
                    <Row>
                      <TextButton
                        buttonProps={ADD_RECIPIENT_BUTTON_PROPS}
                        onClick={() => push('')}
                      >
                        {formatMessage(messages.addNewFax)}
                      </TextButton>
                    </Row>
                  </Column>
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
              onClick={() => closeModal()}
              type="button"
            />
          </Row>
        </Form>
      )}
    </Formik>
  );
};
