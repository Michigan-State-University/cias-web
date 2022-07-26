import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useInjectReducer, useInjectSaga } from 'redux-injectors';
import { toast } from 'react-toastify';

import { SocketErrorMessageData, useSocket } from 'utils/useSocket';
import { jsonApiToObject } from 'utils/jsonApiMapper';

import {
  allLiveChatSagas,
  allLiveChatSagasKey,
  liveChatReducer,
  liveChatReducerKey,
  mapConversationCreatedMessageData,
  markMessageReadLocally,
  onConversationCreatedReceive,
  onConversationArchivedReceive,
  onMessageReadReceive,
  onMessageSentReceive,
  openConversation,
  setCreatingConversation,
  setArchivingConversation,
  setGuestInterlocutorId,
  setNavigatorUnavailable,
} from 'global/reducers/liveChat';
import { makeSelectUserId } from 'global/reducers/auth';

import {
  ConversationArchivedData,
  ConversationChannelAction,
  ConversationChannelMessage,
  MessageReadData,
  SendMessageData,
  ReadMessageData,
  CreateConversationData,
  ArchiveConversationData,
  MessageSentData,
  ConversationCreatedData,
  ConversationChannelConnectionParams,
} from './types';
import {
  CONVERSATION_CHANNEL_NAME,
  ConversationChannelActionName,
  ConversationChannelMessageTopic,
} from './constants';

export const useConversationChannel = (interventionId?: string) => {
  const dispatch = useDispatch();
  useInjectSaga({ key: allLiveChatSagasKey, saga: allLiveChatSagas });
  // @ts-ignore
  useInjectReducer({ key: liveChatReducerKey, reducer: liveChatReducer });

  const currentUserId = useSelector(makeSelectUserId());

  const channel = useSocket<
    ConversationChannelMessage,
    ConversationChannelAction,
    ConversationChannelConnectionParams
  >(CONVERSATION_CHANNEL_NAME, {
    socketConnectionParams: { intervention_id: interventionId },
  });

  const showErrorToast = ({ error }: SocketErrorMessageData) => {
    toast.error(error);
  };

  const onMessageSent = (data: MessageSentData) => {
    const newMessage = jsonApiToObject(data, 'message');
    dispatch(onMessageSentReceive(newMessage));
  };

  const onMessageRead = ({ conversationId, messageId }: MessageReadData) => {
    dispatch(onMessageReadReceive(conversationId, messageId));
  };

  const onConversationCreated = (data: ConversationCreatedData) => {
    const newConversation = mapConversationCreatedMessageData(data);
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

  const onNavigatorUnavailable = () => {
    dispatch(setNavigatorUnavailable(true));
  };

  const onNavigatorUnavailableError = () => {
    dispatch(setCreatingConversation(false));
  };

  const onConversationArchived = ({
    conversationId,
  }: ConversationArchivedData) => {
    dispatch(onConversationArchivedReceive(conversationId));
    dispatch(setArchivingConversation(false));
  };

  const sendMessage = (data: SendMessageData) => {
    channel?.perform({
      name: ConversationChannelActionName.ON_MESSAGE_SENT,
      data,
    });
  };

  const readMessage = (data: ReadMessageData) => {
    dispatch(markMessageReadLocally(data.conversationId, data.messageId));
    channel?.perform({
      name: ConversationChannelActionName.ON_MESSAGE_READ,
      data,
    });
  };

  const createConversation = (data: CreateConversationData) => {
    dispatch(setCreatingConversation(true));
    channel?.perform({
      name: ConversationChannelActionName.ON_CONVERSATION_CREATED,
      data,
    });
  };

  const archiveConversation = (data: ArchiveConversationData) => {
    dispatch(setArchivingConversation(true));
    channel?.perform({
      name: ConversationChannelActionName.ON_CONVERSATION_ARCHIVED,
      data,
    });
  };

  useEffect(() => {
    channel?.listen(({ data, topic }) => {
      switch (topic) {
        case ConversationChannelMessageTopic.MESSAGE_SENT:
          onMessageSent(data);
          break;
        case ConversationChannelMessageTopic.MESSAGE_ERROR:
          showErrorToast(data);
          break;
        case ConversationChannelMessageTopic.MESSAGE_READ:
          onMessageRead(data);
          break;
        case ConversationChannelMessageTopic.CONVERSATION_CREATED:
          onConversationCreated(data);
          break;
        case ConversationChannelMessageTopic.NAVIGATOR_UNAVAILABLE:
          onNavigatorUnavailable();
          break;
        case ConversationChannelMessageTopic.CONVERSATION_ARCHIVED:
          onConversationArchived(data);
          break;
        case ConversationChannelMessageTopic.NAVIGATOR_UNAVAILABLE_ERROR:
          showErrorToast(data);
          onNavigatorUnavailableError();
          break;
        default:
          break;
      }
    });
  }, [channel]);

  return { sendMessage, readMessage, createConversation, archiveConversation };
};
