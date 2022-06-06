import React, { useEffect } from 'react';
import { useIntl } from 'react-intl';
import { useDispatch } from 'react-redux';
import { useInjectReducer, useInjectSaga } from 'redux-injectors';

import {
  LiveChatMessage,
  SendLiveChatMessageDTO,
} from 'models/LiveChatMessage';
import { onNewChatMessage } from 'global/reducers/liveChat/actions';
import allLiveChatSagas, {
  allLiveChatSagasKey,
} from 'global/reducers/liveChat/sagas';
import { liveChatReducer, liveChatReducerKey } from 'global/reducers/liveChat';

import LiveChat from 'containers/LiveChat';
import AppContainer from 'components/Container';
import Box from 'components/Box';

import { useSocket } from 'utils/useSocket';
import { jsonApiToObject } from 'utils/jsonApiMapper';

import messages from './messages';
import {
  CONVERSATION_CHANNEL_NAME,
  ConversationChannelTopic,
} from './constants';
import { ConversationChannel } from './types';

export const InboxPage = () => {
  const { formatMessage } = useIntl();

  const dispatch = useDispatch();
  useInjectSaga({ key: allLiveChatSagasKey, saga: allLiveChatSagas });
  // @ts-ignore
  useInjectReducer({ key: liveChatReducerKey, reducer: liveChatReducer });

  const onNewMessage = (message: LiveChatMessage) => {
    dispatch(onNewChatMessage(message));
  };

  const channel = useSocket<ConversationChannel>(CONVERSATION_CHANNEL_NAME);

  useEffect(() => {
    channel?.listen(({ data, topic }) => {
      switch (topic) {
        case ConversationChannelTopic.NEW_CHAT_MESSAGE:
          onNewMessage(jsonApiToObject(data, 'message'));
          break;
        default:
          break;
      }
    });
  }, [channel]);

  const sendMessage = (
    content: string,
    conversationId: string,
    senderId: string,
  ) => {
    const message: SendLiveChatMessageDTO = {
      conversationId,
      content,
      senderId,
    };
    channel?.sent(message);
  };

  return (
    <AppContainer
      justify="center"
      display="flex"
      height="100%"
      py={54}
      pageTitle={formatMessage(messages.pageTitle)}
    >
      <Box width="100%" display="flex" justify="center">
        <LiveChat
          // TODO: get it from backend or from somewhere
          conversationId="703134ab-61bb-4e53-a4a7-02f92c6e3cc1"
          onSendMessage={sendMessage}
        />
      </Box>
    </AppContainer>
  );
};

export default InboxPage;
