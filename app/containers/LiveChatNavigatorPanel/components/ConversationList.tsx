import React, { memo } from 'react';

import { Conversation, InterventionConversation } from 'models/LiveChat';

import useRefreshComponent from 'utils/useRefreshComponent';

import Column from 'components/Column';

import { ConversationListItem } from './ConversationListItem';
import { MESSAGE_TIMESTAMP_REFRESH_PERIOD } from '../constants';

import InterventionConversationCollapse from './InterventionConversationsCollapse';

export type Props = {
  interventionConversations: InterventionConversation[];
  conversations: Record<string, Conversation>;
  unreadConversationsCounts: Record<string, number>;
  openedConversationId: Nullable<string>;
  currentUserId: string;
  openConversation: (conversationId: string) => void;
};

const ConversationList = ({
  conversations,
  openedConversationId,
  unreadConversationsCounts,
  currentUserId,
  openConversation,
  interventionConversations,
}: Props) => {
  useRefreshComponent(MESSAGE_TIMESTAMP_REFRESH_PERIOD);

  const renderConversationListItem = (conversationId: string) => (
    <ConversationListItem
      key={conversationId}
      conversation={conversations[conversationId]}
      currentUserId={currentUserId}
      opened={conversationId === openedConversationId}
      onClick={openConversation}
    />
  );

  return (
    <Column overflow="auto" maxHeight="100%" pr={16}>
      {interventionConversations.map(
        ({ interventionId, conversationIds, interventionName }, index) => (
          <InterventionConversationCollapse
            key={interventionId}
            interventionName={interventionName}
            isFirst={index === 0}
            unreadConversationsCount={unreadConversationsCounts[interventionId]}
          >
            <Column gap={16} pb={16}>
              {conversationIds.map(renderConversationListItem)}
            </Column>
          </InterventionConversationCollapse>
        ),
      )}
    </Column>
  );
};

export default memo(ConversationList);
