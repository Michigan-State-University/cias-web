import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import findLastIndex from 'lodash/findLastIndex';

import { themeColors } from 'theme';

import { NewMessageDTO, MessageReadDTO } from 'models/LiveChat';

import {
  fetchConversationMessagesRequest,
  makeSelectCurrentInterlocutorId,
  makeSelectLiveChatError,
  makeSelectLiveChatLoader,
  makeSelectOpenedConversation,
  makeSelectOpenedConversationMessages,
  readMessage,
} from 'global/reducers/liveChat';

import Spinner from 'components/Spinner';
import ErrorAlert from 'components/ErrorAlert';

import { MESSAGE_MAX_LENGTH } from '../constants';
import i18nMessages from '../messages';
import { MessageInput } from '../components/MessageInput';
import MessageList from '../components/MessageList';
import { MessagesSectionContainer } from '../components/styled';

export type Props = {
  onSendMessage: (newMessage: NewMessageDTO) => void;
  onReadMessage: (messageReadDTO: MessageReadDTO) => void;
};

export const MessagesSection = ({ onSendMessage, onReadMessage }: Props) => {
  const { formatMessage } = useIntl();
  const dispatch = useDispatch();

  const conversation = useSelector(makeSelectOpenedConversation());
  const conversationsLoading = useSelector(
    makeSelectLiveChatLoader('conversations'),
  );
  const messages = useSelector(makeSelectOpenedConversationMessages());
  const messagesLoading = useSelector(makeSelectLiveChatLoader('messages'));
  const error = useSelector(makeSelectLiveChatError('messages'));
  const currentInterlocutorId = useSelector(makeSelectCurrentInterlocutorId());

  useEffect(() => {
    if (conversation?.id) {
      dispatch(fetchConversationMessagesRequest(conversation.id));
    }
  }, [conversation?.id]);

  const newestOtherUserMessageIndex = useMemo(() => {
    if (!messages) return -1;
    if (!conversation?.liveChatInterlocutors) return -1;
    return findLastIndex(
      messages,
      ({ interlocutorId }) => interlocutorId !== currentInterlocutorId,
    );
  }, [messages, conversation?.liveChatInterlocutors, currentInterlocutorId]);

  const readNewestOtherUserMessage = useCallback(() => {
    if (
      !conversation ||
      !messages ||
      messagesLoading ||
      error ||
      newestOtherUserMessageIndex === -1
    ) {
      return;
    }

    const newestOtherUserMessage = messages[newestOtherUserMessageIndex];

    if (!newestOtherUserMessage.isRead) {
      const conversationId = conversation.id;
      const messageId = newestOtherUserMessage.id;

      dispatch(readMessage(conversationId, messageId));

      onReadMessage({
        conversationId,
        messageId,
      });
    }
  }, [messagesLoading, error, newestOtherUserMessageIndex]);

  useEffect(() => {
    readNewestOtherUserMessage();
  }, [readNewestOtherUserMessage]);

  const [message, setMessage] = useState('');

  useEffect(() => {
    setMessage('');
  }, [conversation?.id]);

  const messageError = useMemo(() => {
    if (message.length > MESSAGE_MAX_LENGTH)
      return formatMessage(i18nMessages.messageTooLong, {
        maxLength: MESSAGE_MAX_LENGTH,
      });
  }, [message]);

  const handleSend = () => {
    const trimmedMessage = message.trim();
    if (
      conversation &&
      currentInterlocutorId &&
      !messageError &&
      trimmedMessage
    ) {
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
      {!loading && !error && conversation && currentInterlocutorId && (
        <>
          <MessageList
            currentInterlocutorId={currentInterlocutorId}
            messages={messages ?? []}
            interlocutors={conversation.liveChatInterlocutors}
            newestOtherUserMessageIndex={newestOtherUserMessageIndex}
          />
          <MessageInput
            value={message}
            onChange={setMessage}
            onSend={handleSend}
            error={messageError}
          />
        </>
      )}
    </MessagesSectionContainer>
  );
};
