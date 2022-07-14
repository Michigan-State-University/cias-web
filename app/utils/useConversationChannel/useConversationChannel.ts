import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useInjectReducer, useInjectSaga } from 'redux-injectors';

import {
  ConversationCreatedDTO,
  ConversationArchivedDTO,
  Message,
  MessageReadDTO,
  MessageSentDTO,
} from 'models/LiveChat';

import { useSocket } from 'utils/useSocket';
import { jsonApiToObject } from 'utils/jsonApiMapper';

import {
  allLiveChatSagas,
  allLiveChatSagasKey,
  liveChatReducer,
  liveChatReducerKey,
  mapConversationCreatedMessageData,
  markMessageReadLocally,
  NewConversationData,
  onConversationCreatedReceive,
  onConversationArchivedReceive,
  onMessageReadReceive,
  onMessageSentReceive,
  openConversation,
  setCreatingConversation,
  setArchivingConversation,
  setGuestInterlocutorId,
} from 'global/reducers/liveChat';
import { makeSelectUserId } from 'global/reducers/auth';

import { ConversationChannelAction, ConversationChannelMessage } from './types';
import {
  CONVERSATION_CHANNEL_NAME,
  ConversationChannelActionName,
  ConversationChannelMessageTopic,
} from './constants';

export const useConversationChannel = () => {
  const dispatch = useDispatch();
  useInjectSaga({ key: allLiveChatSagasKey, saga: allLiveChatSagas });
  // @ts-ignore
  useInjectReducer({ key: liveChatReducerKey, reducer: liveChatReducer });

  const currentUserId = useSelector(makeSelectUserId());

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

    const { lastMessage, liveChatInterlocutors, id } =
      newConversation.conversation;

    const isGuest = !currentUserId;
    const isCreatedByCurrentUser =
      liveChatInterlocutors[lastMessage.interlocutorId].userId ===
      currentUserId;

    // if user is not logged in and receives conversation_created message it means that they created this conversation
    if (isGuest || isCreatedByCurrentUser) {
      dispatch(openConversation(id));
      dispatch(setCreatingConversation(false));
    }

    if (isGuest) {
      dispatch(setGuestInterlocutorId(lastMessage.interlocutorId));
    }
  };

  const onConversationArchived = (
    conversationArchivedDTO: ConversationArchivedDTO,
  ) => {
    dispatch(onConversationArchivedReceive(conversationArchivedDTO));
    dispatch(setArchivingConversation(false));
  };

  const sendMessage = (messageSentDTO: MessageSentDTO) => {
    channel?.perform({
      name: ConversationChannelActionName.ON_MESSAGE_SENT,
      data: messageSentDTO,
    });
  };

  const readMessage = (messageReadDTO: MessageReadDTO) => {
    dispatch(
      markMessageReadLocally(
        messageReadDTO.conversationId,
        messageReadDTO.messageId,
      ),
    );
    channel?.perform({
      name: ConversationChannelActionName.ON_MESSAGE_READ,
      data: messageReadDTO,
    });
  };

  const createConversation = (
    conversationCreatedDTO: ConversationCreatedDTO,
  ) => {
    dispatch(setCreatingConversation(true));
    channel?.perform({
      name: ConversationChannelActionName.ON_CONVERSATION_CREATED,
      data: conversationCreatedDTO,
    });
  };

  const endConversation = (
    conversationArchivedDTO: ConversationArchivedDTO,
  ) => {
    dispatch(setArchivingConversation(true));
    channel?.perform({
      name: ConversationChannelActionName.ON_CONVERSATION_ARCHIVED,
      data: conversationArchivedDTO,
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
        case ConversationChannelMessageTopic.CONVERSATION_ARCHIVED:
          onConversationArchived(data);
          break;
        default:
          break;
      }
    });
  }, [channel]);

  return { sendMessage, readMessage, createConversation, endConversation };
};
