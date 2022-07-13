import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { themeColors } from 'theme';

import { MessageSentDTO, MessageReadDTO } from 'models/LiveChat';

import {
  fetchConversationMessagesRequest,
  makeSelectArchivingConversation,
  makeSelectCurrentInterlocutorId,
  makeSelectLiveChatError,
  makeSelectLiveChatLoader,
  makeSelectOpenedConversation,
  makeSelectOpenedConversationMessages,
} from 'global/reducers/liveChat';

import Spinner from 'components/Spinner';
import ErrorAlert from 'components/ErrorAlert';
import ChatMessageList from 'components/ChatMessageList';
import ChatMessageInput from 'components/ChatMessageInput';

import i18nMessages from '../messages';
import { MessagesSectionContainer } from '../components/styled';

export type Props = {
  onSendMessage: (messageSentDTO: MessageSentDTO) => void;
  onReadMessage: (messageReadDTO: MessageReadDTO) => void;
};

export const MessagesSection = ({ onSendMessage, onReadMessage }: Props) => {
  const dispatch = useDispatch();

  const conversation = useSelector(makeSelectOpenedConversation());
  const conversationsLoading = useSelector(
    makeSelectLiveChatLoader('conversations'),
  );
  const archivingConversation = useSelector(makeSelectArchivingConversation());
  const messages = useSelector(makeSelectOpenedConversationMessages());
  const messagesLoading = useSelector(makeSelectLiveChatLoader('messages'));
  const error = useSelector(makeSelectLiveChatError('messages'));
  const currentInterlocutorId = useSelector(makeSelectCurrentInterlocutorId());

  useEffect(() => {
    if (conversation?.id) {
      dispatch(fetchConversationMessagesRequest(conversation.id));
    }
  }, [conversation?.id]);

  const [message, setMessage] = useState('');

  useEffect(() => {
    setMessage('');
  }, [conversation?.id]);

  const handleSend = () => {
    const trimmedMessage = message.trim();
    if (conversation && currentInterlocutorId && trimmedMessage) {
      onSendMessage({
        conversationId: conversation.id,
        content: trimmedMessage,
        interlocutorId: currentInterlocutorId,
      });
      setMessage('');
    }
  };

  const loading = messagesLoading || conversationsLoading;

  return (
    <MessagesSectionContainer>
      {loading && <Spinner color={themeColors.secondary} />}
      {error && (
        <ErrorAlert fullPage={false} errorText={i18nMessages.messagesError} />
      )}
      {!loading && !error && conversation && (
        <>
          <ChatMessageList
            currentInterlocutorId={currentInterlocutorId}
            messages={messages ?? []}
            interlocutors={conversation.liveChatInterlocutors}
            onReadMessage={onReadMessage}
          />
          <ChatMessageInput
            value={message}
            onChange={setMessage}
            onSend={handleSend}
            disabled={conversation.archived || archivingConversation}
          />
        </>
      )}
    </MessagesSectionContainer>
  );
};
