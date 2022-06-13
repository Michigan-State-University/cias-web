import React from 'react';
import { FormattedMessage } from 'react-intl';

import { themeColors } from 'theme';

import { NewMessageDTO, MessageReadDTO } from 'models/LiveChat';

import H2 from 'components/H2';

import messages from './messages';
import { MessagesSection } from './containers/MessagesSection';
import { ConversationsSection } from './containers/ConversationsSection';
import {
  NavigatorPanelGridRow,
  NavigatorPanelGridColumn,
  SectionHeader,
  SectionBody,
} from './components/styled';

type Props = {
  onSendMessage: (newMessage: NewMessageDTO) => void;
  onReadMessage: (messageReadDTO: MessageReadDTO) => void;
};

export const LiveChatNavigatorPanel = ({
  onSendMessage,
  onReadMessage,
}: Props) => (
  <NavigatorPanelGridRow nogutter>
    <NavigatorPanelGridColumn xs={5}>
      <SectionHeader>
        <H2>
          <FormattedMessage {...messages.inbox} />
        </H2>
      </SectionHeader>
      <SectionBody pr={12} py={16}>
        <ConversationsSection />
      </SectionBody>
    </NavigatorPanelGridColumn>
    <NavigatorPanelGridColumn xs={7}>
      <SectionHeader>
        <H2 ml={24}>
          <FormattedMessage {...messages.message} />
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
);

export default LiveChatNavigatorPanel;
