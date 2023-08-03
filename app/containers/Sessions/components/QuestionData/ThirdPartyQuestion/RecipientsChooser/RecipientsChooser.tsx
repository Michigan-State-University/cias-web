import React, { FC, useCallback, useMemo } from 'react';
import { useIntl } from 'react-intl';

import { themeColors } from 'theme';

import { htmlToPlainText } from 'utils/htmlToPlainText';

import Row from 'components/Row';
import Column from 'components/Column';
import { TextButton } from 'components/Button';
import { ModalProps, ModalType, useModal } from 'components/Modal';

import messages from './messages';
import { divideRecipients, joinRecipients } from './utils';
import { RecipientList } from './RecipientList';
import { MANAGE_RECIPIENTS_MODAL_WIDTH } from './constants';
import { ManageRecipientsModalContent } from './ManageRecipientsModalContent';
import { Recipients } from './types';

export type Props = {
  hidden: boolean;
  disabled: boolean;
  recipients: string;
  modalTitle: string;
  onChange: (value: string) => void;
};

export const RecipientsChooser: FC<Props> = ({
  hidden,
  disabled,
  recipients,
  modalTitle,
  onChange,
}) => {
  const { formatMessage } = useIntl();

  const dividedRecipients = useMemo(
    () => divideRecipients(recipients),
    [recipients],
  );

  const onClose = useCallback<
    Required<ModalProps<Recipients>['props']>['onClose']
  >(
    (newRecipients) => {
      if (!newRecipients) return;
      onChange(joinRecipients(newRecipients));
    },
    [onChange],
  );

  const modalProps = useMemo<ModalProps<Recipients>['props']>(
    () => ({
      title:
        htmlToPlainText(modalTitle) ||
        formatMessage(messages.manageRecipientsModalDefaultTitle),
      description: formatMessage(messages.manageRecipientsModalDescription),
      width: MANAGE_RECIPIENTS_MODAL_WIDTH,
      onClose,
    }),
    [modalTitle],
  );

  const { openModal, Modal } = useModal<Recipients>({
    type: ModalType.Modal,
    modalContentRenderer: ManageRecipientsModalContent,
    props: modalProps,
  });

  return (
    <>
      <Modal />
      <Column mb={10} ml={40} width="auto" hidden={hidden}>
        <RecipientList
          label={formatMessage(messages.emailRecipients)}
          noItemsLabel={formatMessage(messages.noEmailRecipients)}
          recipients={dividedRecipients.emails}
        />
        <RecipientList
          label={formatMessage(messages.faxRecipients)}
          noItemsLabel={formatMessage(messages.noFaxRecipients)}
          recipients={dividedRecipients.faxes}
          mt={8}
        />
        <Row mt={12}>
          <TextButton
            disabled={disabled}
            outlined
            buttonProps={{
              color: themeColors.secondary,
            }}
            onClick={() => openModal(dividedRecipients)}
          >
            {formatMessage(messages.manageRecipients)}
          </TextButton>
        </Row>
      </Column>
    </>
  );
};
