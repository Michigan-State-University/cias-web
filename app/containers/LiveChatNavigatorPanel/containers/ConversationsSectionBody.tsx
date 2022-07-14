import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useIntl } from 'react-intl';

import { themeColors } from 'theme';
import NoConversationsIcon from 'assets/svg/no-conversations.svg';

import {
  closeConversation,
  fetchConversationsRequest,
  makeSelectConversations,
  makeSelectInterventionConversationsValues,
  makeSelectLiveChatError,
  makeSelectLiveChatLoader,
  makeSelectNoConversationsAvailable,
  makeSelectOpenedConversationId,
  makeSelectUnreadConversationsCounts,
  openConversation,
} from 'global/reducers/liveChat';
import { makeSelectUserId } from 'global/reducers/auth';

import Spinner from 'components/Spinner';
import ErrorAlert from 'components/ErrorAlert';
import IconInfo from 'components/IconInfo';
import Column from 'components/Column';

import ConversationList from '../components/ConversationList';
import { SectionBody } from '../components/styled';
import i18nMessages from '../messages';
import { NO_CONVERSATIONS_INFO_MAX_WIDTH } from '../constants';

export const ConversationsSectionBody = () => {
  const { formatMessage } = useIntl();
  const dispatch = useDispatch();

  const interventionConversationValues = useSelector(
    makeSelectInterventionConversationsValues(),
  );
  const noConversationsAvailable = useSelector(
    makeSelectNoConversationsAvailable(),
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
    <SectionBody pb={16}>
      {loading && (
        <Column height="100%">
          <Spinner color={themeColors.secondary} />
        </Column>
      )}
      {error && (
        <ErrorAlert
          fullPage={false}
          errorText={i18nMessages.conversationsError}
        />
      )}
      {noConversationsAvailable && (
        <IconInfo
          maxWidth={NO_CONVERSATIONS_INFO_MAX_WIDTH}
          iconSrc={NoConversationsIcon}
          iconAlt={formatMessage(i18nMessages.noConversationsIconAlt)}
          message={formatMessage(i18nMessages.noConversations)}
        />
      )}
      {!loading && !error && !noConversationsAvailable && (
        <ConversationList
          interventionConversations={interventionConversationValues}
          conversations={conversations}
          unreadConversationsCounts={unreadConversationsCounts}
          openedConversationId={openedConversationId}
          currentUserId={currentUserId}
          openConversation={handleOpenConversation}
        />
      )}
    </SectionBody>
  );
};
