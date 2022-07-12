import React, { memo } from 'react';
import { useIntl } from 'react-intl';

import { Conversation, InterventionConversation } from 'models/LiveChat';

import useRefreshComponent from 'utils/useRefreshComponent';

import Column from 'components/Column';
import Text from 'components/Text';

import { ConversationListItem } from './ConversationListItem';
import { MESSAGE_TIMESTAMP_REFRESH_PERIOD } from '../constants';

import i18nMessages from '../messages';
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
  const { formatMessage } = useIntl();

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
      {!interventionConversations.length && (
        <Text mt={16}>{formatMessage(i18nMessages.noConversations)}</Text>
      )}
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
