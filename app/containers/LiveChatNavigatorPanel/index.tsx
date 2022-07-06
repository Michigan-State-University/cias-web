import React from 'react';
import { FormattedMessage } from 'react-intl';

import { themeColors } from 'theme';

import {
  MessageSentDTO,
  MessageReadDTO,
  ConversationCreatedDTO,
} from 'models/LiveChat';

import H2 from 'components/H2';

import i18nMessages from './messages';
import { MessagesSection } from './containers/MessagesSection';
import { ConversationsSection } from './containers/ConversationsSection';
import {
  NavigatorPanelGridRow,
  NavigatorPanelGridColumn,
  SectionHeader,
  SectionBody,
} from './components/styled';
import { CreateConversationForm } from './components/CreateConversationForm';

type Props = {
  onSendMessage: (messageSentDTO: MessageSentDTO) => void;
  onReadMessage: (messageReadDTO: MessageReadDTO) => void;
  onCreateConversation: (
    conversationCreatedDTO: ConversationCreatedDTO,
  ) => void;
};

export const LiveChatNavigatorPanel = ({
  onSendMessage,
  onReadMessage,
  onCreateConversation,
}: Props) => (
  <>
    <CreateConversationForm onCreateConversation={onCreateConversation} />
    <NavigatorPanelGridRow nogutter>
      <NavigatorPanelGridColumn xs={5}>
        <SectionHeader>
          <H2>
            <FormattedMessage {...i18nMessages.inbox} />
          </H2>
        </SectionHeader>
        <SectionBody pb={16}>
          <ConversationsSection />
        </SectionBody>
      </NavigatorPanelGridColumn>
      <NavigatorPanelGridColumn xs={7}>
        <SectionHeader>
          <H2 ml={24}>
            <FormattedMessage {...i18nMessages.message} />
          </H2>
        </SectionHeader>
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
