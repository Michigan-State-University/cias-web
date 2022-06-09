import React, { useState, useEffect, useMemo } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';

import { colors, themeColors } from 'theme';

import {
  fetchChatMessagesRequest,
  makeSelectSingleConversationState,
} from 'global/reducers/liveChat';
import { makeSelectUserId } from 'global/reducers/auth';
import { LiveChatMessage } from 'models/LiveChatMessage';

import Box from 'components/Box';
import H2 from 'components/H2';
import ChatMessage from 'components/ChatMessage';
import Spinner from 'components/Spinner';
import ErrorAlert from 'components/ErrorAlert';
import MessageInput from './components/MessageInput';

import messages from './messages';
import { CHAT_WIDTH, HEADER_HEIGHT, MESSAGE_MAX_LENGTH } from './constants';

type Props = {
  conversationId: string;
  onSendMessage: (
    content: string,
    conversationId: string,
    senderId: string,
  ) => void;
};

export const LiveChat = ({ conversationId, onSendMessage }: Props) => {
  const { formatMessage } = useIntl();
  const dispatch = useDispatch();
  const [message, setMessage] = useState('');

  const conversationState = useSelector(
    makeSelectSingleConversationState(conversationId),
  );
  const currentUserId = useSelector(makeSelectUserId());

  useEffect(() => {
    dispatch(fetchChatMessagesRequest(conversationId));
  }, []);

  const error = useMemo(() => {
    if (message.length > MESSAGE_MAX_LENGTH)
      return formatMessage(messages.messageTooLong, {
        maxLength: MESSAGE_MAX_LENGTH,
      });
  }, [message]);

  if (!conversationState) {
    return <Spinner />;
  }

  const isOwnMessage = (liveChatMessage: LiveChatMessage) =>
    liveChatMessage.userId === currentUserId;

  const shouldHideSender = (
    currentMessage: LiveChatMessage,
    prevMessage?: LiveChatMessage,
  ) => {
    if (prevMessage) {
      if (isOwnMessage(currentMessage)) return isOwnMessage(prevMessage);
      return prevMessage.userId === currentMessage.userId;
    }
    return false;
  };

  const handleSend = () => {
    if (!error && message.trim()) {
      onSendMessage(message.trim(), conversationId, currentUserId);
      setMessage('');
    }
  };

  return (
    <Box
      bg={colors.white}
      width={CHAT_WIDTH}
      height="100%"
      maxWidth="100%"
      display="flex"
      direction="column"
    >
      <Box
        padding={24}
        borderBottom={`1px solid ${themeColors.highlight}`}
        borderRadius="0px"
        height={HEADER_HEIGHT}
      >
        <H2>
          <FormattedMessage {...messages.header} />
        </H2>
      </Box>
      <Box
        maxHeight={`calc(100% - ${HEADER_HEIGHT}px)`}
        pt={0}
        display="flex"
        direction="column"
        justify="between"
        flex={1}
      >
        <Box
          overflow="auto"
          display="flex"
          direction="column-reverse"
          padding="0 24px"
          mb={-6}
        >
          <Box mb={24}>
            {conversationState.loading && (
              <Spinner color={themeColors.secondary} />
            )}
            {conversationState.hasError && (
              <ErrorAlert
                fullPage={false}
                errorText={messages.conversationError}
              />
            )}
            {conversationState.messages?.map((chatMessage, index) => {
              const hideSender = shouldHideSender(
                chatMessage,
                conversationState.messages[index - 1],
              );
              return (
                <ChatMessage
                  key={chatMessage.id}
                  isMine={isOwnMessage(chatMessage)}
                  senderName={`${chatMessage.firstName} ${chatMessage.lastName}`}
                  hideSender={hideSender}
                  mt={hideSender ? 8 : 16}
                >
                  {chatMessage.content}
                </ChatMessage>
              );
            })}
          </Box>
        </Box>
        <Box px={24}>
          <MessageInput
            value={message}
            onChange={setMessage}
            onSend={handleSend}
            error={error}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default LiveChat;
