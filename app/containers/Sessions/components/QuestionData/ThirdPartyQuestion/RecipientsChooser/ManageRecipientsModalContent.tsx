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

import {
  DEFAULT_COUNTRY_CODE,
  formatPhone,
  FormikPhoneNumberInput,
} from 'components/FormikPhoneNumberInput';
import messages from './messages';
import { Recipients, RecipientsFormValues } from './types';
import { OldRecipientTable } from './OldRecipientTable';
import { createRecipientsFormSchema, formatFax } from './utils';
import {
  ADD_RECIPIENT_BUTTON_PROPS,
  API_PHONE_NUMBER_FORMAT,
  FAX_RECIPIENTS_COUNTRY_CODES,
  TAB_CONTENT_HEIGHT,
} from './constants';

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
    const formattedNewFaxes = newFaxes.reduce<string[]>(
      (faxes, { iso, number }) => {
        if (iso?.value && number) {
          faxes.push(formatPhone(iso.value, number, API_PHONE_NUMBER_FORMAT));
        }
        return faxes;
      },
      [],
    );

    closeModal({
      emails: [...oldEmails, ...newEmails],
      faxes: [...oldFaxes, ...formattedNewFaxes],
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
              <Column height={TAB_CONTENT_HEIGHT} overflowY="auto">
                <FieldArray name="oldEmails">
                  {({ remove }) => (
                    <OldRecipientTable
                      recipients={oldEmails}
                      onRemove={remove}
                    />
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
              </Column>
            </div>
            {/* @ts-ignore */}
            <div label={formatMessage(messages.faxRecipients)}>
              <Column height={TAB_CONTENT_HEIGHT} overflowY="auto">
                <FieldArray name="oldFaxes">
                  {({ remove }) => (
                    <OldRecipientTable
                      recipients={oldFaxes}
                      onRemove={remove}
                      itemFormatter={formatFax}
                    />
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
                          <FormikPhoneNumberInput
                            isoKey={`newFaxes.${index}.iso`}
                            numberKey={`newFaxes.${index}.number`}
                            prefixLabel={null}
                            phoneLabel={null}
                            phonePlaceholder={messages.enterFax}
                            isoOptions={FAX_RECIPIENTS_COUNTRY_CODES}
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
                          onClick={() =>
                            push({
                              iso: { value: DEFAULT_COUNTRY_CODE, label: '' },
                              number: '',
                            })
                          }
                        >
                          {formatMessage(messages.addNewFax)}
                        </TextButton>
                      </Row>
                    </Column>
                  )}
                </FieldArray>
              </Column>
            </div>
          </Tabs>
          <Row gap={12} mt={16} justify="end">
            <Button
              // @ts-ignore
              px={30}
              width="auto"
              inverted
              title={formatMessage(globalMessages.cancel)}
              onClick={() => closeModal()}
              type="button"
            />
            <Button
              // @ts-ignore
              px={30}
              width="auto"
              title={formatMessage(globalMessages.save)}
              disabled={!isValid || !dirty}
              onClick={handleSubmit}
              type="submit"
            />
          </Row>
        </Form>
      )}
    </Formik>
  );
};
