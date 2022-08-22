import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useIntl } from 'react-intl';

import { themeColors } from 'theme';
import NoConversationsIcon from 'assets/svg/no-conversations.svg';

import { Conversation, InterventionConversation } from 'models/LiveChat';

import {
  closeConversation,
  makeSelectOpenedConversationId,
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

export type Props = {
  isArchive: boolean;
  conversations: Record<Conversation['id'], Conversation>;
  conversationsLoading: boolean;
  conversationsError: Nullable<string>;
  interventionConversationsValues: InterventionConversation[];
  conversationsUnavailable: boolean;
};

export const ConversationsSectionBody = ({
  isArchive,
  conversations,
  conversationsLoading,
  conversationsError,
  interventionConversationsValues,
  conversationsUnavailable,
}: Props) => {
  const { formatMessage } = useIntl();
  const dispatch = useDispatch();

  const openedConversationId = useSelector(makeSelectOpenedConversationId());
  const currentUserId = useSelector(makeSelectUserId());

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
      {conversationsLoading && (
        <Column height="100%">
          <Spinner color={themeColors.secondary} />
        </Column>
      )}
      {conversationsError && (
        <ErrorAlert fullPage={false} errorText={conversationsError} />
      )}
      {conversationsUnavailable && (
        <IconInfo
          maxWidth={NO_CONVERSATIONS_INFO_MAX_WIDTH}
          iconSrc={NoConversationsIcon}
          iconAlt={formatMessage(i18nMessages.noConversationsIconAlt)}
          message={formatMessage(
            i18nMessages[
              isArchive ? 'noArchivedConversations' : 'noActiveConversations'
            ],
          )}
        />
      )}
      {!conversationsLoading &&
        !conversationsError &&
        !conversationsUnavailable && (
          <ConversationList
            interventionConversationsValues={interventionConversationsValues}
            conversations={conversations}
            openedConversationId={openedConversationId}
            currentUserId={currentUserId}
            openConversation={handleOpenConversation}
          />
        )}
    </SectionBody>
  );
};
