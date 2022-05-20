import React, { useState } from 'react';
import { FormattedMessage } from 'react-intl';

import Box from 'components/Box';
import H2 from 'components/H2';
import ChatMessage from 'components/ChatMessage';

import { colors, themeColors } from 'theme';

import MessageInput from './components/MessageInput';
import messages from './messages';
import { IChatMessage } from './types';

const HEADER_HEIGHT = 72;
const CHAT_WIDTH = 426;

type Props = {
  chatMessages?: IChatMessage[];
};

export const LiveChat = ({ chatMessages }: Props) => {
  const [message, setMessage] = useState('');

  const shouldHideSender = (
    currentMessage: IChatMessage,
    prevMessage?: IChatMessage,
  ) => {
    if (prevMessage) {
      if (currentMessage.isMine) return prevMessage?.isMine;
      if (currentMessage.senderName)
        return prevMessage?.senderName === currentMessage.senderName;
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
            {chatMessages?.map((chatMessage, index) => {
              const hideSender = shouldHideSender(
                chatMessage,
                chatMessages[index - 1],
              );
              return (
                <ChatMessage
                  isMine={chatMessage.isMine}
                  senderName={chatMessage?.senderName}
                  read={chatMessage?.read}
                  hideSender={hideSender}
                  mt={hideSender ? 8 : 16}
                >
                  {chatMessage.message}
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
