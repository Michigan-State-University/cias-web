import React, { useEffect } from 'react';
import { useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';

import { useConversationChannel } from 'utils/useConversationChannel';

import {
  fetchActiveConversationsRequest,
  makeSelectActiveConversations,
  makeSelectActiveInterventionConversations,
  makeSelectLiveChatError,
  makeSelectLiveChatLoader,
} from 'global/reducers/liveChat';

import LiveChatNavigatorPanel from 'containers/LiveChatNavigatorPanel';
import AppContainer from 'components/Container';

import i18nMessages from './messages';

export const InboxPage = () => {
  const { formatMessage } = useIntl();
  const dispatch = useDispatch();

  const { sendMessage, readMessage, archiveConversation } =
    useConversationChannel();

  const activeConversations = useSelector(makeSelectActiveConversations());
  const activeConversationsLoading = useSelector(
    makeSelectLiveChatLoader('activeConversations'),
  );
  const activeConversationsError = useSelector(
    makeSelectLiveChatError('activeConversations'),
  );
  const activeInterventionConversations = useSelector(
    makeSelectActiveInterventionConversations(),
  );

  useEffect(() => {
    dispatch(fetchActiveConversationsRequest());
  }, []);

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
        isArchive={false}
        conversations={activeConversations}
        conversationsError={activeConversationsError?.message}
        conversationsLoading={activeConversationsLoading}
        interventionConversations={activeInterventionConversations}
        onSendMessage={sendMessage}
        onReadMessage={readMessage}
        onArchiveConversation={archiveConversation}
      />
    </AppContainer>
  );
};

export default InboxPage;
