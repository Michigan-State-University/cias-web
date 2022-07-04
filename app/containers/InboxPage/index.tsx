import React, { useEffect } from 'react';
import { useIntl } from 'react-intl';
import { useDispatch } from 'react-redux';
import { useInjectReducer, useInjectSaga } from 'redux-injectors';

import {
  Message,
  MessageReadDTO,
  ConversationCreatedDTO,
  MessageSentDTO,
} from 'models/LiveChat';

import {
  allLiveChatSagasKey,
  allLiveChatSagas,
  liveChatReducer,
  liveChatReducerKey,
  onMessageSentReceive,
  onMessageReadReceive,
  onConversationCreatedReceive,
  NewConversationData,
} from 'global/reducers/liveChat';
import { mapConversationCreatedMessageData } from 'global/reducers/liveChat/utils';

import LiveChatNavigatorPanel from 'containers/LiveChatNavigatorPanel';
import AppContainer from 'components/Container';

import { useSocket } from 'utils/useSocket';
import { jsonApiToObject } from 'utils/jsonApiMapper';

import i18nMessages from './messages';
import {
  CONVERSATION_CHANNEL_NAME,
  ConversationChannelActionName,
  ConversationChannelMessageTopic,
} from './constants';
import { ConversationChannelMessage, ConversationChannelAction } from './types';

export const InboxPage = () => {
  const { formatMessage } = useIntl();

  const dispatch = useDispatch();
  useInjectSaga({ key: allLiveChatSagasKey, saga: allLiveChatSagas });
  // @ts-ignore
  useInjectReducer({ key: liveChatReducerKey, reducer: liveChatReducer });

  const channel = useSocket<
    ConversationChannelMessage,
    ConversationChannelAction
  >(CONVERSATION_CHANNEL_NAME);

  const onMessageSent = (newMessage: Message) => {
    dispatch(onMessageSentReceive(newMessage));
  };

  const onMessageRead = (messageReadDTO: MessageReadDTO) => {
    dispatch(onMessageReadReceive(messageReadDTO));
  };

  const onConversationCreated = (newConversation: NewConversationData) => {
    dispatch(onConversationCreatedReceive(newConversation));
  };

  const sendMessage = (messageSentDTO: MessageSentDTO) => {
    channel?.perform({
      name: ConversationChannelActionName.ON_MESSAGE_SENT,
      data: messageSentDTO,
    });
  };

  const readMessage = (messageReadDTO: MessageReadDTO) => {
    channel?.perform({
      name: ConversationChannelActionName.ON_MESSAGE_READ,
      data: messageReadDTO,
    });
  };

  const createConversation = (
    conversationCreatedDTO: ConversationCreatedDTO,
  ) => {
    channel?.perform({
      name: ConversationChannelActionName.ON_CONVERSATION_CREATED,
      data: conversationCreatedDTO,
    });
  };

  useEffect(() => {
    channel?.listen(({ data, topic }) => {
      switch (topic) {
        case ConversationChannelMessageTopic.MESSAGE_SENT:
          onMessageSent(jsonApiToObject(data, 'message'));
          break;
        case ConversationChannelMessageTopic.MESSAGE_READ:
          onMessageRead(data);
          break;
        case ConversationChannelMessageTopic.CONVERSATION_CREATED:
          onConversationCreated(mapConversationCreatedMessageData(data));
          break;
        default:
          break;
      }
    });
  }, [channel]);

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
        onCreateConversation={createConversation}
      />
    </AppContainer>
  );
};

export default InboxPage;
