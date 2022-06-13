import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { themeColors } from 'theme';

import {
  closeConversation,
  fetchConversationsRequest,
  makeSelectConversations,
  makeSelectLiveChatError,
  makeSelectLiveChatLoader,
  makeSelectOpenedConversationId,
  openConversation,
} from 'global/reducers/liveChat';
import { makeSelectUserId } from 'global/reducers/auth';

import Spinner from 'components/Spinner';
import ErrorAlert from 'components/ErrorAlert';

import ConversationList from '../components/ConversationList';
import i18nMessages from '../messages';

export const ConversationsSection = () => {
  const dispatch = useDispatch();

  const conversations = useSelector(makeSelectConversations());
  const loading = useSelector(makeSelectLiveChatLoader('conversations'));
  const error = useSelector(makeSelectLiveChatError('conversations'));
  const openedConversationId = useSelector(makeSelectOpenedConversationId());
  const currentUserId = useSelector(makeSelectUserId());

  const conversationsValues = useMemo(
    () => Object.values(conversations),
    [conversations],
  );

  useEffect(() => {
    dispatch(fetchConversationsRequest());
  }, []);

  useEffect(() => {
    if (loading || error) return;

    const firstConversation = conversationsValues[0];
    if (firstConversation) {
      dispatch(openConversation(firstConversation.id));
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
          conversations={conversationsValues}
          openedConversationId={openedConversationId}
          currentUserId={currentUserId}
          openConversation={handleOpenConversation}
        />
      )}
    </>
  );
};
