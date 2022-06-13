import React, { memo } from 'react';

import { Conversation } from 'models/LiveChat';

import useRefreshComponent from 'utils/useRefreshComponent';

import Column from 'components/Column';

import { ConversationListItem } from './ConversationListItem';
import { MESSAGE_TIMESTAMP_REFRESH_PERIOD } from '../constants';

export type Props = {
  conversations: Conversation[];
  openedConversationId: Nullable<string>;
  currentUserId: string;
  openConversation: (conversationId: string) => void;
};

const ConversationList = ({
  conversations,
  openedConversationId,
  currentUserId,
  openConversation,
}: Props) => {
  useRefreshComponent(MESSAGE_TIMESTAMP_REFRESH_PERIOD);

  return (
    <Column gap={16} overflow="auto" maxHeight="100%" mr={-8} pr={8}>
      {conversations.map((conversation) => (
        <ConversationListItem
          key={conversation.id}
          conversation={conversation}
          currentUserId={currentUserId}
          opened={conversation.id === openedConversationId}
          onClick={openConversation}
        />
      ))}
    </Column>
  );
};

export default memo(ConversationList);
