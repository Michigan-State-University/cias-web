import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useIntl } from 'react-intl';

import { themeColors } from 'theme';
import NoConversationOpenedIcon from 'assets/svg/no-conversation-opened.svg';

import { ReadMessageData, SendMessageData } from 'utils/useConversationChannel';

import {
  fetchConversationMessagesRequest,
  makeSelectArchivingConversation,
  makeSelectCurrentInterlocutorId,
  makeSelectLiveChatError,
  makeSelectLiveChatLoader,
  makeSelectOpenedConversation,
  makeSelectOpenedConversationMessages,
} from 'global/reducers/liveChat';

import Spinner from 'components/Spinner';
import ErrorAlert from 'components/ErrorAlert';
import ChatMessageList from 'components/ChatMessageList';
import ChatMessageInput from 'components/ChatMessageInput';
import IconInfo from 'components/IconInfo';
import Column from 'components/Column';

import i18nMessages from '../messages';
import { MessagesSectionContainer, SectionBody } from '../components/styled';
import { NO_CONVERSATION_OPENED_INFO_MAX_WIDTH } from '../constants';

export type Props = {
  isArchive: boolean;
  conversationsLoading: boolean;
  onSendMessage?: (data: SendMessageData) => void;
  onReadMessage?: (data: ReadMessageData) => void;
};

export const MessagesSectionBody = ({
  isArchive,
  conversationsLoading,
  onSendMessage,
  onReadMessage,
}: Props) => {
  const { formatMessage } = useIntl();
  const dispatch = useDispatch();

  const conversation = useSelector(makeSelectOpenedConversation());
  const archivingConversation = useSelector(makeSelectArchivingConversation());
  const messages = useSelector(makeSelectOpenedConversationMessages());
  const messagesLoading = useSelector(makeSelectLiveChatLoader('messages'));
  const messagesError = useSelector(makeSelectLiveChatError('messages'));
  const currentInterlocutorId = useSelector(makeSelectCurrentInterlocutorId());

  useEffect(() => {
    if (conversation?.id) {
      dispatch(fetchConversationMessagesRequest(conversation.id));
    }
  }, [conversation?.id]);

  const [message, setMessage] = useState('');

  useEffect(() => {
    setMessage('');
  }, [conversation?.id]);

  const handleRead = (data: ReadMessageData) => {
    if (!onReadMessage) return;
    onReadMessage(data);
  };

  const handleSend = () => {
    if (!onSendMessage) return;
    const trimmedMessage = message.trim();
    if (conversation && currentInterlocutorId && trimmedMessage) {
      onSendMessage({
        conversationId: conversation.id,
        content: trimmedMessage,
        interlocutorId: currentInterlocutorId,
      });
      setMessage('');
    }
  };

  const loading = messagesLoading || conversationsLoading;

  return (
    <SectionBody borderLeft={`1px solid ${themeColors.highlight}`} px={24}>
      {loading && (
        <Column height="100%">
          <Spinner color={themeColors.secondary} />
        </Column>
      )}
      {messagesError && (
        <ErrorAlert errorText={messagesError.message} mt={24} />
      )}
      {!loading && !messagesError && !conversation && (
        <IconInfo
          maxWidth={NO_CONVERSATION_OPENED_INFO_MAX_WIDTH}
          iconSrc={NoConversationOpenedIcon}
          iconAlt={formatMessage(i18nMessages.noConversationOpenedIconAlt)}
          message={formatMessage(
            i18nMessages[
              isArchive
                ? 'noArchivedConversationOpened'
                : 'noActiveConversationOpened'
            ],
          )}
        />
      )}
      {!loading && !messagesError && conversation && (
        <MessagesSectionContainer>
          <ChatMessageList
            currentInterlocutorId={currentInterlocutorId}
            messages={messages ?? []}
            interlocutors={conversation.liveChatInterlocutors}
            onReadMessage={handleRead}
            isNavigatorPanel
          />
          <ChatMessageInput
            value={message}
            onChange={setMessage}
            onSend={handleSend}
            disabled={conversation.archived || archivingConversation}
          />
        </MessagesSectionContainer>
      )}
    </SectionBody>
  );
};
