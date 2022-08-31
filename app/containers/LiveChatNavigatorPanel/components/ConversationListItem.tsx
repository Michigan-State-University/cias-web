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
    lastMessage: {
      isRead,
      interlocutorId: messageInterlocutorId,
      createdAt,
      content,
    },
    liveChatInterlocutors,
    archived,
  } = conversation;

  const handleClick = () => onClick(conversationId);

  const otherInterlocutor = Object.values(liveChatInterlocutors).find(
    ({ userId }) => userId !== currentUserId,
  );

  const markUnread = !isRead && messageInterlocutorId === otherInterlocutor?.id;

  const lastMessageSentByCurrentUser =
    liveChatInterlocutors[messageInterlocutorId]?.userId === currentUserId;

  return (
    <ConversationInfoBox
      highlighted={opened}
      archived={archived}
      unread={markUnread}
      messageCreatedAt={createdAt}
      messageContent={content}
      messageSentByCurrentUser={lastMessageSentByCurrentUser}
      interlocutorData={otherInterlocutor}
      timeFormatLocale={CustomDayjsLocale.EN_SHORT_RELATIVE_TIME}
      onClick={handleClick}
    />
  );
};
