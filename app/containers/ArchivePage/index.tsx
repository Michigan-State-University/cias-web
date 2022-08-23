import React, { useEffect } from 'react';
import { useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { useInjectReducer, useInjectSaga } from 'redux-injectors';

import {
  fetchArchivedConversationsRequest,
  makeSelectArchivedConversations,
  makeSelectArchivedInterventionConversations,
  makeSelectLiveChatError,
  makeSelectLiveChatLoader,
  withAllLiveChatSagas,
  withLiveChatReducer,
} from 'global/reducers/liveChat';

import LiveChatNavigatorPanel from 'containers/LiveChatNavigatorPanel';
import { FillAppContainer } from 'components/Container';

import i18nMessages from './messages';

export const ArchivePage = () => {
  const { formatMessage } = useIntl();
  const dispatch = useDispatch();
  useInjectReducer(withLiveChatReducer);
  useInjectSaga(withAllLiveChatSagas);

  const archivedConversations = useSelector(makeSelectArchivedConversations());
  const archivedConversationsLoading = useSelector(
    makeSelectLiveChatLoader('archivedConversations'),
  );
  const archivedConversationsError = useSelector(
    makeSelectLiveChatError('archivedConversations'),
  );
  const archivedInterventionConversations = useSelector(
    makeSelectArchivedInterventionConversations(),
  );

  useEffect(() => {
    dispatch(fetchArchivedConversationsRequest());
  }, []);

  return (
    <FillAppContainer pageTitle={formatMessage(i18nMessages.pageTitle)}>
      <LiveChatNavigatorPanel
        isArchive
        conversations={archivedConversations}
        conversationsError={archivedConversationsError?.message}
        conversationsLoading={archivedConversationsLoading}
        interventionConversations={archivedInterventionConversations}
      />
    </FillAppContainer>
  );
};

export default ArchivePage;
