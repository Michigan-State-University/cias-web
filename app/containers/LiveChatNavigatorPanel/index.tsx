import React from 'react';
import { useSelector } from 'react-redux';

import {
  ArchiveConversationData,
  ReadMessageData,
  SendMessageData,
} from 'utils/useConversationChannel';

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
  onSendMessage: (data: SendMessageData) => void;
  onReadMessage: (data: ReadMessageData) => void;
  onArchiveConversation: (data: ArchiveConversationData) => void;
};

export const LiveChatNavigatorPanel = ({
  onSendMessage,
  onReadMessage,
  onArchiveConversation,
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
              onArchiveConversation={onArchiveConversation}
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
