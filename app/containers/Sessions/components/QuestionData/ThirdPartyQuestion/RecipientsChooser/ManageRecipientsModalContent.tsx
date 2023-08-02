import React from 'react';
import { useIntl } from 'react-intl';

import Tabs from 'components/Tabs';
import { ModalContentRenderer } from 'components/Modal';

import messages from './messages';
import { Recipients } from './types';
import { OldRecipientTable } from './OldRecipientTable';

export const ManageRecipientsModalContent: ModalContentRenderer<Recipients> = ({
  modalState,
}) => {
  const { formatMessage } = useIntl();

  if (!modalState) return null;
  const { emails, faxes } = modalState;

  return (
    // @ts-ignore
    <Tabs
      mt={14}
      withBottomBorder
      emphasizeActiveLink
      containerProps={{ mb: 0, mt: 16 }}
    >
      {/* @ts-ignore */}
      <div label={formatMessage(messages.emailRecipients)}>
        <OldRecipientTable recipients={emails} />
      </div>
      {/* @ts-ignore */}
      <div label={formatMessage(messages.faxRecipients)}>
        <OldRecipientTable recipients={faxes} />
      </div>
    </Tabs>
  );
};
