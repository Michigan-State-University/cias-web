import React, { useState } from 'react';
import { useIntl } from 'react-intl';
import { useSelector, useDispatch } from 'react-redux';

import { ConversationChannel } from 'utils/useConversationChannel';

import {
  makeSelectCreatingConversation,
  makeSelectCurrentInterlocutorId,
  makeSelectOpenedConversation,
  makeSelectOpenedConversationMessages,
  makeSelectOtherInterlocutor,
  closeConversation,
  makeSelectCurrentNavigatorUnavailable,
  makeSelectOpenedConversationId,
} from 'global/reducers/liveChat';

import { themeColors } from 'theme';

import ChatMessageList from 'components/ChatMessageList';
import ChatMessageInput from 'components/ChatMessageInput';
import Row from 'components/Row';
import Column from 'components/Column';
import Divider from 'components/Divider';
import Text from 'components/Text';
import Spinner from 'components/Spinner';
import Button from 'components/Button';

import i18nMessages from '../messages';
import ChatDialog from '../components/ChatDialog';
import ConversationChatDialogHeader from '../components/ConversationChatDialogHeader';

export type Props = {
  conversationChannel: ConversationChannel;
  interventionId: string;
  onMinimizeDialog: () => void;
};

const ConversationChatDialog = ({
  conversationChannel,
  interventionId,
  onMinimizeDialog,
}: Props) => {
  const { createConversation, readMessage, sendMessage } = conversationChannel;
  const { formatMessage } = useIntl();
  const dispatch = useDispatch();

  const [message, setMessage] = useState('');

  const creatingConversation = useSelector(makeSelectCreatingConversation());
  const messages = useSelector(makeSelectOpenedConversationMessages());
  const conversation = useSelector(makeSelectOpenedConversation());
  const currentInterlocutorId = useSelector(makeSelectCurrentInterlocutorId());
  const otherInterlocutor = useSelector(makeSelectOtherInterlocutor());
  const isCurrentNavigatorUnavailable = useSelector(
    makeSelectCurrentNavigatorUnavailable(),
  );
  const openedConversationId = useSelector(makeSelectOpenedConversationId());

  const isConversationOpened = Boolean(openedConversationId);
  const isConversationArchived = !!conversation?.archivedAt;

  const isChatUnavailable =
    isConversationOpened &&
    (isConversationArchived || isCurrentNavigatorUnavailable);

  const handleSendMessage = (content: string) => {
    if (conversation && currentInterlocutorId) {
      sendMessage({
        conversationId: conversation.id,
        content,
        interlocutorId: currentInterlocutorId,
      });
    } else {
      createConversation({
        firstMessageContent: content,
        interventionId,
      });
    }
  };

  const handleSend = () => {
    if (creatingConversation) return;
    const trimmedMessage = message.trim();
    if (!trimmedMessage) return;
    handleSendMessage(trimmedMessage);
    setMessage('');
  };

  const onReassignNavigator = () => dispatch(closeConversation());

  return (
    <ChatDialog
      header={<ConversationChatDialogHeader interlocutor={otherInterlocutor} />}
      onMinimize={onMinimizeDialog}
      showContactDetailsButton
    >
      <Row>
        <Divider />
      </Row>
      {conversation && (
        <ChatMessageList
          currentInterlocutorId={currentInterlocutorId}
          messages={messages ?? []}
          interlocutors={conversation.liveChatInterlocutors}
          onReadMessage={readMessage}
        />
      )}
      <Column flex={1}>
        {!conversation && (
          <Text mt={16} textAlign="center">
            {formatMessage(i18nMessages.startConversation)}
          </Text>
        )}
        {creatingConversation && <Spinner color={themeColors.secondary} />}
      </Column>
      {isChatUnavailable && (
        <>
          <Column
            pt={24}
            pb={16}
            borderBottom={`1px solid ${themeColors.highlight}`}
            mb={16}
          >
            <Text fontSize={12} fontWeight="medium" textAlign="center">
              {formatMessage(
                i18nMessages[
                  isConversationArchived
                    ? 'conversationArchived'
                    : 'navigatorOffline'
                ],
              )}
            </Text>
          </Column>
          <Button light mb={24} onClick={onReassignNavigator} flexShrink={0}>
            {formatMessage(i18nMessages.connectWithAnotherNavigator)}
          </Button>
        </>
      )}
      {!isChatUnavailable && (
        <ChatMessageInput
          value={message}
          onChange={setMessage}
          onSend={handleSend}
        />
      )}
    </ChatDialog>
  );
};

export default ConversationChatDialog;
