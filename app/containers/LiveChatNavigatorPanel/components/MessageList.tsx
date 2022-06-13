import React, { memo, useCallback, useMemo } from 'react';
import findLastIndex from 'lodash/findLastIndex';

import { Interlocutor, Message } from 'models/LiveChat';

import Box from 'components/Box';
import ChatMessage from 'components/ChatMessage';

export type Props = {
  currentInterlocutorId: string;
  messages: Message[];
  interlocutors: Record<Interlocutor['id'], Interlocutor>;
  newestOtherUserMessageIndex?: number;
};

const MessageList = ({
  currentInterlocutorId,
  messages,
  interlocutors,
  newestOtherUserMessageIndex = -1,
}: Props) => {
  const isOwnMessage = (liveChatMessage: Message) =>
    liveChatMessage.interlocutorId === currentInterlocutorId;

  const shouldHideSender = (currentMessage: Message, prevMessage?: Message) => {
    if (prevMessage) {
      if (isOwnMessage(currentMessage)) return isOwnMessage(prevMessage);
      return prevMessage.interlocutorId === currentMessage.interlocutorId;
    }
    return false;
  };

  const newestReadCurrentUserMessageIndex = useMemo(
    () =>
      findLastIndex(
        messages,
        ({ interlocutorId, isRead }) =>
          interlocutorId === currentInterlocutorId && isRead,
      ),
    [messages, currentInterlocutorId],
  );

  const shouldMarkRead = useCallback(
    (messageIndex: number) => {
      if (newestReadCurrentUserMessageIndex === -1) return false;
      if (
        newestOtherUserMessageIndex !== -1 &&
        newestOtherUserMessageIndex > newestReadCurrentUserMessageIndex
      ) {
        return false;
      }
      return messageIndex === newestReadCurrentUserMessageIndex;
    },
    [newestOtherUserMessageIndex, newestReadCurrentUserMessageIndex],
  );

  const getSenderName = useCallback(
    (interlocutorId: string) => {
      const interlocutor = interlocutors[interlocutorId];
      if (!interlocutor) return '';
      return `${interlocutor?.firstName ?? ''} ${interlocutor?.lastName ?? ''}`;
    },
    [interlocutors],
  );

  return (
    <Box
      overflow="auto"
      display="flex"
      direction="column-reverse"
      mb={-6}
      mr={-16}
      pr={16}
    >
      <Box mb={24}>
        {messages.map((chatMessage, index) => {
          const hideSender = shouldHideSender(chatMessage, messages[index - 1]);
          const { id, interlocutorId, content } = chatMessage;
          return (
            <ChatMessage
              key={id}
              isMine={isOwnMessage(chatMessage)}
              senderName={getSenderName(interlocutorId)}
              hideSender={hideSender}
              markRead={shouldMarkRead(index)}
              mt={hideSender ? 8 : 16}
            >
              {content}
            </ChatMessage>
          );
        })}
      </Box>
    </Box>
  );
};

export default memo(MessageList);
