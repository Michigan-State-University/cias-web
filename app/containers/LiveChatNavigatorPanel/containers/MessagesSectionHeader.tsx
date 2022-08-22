import React from 'react';
import { useIntl } from 'react-intl';
import { useSelector } from 'react-redux';

import ArchiveIcon from 'assets/svg/archive2.svg';

import { ArchiveConversationData } from 'utils/useConversationChannel';

import {
  makeSelectArchivingConversation,
  makeSelectOpenedConversation,
} from 'global/reducers/liveChat';

import Icon from 'components/Icon';
import Text from 'components/Text';
import TextButton from 'components/Button/TextButton';
import Row from 'components/Row';
import { ModalType, useModal } from 'components/Modal';

import i18nMessages from '../messages';
import SectionHeader from '../components/SectionHeader';

export type Props = {
  onArchiveConversation?: (data: ArchiveConversationData) => void;
};

const MessageSectionHeader = ({ onArchiveConversation }: Props) => {
  const { formatMessage } = useIntl();

  const conversation = useSelector(makeSelectOpenedConversation());
  const archivingConversation = useSelector(makeSelectArchivingConversation());

  const archiveConversation = () => {
    if (onArchiveConversation && conversation) {
      onArchiveConversation({
        conversationId: conversation.id,
      });
    }
  };

  const {
    openModal: openArchiveConfirmationModal,
    Modal: ArchiveConfirmationModal,
  } = useModal({
    type: ModalType.ConfirmationModal,
    props: {
      description: formatMessage(i18nMessages.archiveConfirmationModalMessage),
      content: (
        <Text textAlign="center">
          {formatMessage(i18nMessages.archiveConfirmationModalContent)}
        </Text>
      ),
      confirmAction: archiveConversation,
    },
  });

  return (
    <>
      <ArchiveConfirmationModal />
      <SectionHeader title={formatMessage(i18nMessages.message)} pl={24}>
        {conversation && (
          <Row align="center" gap={24}>
            {/* place download button here */}
            {!conversation.archived && onArchiveConversation && (
              <TextButton
                loading={archivingConversation}
                onClick={openArchiveConfirmationModal}
                buttonProps={{
                  display: 'flex',
                  align: 'center',
                  gap: 8,
                  fontWeight: 'medium',
                }}
                spinnerProps={{
                  size: 22,
                }}
              >
                <Icon
                  src={ArchiveIcon}
                  alt={formatMessage(i18nMessages.archiveIconAlt)}
                />
                <Text>{formatMessage(i18nMessages.archive)}</Text>
              </TextButton>
            )}
          </Row>
        )}
      </SectionHeader>
    </>
  );
};

export default MessageSectionHeader;
