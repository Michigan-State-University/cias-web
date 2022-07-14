import React from 'react';
import { useSelector } from 'react-redux';

import {
  MessageSentDTO,
  MessageReadDTO,
  ConversationArchivedDTO,
} from 'models/LiveChat';

import { makeSelectNoConversationsAvailable } from 'global/reducers/liveChat';

import { MessagesSectionBody } from './containers/MessagesSectionBody';
import MessagesSectionHeader from './containers/MessagesSectionHeader';
import { ConversationsSectionBody } from './containers/ConversationsSectionBody';
import {
  NavigatorPanelGridRow,
  NavigatorPanelGridColumn,
} from './components/styled';
import ConversationsSectionHeader from './components/ConversationsSectionHeader';

type Props = {
  onSendMessage: (messageSentDTO: MessageSentDTO) => void;
  onReadMessage: (messageReadDTO: MessageReadDTO) => void;
  onArchivedConversation: (
    conversationArchivedDTO: ConversationArchivedDTO,
  ) => void;
};

export const LiveChatNavigatorPanel = ({
  onSendMessage,
  onReadMessage,
  onArchivedConversation,
}: Props) => {
  const noConversationsAvailable = useSelector(
    makeSelectNoConversationsAvailable(),
  );

  return (
    <>
      <NavigatorPanelGridRow nogutter>
        <NavigatorPanelGridColumn xs={noConversationsAvailable ? 12 : 5}>
          <ConversationsSectionHeader />
          <ConversationsSectionBody />
        </NavigatorPanelGridColumn>
        {!noConversationsAvailable && (
          <NavigatorPanelGridColumn xs={7}>
            <MessagesSectionHeader
              onArchiveConversation={onArchivedConversation}
            />
            <MessagesSectionBody
              onSendMessage={onSendMessage}
              onReadMessage={onReadMessage}
            />
          </NavigatorPanelGridColumn>
        )}
      </NavigatorPanelGridRow>
    </>
  );
};

export default LiveChatNavigatorPanel;
