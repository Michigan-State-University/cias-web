import React, { useMemo } from 'react';

import { Conversation, InterventionConversation } from 'models/LiveChat';

import {
  ArchiveConversationData,
  ReadMessageData,
  SendMessageData,
} from 'utils/useConversationChannel';

import { MessagesSectionBody } from './containers/MessagesSectionBody';
import MessagesSectionHeader from './containers/MessagesSectionHeader';
import HelpingMaterialsSectionBody from './containers/HelpingMaterialsSectionBody';
import { ConversationsSectionBody } from './containers/ConversationsSectionBody';
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
  const interventionConversationsValues = useMemo(
    () => Object.values(interventionConversations),
    [interventionConversations],
  );

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
            <MessagesSectionBody
              isArchive={isArchive}
              conversationsLoading={conversationsLoading}
              onSendMessage={onSendMessage}
              onReadMessage={onReadMessage}
            />
          </NavigatorPanelGridColumn>
          <NavigatorPanelGridColumn xs={3}>
            <HelpingMaterialsSectionHeader />

            <HelpingMaterialsSectionBody />
          </NavigatorPanelGridColumn>
        </>
      )}
    </NavigatorPanelGridRow>
  );
};

export default LiveChatNavigatorPanel;
