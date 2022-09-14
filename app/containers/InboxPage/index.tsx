import React, { useEffect } from 'react';
import { useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { useInjectReducer, useInjectSaga } from 'redux-injectors';

import { useConversationChannel } from 'utils/useConversationChannel';

import {
  fetchActiveConversationsRequest,
  makeSelectActiveConversations,
  makeSelectActiveInterventionConversations,
  makeSelectLiveChatError,
  makeSelectLiveChatLoader,
  withAllLiveChatSagas,
  withLiveChatReducer,
} from 'global/reducers/liveChat';

import LiveChatNavigatorPanel from 'containers/LiveChatNavigatorPanel';
import { FillAppContainer } from 'components/Container';

import i18nMessages from './messages';

export const InboxPage = () => {
  const { formatMessage } = useIntl();
  const dispatch = useDispatch();

  useInjectReducer(withLiveChatReducer);
  useInjectSaga(withAllLiveChatSagas);

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
    <FillAppContainer pageTitle={formatMessage(i18nMessages.pageTitle)}>
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
    </FillAppContainer>
  );
};

export default InboxPage;
