import React, { useState, useEffect } from 'react';
import { FormattedMessage } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { useInjectReducer, useInjectSaga } from 'redux-injectors';

import { colors, themeColors } from 'theme';

import {
  fetchChatMessagesRequest,
  liveChatReducer,
  makeSelectSingleConversationState,
} from 'global/reducers/liveChat';
import allLiveChatSagas from 'global/reducers/liveChat/sagas';
import { makeSelectUserId } from 'global/reducers/auth';
import { LiveChatMessage } from 'models/LiveChatMessage';

import Box from 'components/Box';
import H2 from 'components/H2';
import ChatMessage from 'components/ChatMessage';
import Spinner from 'components/Spinner';
import ErrorAlert from 'components/ErrorAlert';
import MessageInput from './components/MessageInput';

import messages from './messages';

const HEADER_HEIGHT = 72;
const CHAT_WIDTH = 426;

type Props = {
  conversationId: string;
};

export const LiveChat = ({ conversationId }: Props) => {
  const dispatch = useDispatch();
  const [message, setMessage] = useState('');
  useInjectSaga({ key: 'allLiveChatSagas', saga: allLiveChatSagas });
  // @ts-ignore
  useInjectReducer({ key: 'liveChat', reducer: liveChatReducer });

  const conversationState = useSelector(
    makeSelectSingleConversationState(conversationId),
  );
  const currentUserId = useSelector(makeSelectUserId());

  useEffect(() => {
    dispatch(fetchChatMessagesRequest(conversationId));
  }, []);

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
                  read
                  hideSender={hideSender}
                  mt={hideSender ? 8 : 16}
                >
                  {chatMessage.content}
                </ChatMessage>
              );
            })}
          </Box>
        </Box>
        <Box padding={24} pt={0}>
          <MessageInput
            value={message}
            onChange={setMessage}
            onSend={() => {
              if (message.trim()) {
                console.log(`Message: "${message.trim()}" sent!`);
                setMessage('');
              }
            }}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default LiveChat;
