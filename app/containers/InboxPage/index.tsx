import React, { useEffect } from 'react';
import { useIntl } from 'react-intl';
import { useDispatch } from 'react-redux';
import { useInjectReducer, useInjectSaga } from 'redux-injectors';

import { Message, MessageReadDTO, NewMessageDTO } from 'models/LiveChat';

import {
  allLiveChatSagasKey,
  allLiveChatSagas,
  liveChatReducer,
  liveChatReducerKey,
  onMessageSentReceive,
  onMessageReadReceive,
} from 'global/reducers/liveChat';

import LiveChatNavigatorPanel from 'containers/LiveChatNavigatorPanel';
import AppContainer from 'components/Container';

import { useSocket } from 'utils/useSocket';
import { jsonApiToObject } from 'utils/jsonApiMapper';

import messages from './messages';
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

  const sendMessage = (newMessage: NewMessageDTO) => {
    channel?.perform({
      name: ConversationChannelActionName.ON_MESSAGE_SENT,
      data: newMessage,
    });
  };

  const readMessage = (messageReadDTO: MessageReadDTO) => {
    channel?.perform({
      name: ConversationChannelActionName.ON_MESSAGE_READ,
      data: messageReadDTO,
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
      pageTitle={formatMessage(messages.pageTitle)}
    >
      <LiveChatNavigatorPanel
        onSendMessage={sendMessage}
        onReadMessage={readMessage}
      />
    </AppContainer>
  );
};

export default InboxPage;
