import { useDispatch, useSelector } from 'react-redux';
import { useInjectReducer } from 'redux-injectors';
import { toast } from 'react-toastify';

import {
  SocketErrorMessageData,
  SocketMessageListener,
  useSocket,
} from 'utils/useSocket';
import { jsonApiToObject } from 'utils/jsonApiMapper';

import {
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
  onLiveChatSetupFetchedReceive,
  setFetchingLiveChatSetup,
  withLiveChatReducer,
  closeConversation,
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
  LiveChatSetupFetchedData,
} from './types';
import {
  CONVERSATION_CHANNEL_NAME,
  ConversationChannelActionName,
  ConversationChannelMessageTopic,
} from './constants';

export const useConversationChannel = (interventionId?: string) => {
  const dispatch = useDispatch();
  useInjectReducer(withLiveChatReducer);

  const currentUserId = useSelector(makeSelectUserId());

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
    dispatch(setNavigatorUnavailable(true));
  };

  const onConversationArchived = ({
    conversationId,
  }: ConversationArchivedData) => {
    dispatch(onConversationArchivedReceive(conversationId));
    dispatch(setArchivingConversation(false));
    // close conversation for navigator
    if (!interventionId) {
      dispatch(closeConversation());
    }
  };

  const onLiveChatSetupFetched = (data: LiveChatSetupFetchedData) => {
    const liveChatSetup = jsonApiToObject(data, 'liveChatSetup');
    dispatch(onLiveChatSetupFetchedReceive(liveChatSetup));
  };

  const onNavigatorAvailable = () => {
    dispatch(setNavigatorUnavailable(false));
  };

  const messageListener: SocketMessageListener<ConversationChannelMessage> = ({
    data,
    topic,
  }) => {
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
      case ConversationChannelMessageTopic.LIVE_CHAT_SETUP_FETCHED:
        onLiveChatSetupFetched(data);
        break;
      case ConversationChannelMessageTopic.NAVIGATOR_AVAILABLE:
        onNavigatorAvailable();
        break;
      default:
        break;
    }
  };

  const channel = useSocket<
    ConversationChannelMessage,
    ConversationChannelAction,
    ConversationChannelConnectionParams
  >(CONVERSATION_CHANNEL_NAME, messageListener, {
    socketConnectionParams: { intervention_id: interventionId },
  });

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

  const fetchLiveChatSetup = () => {
    if (interventionId) {
      dispatch(setFetchingLiveChatSetup(true));
      channel?.perform({
        name: ConversationChannelActionName.ON_FETCH_LIVE_CHAT_SETUP,
        data: { interventionId },
      });
    }
  };

  return {
    isConnected: channel?.state === 'connected',
    sendMessage,
    readMessage,
    createConversation,
    archiveConversation,
    fetchLiveChatSetup,
  };
};
