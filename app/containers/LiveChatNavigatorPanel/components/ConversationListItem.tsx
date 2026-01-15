import React from 'react';

import { Conversation } from 'models/LiveChat';

import { CustomDayjsLocale } from 'utils/dayjs';

import { ConversationInfoBox } from 'components/ConversationInfoBox';

export type Props = {
  conversation: Conversation;
  currentUserId: string;
  opened: boolean;
  onClick: (conversationId: string) => void;
};

export const ConversationListItem = ({
  conversation,
  currentUserId,
  opened,
  onClick,
}: Props) => {
  const {
    id: conversationId,
    lastMessage,
    liveChatInterlocutors,
    archivedAt,
  } = conversation;

  const handleClick = () => onClick(conversationId);

  if (!lastMessage) {
    return null;
  }

  const {
    isRead,
    interlocutorId: messageInterlocutorId,
    createdAt,
    content,
  } = lastMessage;

  const otherInterlocutor = Object.values(liveChatInterlocutors).find(
    ({ userId }) => userId !== currentUserId,
  );

  const markUnread = !isRead && messageInterlocutorId === otherInterlocutor?.id;

  const lastMessageSentByCurrentUser =
    liveChatInterlocutors[messageInterlocutorId]?.userId === currentUserId;

  return (
    <ConversationInfoBox
      id={conversationId}
      active={opened}
      highlighted={markUnread}
      archived={!!archivedAt}
      time={createdAt}
      timeFormatLocale={CustomDayjsLocale.EN_SHORT_RELATIVE_TIME}
      messageContent={content}
      messageSentByCurrentUser={lastMessageSentByCurrentUser}
      interlocutorData={otherInterlocutor}
      onClick={handleClick}
    />
  );
};
