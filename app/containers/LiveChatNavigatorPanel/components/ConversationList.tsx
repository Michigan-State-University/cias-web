import React, { memo, useMemo } from 'react';

import { Conversation, InterventionConversation } from 'models/LiveChat';

import useRefreshComponent from 'utils/useRefreshComponent';

import Column from 'components/Column';

import { ConversationListItem } from './ConversationListItem';
import { MESSAGE_TIMESTAMP_REFRESH_PERIOD } from '../constants';

import InterventionConversationCollapse from './InterventionConversationsCollapse';
import { countUnreadConversations } from '../utils';

export type Props = {
  interventionConversationsValues: InterventionConversation[];
  conversations: Record<string, Conversation>;
  openedConversationId: Nullable<string>;
  currentUserId: string;
  openConversation: (conversationId: string) => void;
};

const ConversationList = ({
  conversations,
  openedConversationId,
  currentUserId,
  openConversation,
  interventionConversationsValues,
}: Props) => {
  useRefreshComponent(MESSAGE_TIMESTAMP_REFRESH_PERIOD);

  const unreadConversationsCounts = useMemo(
    () =>
      countUnreadConversations(
        interventionConversationsValues,
        conversations,
        currentUserId,
      ),
    [interventionConversationsValues, conversations, currentUserId],
  );

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
      {interventionConversationsValues.map(
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
