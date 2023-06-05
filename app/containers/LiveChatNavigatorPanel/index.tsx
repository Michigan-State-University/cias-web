import React, { useContext, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { Conversation, InterventionConversation } from 'models/LiveChat';

import {
  makeSelectOpenedConversationId,
  openConversation,
} from 'global/reducers/liveChat';

import {
  ArchiveConversationData,
  ReadMessageData,
  SendMessageData,
} from 'utils/useConversationChannel';
import useQuery from 'utils/useQuery';
import { NotificationChannelContext } from 'utils/useNotificationChannel';

import { MessagesSectionBody } from './containers/MessagesSectionBody';
import MessagesSectionHeader from './containers/MessagesSectionHeader';
import HelpingMaterialsSectionBody from './containers/HelpingMaterialsSectionBody';
import { ConversationsSectionBody } from './containers/ConversationsSectionBody';
import InterlocutorHeader from './containers/InterlocutorHeader';
import ConversationsSectionHeader from './components/ConversationsSectionHeader';
import HelpingMaterialsSectionHeader from './components/HelpingMaterialsSectionHeader';

import {
  NavigatorPanelGridRow,
  NavigatorPanelGridColumn,
} from './components/styled';

type Props = {
  isArchive: boolean;
  conversations: Record<Conversation['id'], Conversation>;
  conversationsLoading: boolean;
  conversationsError: Nullable<string>;
  interventionConversations: Record<
    InterventionConversation['interventionId'],
    InterventionConversation
  >;
  onSendMessage?: (data: SendMessageData) => void;
  onReadMessage?: (data: ReadMessageData) => void;
  onArchiveConversation?: (data: ArchiveConversationData) => void;
};

export const LiveChatNavigatorPanel = ({
  isArchive,
  conversations,
  conversationsLoading,
  conversationsError,
  interventionConversations,
  onSendMessage,
  onReadMessage,
  onArchiveConversation,
}: Props) => {
  const { readConversationNotifications } =
    useContext(NotificationChannelContext) ?? {};

  const openedConversationId = useSelector(makeSelectOpenedConversationId());

  useEffect(() => {
    if (openedConversationId && readConversationNotifications) {
      readConversationNotifications(openedConversationId);
    }
  }, [openedConversationId]);

  const interventionConversationsValues = useMemo(
    () => Object.values(interventionConversations),
    [interventionConversations],
  );
  const conversationToOpenId = useQuery('conversation_id');
  const dispatch = useDispatch();
  const { replace } = useHistory();

  useEffect(() => {
    if (conversationToOpenId) {
      dispatch(openConversation(conversationToOpenId));
      replace({ search: undefined });
    }
  }, [conversationToOpenId]);

  const conversationsUnavailable =
    !conversationsLoading &&
    !conversationsError &&
    !interventionConversationsValues.length;

  return (
    <NavigatorPanelGridRow nogutter fullWidth={conversationsUnavailable}>
      <NavigatorPanelGridColumn xs={conversationsUnavailable ? 12 : 3}>
        <ConversationsSectionHeader isArchive={isArchive} />
        <ConversationsSectionBody
          isArchive={isArchive}
          conversations={conversations}
          conversationsLoading={conversationsLoading}
          conversationsError={conversationsError}
          interventionConversationsValues={interventionConversationsValues}
          conversationsUnavailable={conversationsUnavailable}
        />
      </NavigatorPanelGridColumn>
      {!conversationsUnavailable && (
        <>
          <NavigatorPanelGridColumn xs={6}>
            <MessagesSectionHeader
              onArchiveConversation={onArchiveConversation}
            />
            <InterlocutorHeader />
            <MessagesSectionBody
              isArchive={isArchive}
              conversationsLoading={conversationsLoading}
              onSendMessage={onSendMessage}
              onReadMessage={onReadMessage}
            />
          </NavigatorPanelGridColumn>
          <NavigatorPanelGridColumn xs={3}>
            <HelpingMaterialsSectionHeader />
            <HelpingMaterialsSectionBody isArchive={isArchive} />
          </NavigatorPanelGridColumn>
        </>
      )}
    </NavigatorPanelGridRow>
  );
};

export default LiveChatNavigatorPanel;
