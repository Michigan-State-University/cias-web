import React, { memo } from 'react';
import { useIntl } from 'react-intl';

import { Conversation, InterventionConversation } from 'models/LiveChat';

import useRefreshComponent from 'utils/useRefreshComponent';

import Column from 'components/Column';
import Text from 'components/Text';
import Box from 'components/Box';

import { colors } from 'theme';
import { ConversationListItem } from './ConversationListItem';
import { MESSAGE_TIMESTAMP_REFRESH_PERIOD } from '../constants';

import i18nMessages from '../messages';
import InterventionConversationListItem from './InterventionConversationListItem';

export type Props = {
  interventionConversations: InterventionConversation[];
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
    <Column gap={16} overflow="auto" maxHeight="100%" mr={-8} pr={8}>
      {!interventionConversations.length && (
        <Text>{formatMessage(i18nMessages.noConversations)}</Text>
      )}
      {interventionConversations.map((interventionConversation, index) => (
        <Box
          key={interventionConversation.interventionId}
          borderBottom={`1px solid ${colors.linkWater}`}
          borderRadius="0"
          pb={16}
        >
          <InterventionConversationListItem
            interventionConversation={interventionConversation}
            renderConversation={renderConversationListItem}
            isFirst={index === 0}
          />
        </Box>
      ))}
    </Column>
  );
};

export default memo(ConversationList);
