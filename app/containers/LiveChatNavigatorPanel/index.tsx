import React from 'react';

import { themeColors } from 'theme';

import {
  MessageSentDTO,
  MessageReadDTO,
  ConversationArchivedDTO,
} from 'models/LiveChat';

import { MessagesSection } from './containers/MessagesSection';
import MessagesSectionHeader from './containers/MessagesSectionHeader';
import { ConversationsSection } from './containers/ConversationsSection';
import {
  NavigatorPanelGridRow,
  NavigatorPanelGridColumn,
  SectionBody,
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
}: Props) => (
  <>
    <NavigatorPanelGridRow nogutter>
      <NavigatorPanelGridColumn xs={5}>
        <ConversationsSectionHeader />
        <SectionBody pb={16}>
          <ConversationsSection />
        </SectionBody>
      </NavigatorPanelGridColumn>
      <NavigatorPanelGridColumn xs={7}>
        <MessagesSectionHeader onArchiveConversation={onArchivedConversation} />
        <SectionBody borderLeft={`1px solid ${themeColors.highlight}`} pl={24}>
          <MessagesSection
            onSendMessage={onSendMessage}
            onReadMessage={onReadMessage}
          />
        </SectionBody>
      </NavigatorPanelGridColumn>
    </NavigatorPanelGridRow>
  </>
);

export default LiveChatNavigatorPanel;
