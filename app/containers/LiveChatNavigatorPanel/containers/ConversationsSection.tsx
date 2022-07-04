import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { themeColors } from 'theme';

import {
  closeConversation,
  fetchConversationsRequest,
  makeSelectConversations,
  makeSelectInterventionConversationsValues,
  makeSelectLiveChatError,
  makeSelectLiveChatLoader,
  makeSelectOpenedConversationId,
  makeSelectUnreadConversationsCounts,
  openConversation,
} from 'global/reducers/liveChat';
import { makeSelectUserId } from 'global/reducers/auth';

import Spinner from 'components/Spinner';
import ErrorAlert from 'components/ErrorAlert';

import ConversationList from '../components/ConversationList';
import i18nMessages from '../messages';

export const ConversationsSection = () => {
  const dispatch = useDispatch();

  const interventionConversationValues = useSelector(
    makeSelectInterventionConversationsValues(),
  );
  const conversations = useSelector(makeSelectConversations());
  const loading = useSelector(makeSelectLiveChatLoader('conversations'));
  const error = useSelector(makeSelectLiveChatError('conversations'));
  const openedConversationId = useSelector(makeSelectOpenedConversationId());
  const currentUserId = useSelector(makeSelectUserId());
  const unreadConversationsCounts = useSelector(
    makeSelectUnreadConversationsCounts(),
  );

  useEffect(() => {
    dispatch(fetchConversationsRequest());
  }, []);

  useEffect(() => {
    if (loading || error) return;

    const firstInterventionConversation = interventionConversationValues[0];
    if (firstInterventionConversation) {
      const firstConversation =
        firstInterventionConversation.conversationIds[0];
      if (firstConversation) {
        dispatch(openConversation(firstConversation));
      }
    }
  }, [loading, error]);

  useEffect(
    () => () => {
      dispatch(closeConversation());
    },
    [],
  );

  const handleOpenConversation = (conversationId: string) => {
    dispatch(openConversation(conversationId));
  };

  return (
    <>
      {loading && <Spinner color={themeColors.secondary} />}
      {error && (
        <ErrorAlert
          fullPage={false}
          errorText={i18nMessages.conversationsError}
        />
      )}
      {!loading && !error && (
        <ConversationList
          interventionConversations={interventionConversationValues}
          conversations={conversations}
          unreadConversationsCounts={unreadConversationsCounts}
          openedConversationId={openedConversationId}
          currentUserId={currentUserId}
          openConversation={handleOpenConversation}
        />
      )}
    </>
  );
};
