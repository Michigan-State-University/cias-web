import React, { memo, useCallback, useEffect, useMemo } from 'react';
import findLastIndex from 'lodash/findLastIndex';
import { useIntl } from 'react-intl';

import { Interlocutor, Message } from 'models/LiveChat';

import { formatInterlocutorName } from 'utils/liveChatUtils';
import { ReadMessageData } from 'utils/useConversationChannel';

import Box from 'components/Box';
import ChatMessage from 'components/ChatMessage';
import Text from 'components/Text';

import i18nMessages from './messages';

export type Props = {
  currentInterlocutorId: Nullable<string>;
  messages: Message[];
  interlocutors: Record<Interlocutor['id'], Interlocutor>;
  onReadMessage: (data: ReadMessageData) => void;
};

const ChatMessageList = ({
  currentInterlocutorId,
  messages,
  interlocutors,
  onReadMessage,
}: Props) => {
  const { formatMessage } = useIntl();

  const isOwnMessage = (liveChatMessage: Message) =>
    liveChatMessage.interlocutorId === currentInterlocutorId;

  const shouldHideSender = (currentMessage: Message, prevMessage?: Message) => {
    if (prevMessage) {
      if (isOwnMessage(currentMessage)) return isOwnMessage(prevMessage);
      return prevMessage.interlocutorId === currentMessage.interlocutorId;
    }
    return false;
  };

  const newestOtherUserMessageIndex = useMemo(() => {
    if (!messages || !currentInterlocutorId) return -1;
    return findLastIndex(
      messages,
      ({ interlocutorId }) => interlocutorId !== currentInterlocutorId,
    );
  }, [messages, currentInterlocutorId]);

  const readNewestOtherUserMessage = useCallback(() => {
    if (!messages || newestOtherUserMessageIndex === -1) {
      return;
    }

    const { id, conversationId, isRead } =
      messages[newestOtherUserMessageIndex];

    if (!isRead) {
      onReadMessage({
        conversationId,
        messageId: id,
      });
    }
  }, [newestOtherUserMessageIndex, onReadMessage]);

  useEffect(() => {
    readNewestOtherUserMessage();
  }, [readNewestOtherUserMessage]);

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
      return formatInterlocutorName(interlocutor);
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
        {!messages.length && (
          <Text>{formatMessage(i18nMessages.noMessages)}</Text>
        )}
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

export default memo(ChatMessageList);
