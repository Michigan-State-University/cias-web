import React, { useState } from 'react';
import { useIntl } from 'react-intl';

import { Conversation, Message, MessageReadDTO } from 'models/LiveChat';

import { themeColors } from 'theme';

import ChatMessageList from 'components/ChatMessageList';
import ChatMessageInput from 'components/ChatMessageInput';
import Row from 'components/Row';
import Column from 'components/Column';
import Divider from 'components/Divider';
import Text from 'components/Text';
import Spinner from 'components/Spinner';

import ChatDialog from './ChatDialog';
import ConversationChatDialogHeader from './ConversationChatDialogHeader';
import i18nMessages from '../messages';

export type Props = {
  conversation: Nullable<Conversation>;
  messages: Nullable<Message[]>;
  currentInterlocutorId: Nullable<string>;
  creatingConversation: boolean;
  onMinimizeDialog: () => void;
  onSendMessage: (content: string) => void;
  onReadMessage: (messageReadDTO: MessageReadDTO) => void;
};

const ConversationChatDialog = ({
  conversation,
  messages,
  currentInterlocutorId,
  creatingConversation,
  onMinimizeDialog,
  onSendMessage,
  onReadMessage,
}: Props) => {
  const { formatMessage } = useIntl();

  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (creatingConversation) return;
    const trimmedMessage = message.trim();
    if (!trimmedMessage) return;
    onSendMessage(trimmedMessage);
    setMessage('');
  };

  const otherInterlocutor =
    conversation && currentInterlocutorId
      ? Object.values(conversation.liveChatInterlocutors).find(
          ({ id }) => id !== currentInterlocutorId,
        )
      : undefined;

  return (
    <ChatDialog
      header={<ConversationChatDialogHeader interlocutor={otherInterlocutor} />}
      onMinimize={onMinimizeDialog}
    >
      <Row>
        <Divider mt={16} />
      </Row>
      {conversation && (
        <ChatMessageList
          currentInterlocutorId={currentInterlocutorId}
          messages={messages ?? []}
          interlocutors={conversation.liveChatInterlocutors}
          onReadMessage={onReadMessage}
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
      <ChatMessageInput
        value={message}
        onChange={setMessage}
        onSend={handleSend}
        disabled={conversation?.archived}
      />
    </ChatDialog>
  );
};

export default ConversationChatDialog;
