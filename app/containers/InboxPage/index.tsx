import React from 'react';
import { useIntl } from 'react-intl';

import { useConversationChannel } from 'utils/useConversationChannel';

import LiveChatNavigatorPanel from 'containers/LiveChatNavigatorPanel';
import AppContainer from 'components/Container';

import i18nMessages from './messages';

export const InboxPage = () => {
  const { formatMessage } = useIntl();

  const { sendMessage, readMessage, endConversation } =
    useConversationChannel();

  return (
    <AppContainer
      display="flex"
      direction="column"
      align="center"
      height="100%"
      py={54}
      pageTitle={formatMessage(i18nMessages.pageTitle)}
      $maxWidth="100%"
    >
      <LiveChatNavigatorPanel
        onSendMessage={sendMessage}
        onReadMessage={readMessage}
        onArchivedConversation={endConversation}
      />
    </AppContainer>
  );
};

export default InboxPage;
