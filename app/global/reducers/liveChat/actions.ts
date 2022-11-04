import { createAction } from 'typesafe-actions';

import {
  InterventionConversation,
  Conversation,
  Message,
} from 'models/LiveChat';
import { ApiError } from 'models/Api';

import {
  LiveChatSetup,
  NavigatorHelpingMaterials,
} from 'models/NavigatorSetup';

import {
  ON_MESSAGE_SENT_RECEIVE,
  OPEN_CONVERSATION,
  ON_MESSAGE_READ_RECEIVE,
  CLOSE_CONVERSATION,
  FETCH_ACTIVE_CONVERSATIONS_REQUEST,
  FETCH_ACTIVE_CONVERSATIONS_SUCCESS,
  FETCH_ACTIVE_CONVERSATIONS_ERROR,
  FETCH_CONVERSATION_MESSAGES_ERROR,
  FETCH_CONVERSATION_MESSAGES_REQUEST,
  FETCH_CONVERSATION_MESSAGES_SUCCESS,
  ON_CONVERSATION_CREATED_RECEIVE,
  MARK_MESSAGE_READ_LOCALLY,
  SET_CREATING_CONVERSATION,
  SET_GUEST_INTERLOCUTOR_ID,
  SET_ARCHIVING_CONVERSATION,
  ON_CONVERSATION_ARCHIVED_RECEIVE,
  SET_NAVIGATOR_UNAVAILABLE,
  ON_LIVE_CHAT_SETUP_FETCHED_RECEIVE,
  SET_FETCHING_LIVE_CHAT_SETUP,
  FETCH_ARCHIVED_CONVERSATIONS_REQUEST,
  FETCH_ARCHIVED_CONVERSATIONS_SUCCESS,
  FETCH_ARCHIVED_CONVERSATIONS_ERROR,
  FETCH_NAVIGATOR_HELPING_MATERIALS_REQUEST,
  FETCH_NAVIGATOR_HELPING_MATERIALS_SUCCESS,
  FETCH_NAVIGATOR_HELPING_MATERIALS_ERROR,
  GENERATE_CONVERSATION_TRANSCRIPT_REQUEST,
  ON_CURRENT_SCREEN_TITLE_CHANGED,
  SET_CURRENT_NAVIGATOR_UNAVAILABLE,
} from './constants';

export const openConversation = createAction(
  OPEN_CONVERSATION,
  (action) => (conversationId: string) => action({ conversationId }),
);

export const closeConversation = createAction(
  CLOSE_CONVERSATION,
  (action) => () => action({}),
);

export const fetchActiveConversationsRequest = createAction(
  FETCH_ACTIVE_CONVERSATIONS_REQUEST,
  (action) => () => action({}),
);

export const fetchActiveConversationsSuccess = createAction(
  FETCH_ACTIVE_CONVERSATIONS_SUCCESS,
  (action) =>
    (
      interventionConversations: Record<string, InterventionConversation>,
      conversations: Record<Conversation['id'], Conversation>,
    ) =>
      action({ interventionConversations, conversations }),
);

export const fetchActiveConversationsError = createAction(
  FETCH_ACTIVE_CONVERSATIONS_ERROR,
  (action) => (error: ApiError) => action({ error }),
);

export const fetchArchivedConversationsRequest = createAction(
  FETCH_ARCHIVED_CONVERSATIONS_REQUEST,
  (action) => () => action({}),
);

export const fetchArchivedConversationsSuccess = createAction(
  FETCH_ARCHIVED_CONVERSATIONS_SUCCESS,
  (action) =>
    (
      interventionConversations: Record<string, InterventionConversation>,
      conversations: Record<Conversation['id'], Conversation>,
    ) =>
      action({ interventionConversations, conversations }),
);

export const fetchArchivedConversationsError = createAction(
  FETCH_ARCHIVED_CONVERSATIONS_ERROR,
  (action) => (error: ApiError) => action({ error }),
);

export const fetchConversationMessagesRequest = createAction(
  FETCH_CONVERSATION_MESSAGES_REQUEST,
  (action) => (conversationId: Conversation['id']) =>
    action({ conversationId }),
);

export const fetchConversationMessagesSuccess = createAction(
  FETCH_CONVERSATION_MESSAGES_SUCCESS,
  (action) => (conversationId: Conversation['id'], messages: Message[]) =>
    action({ messages, conversationId }),
);

export const fetchConversationMessagesError = createAction(
  FETCH_CONVERSATION_MESSAGES_ERROR,
  (action) => (conversationId: Conversation['id'], error: ApiError) =>
    action({ conversationId, error }),
);

export const onMessageSentReceive = createAction(
  ON_MESSAGE_SENT_RECEIVE,
  (action) => (message: Message) => action({ message }),
);

export const markMessageReadLocally = createAction(
  MARK_MESSAGE_READ_LOCALLY,
  (action) => (conversationId: string, messageId: string) =>
    action({ conversationId, messageId }),
);

export const onMessageReadReceive = createAction(
  ON_MESSAGE_READ_RECEIVE,
  (action) => (conversationId: string, messageId: string) =>
    action({ conversationId, messageId }),
);

export const setCreatingConversation = createAction(
  SET_CREATING_CONVERSATION,
  (action) => (creatingConversation: boolean) =>
    action({ creatingConversation }),
);

export const setNavigatorUnavailable = createAction(
  SET_NAVIGATOR_UNAVAILABLE,
  (action) => (navigatorUnavailable: boolean) =>
    action({ navigatorUnavailable }),
);

export const setCurrentNavigatorUnavailable = createAction(
  SET_CURRENT_NAVIGATOR_UNAVAILABLE,
  (action) => (currentNavigatorUnavailable: boolean) =>
    action({ currentNavigatorUnavailable }),
);

export const onConversationCreatedReceive = createAction(
  ON_CONVERSATION_CREATED_RECEIVE,
  (action) =>
    (newConversationData: {
      conversation: Conversation;
      interventionConversation: InterventionConversation;
    }) =>
      action({ newConversationData }),
);

export const setGuestInterlocutorId = createAction(
  SET_GUEST_INTERLOCUTOR_ID,
  (action) => (guestInterlocutorId: string) => action({ guestInterlocutorId }),
);

export const setArchivingConversation = createAction(
  SET_ARCHIVING_CONVERSATION,
  (action) => (archivingConversation: boolean) =>
    action({ archivingConversation }),
);

export const onConversationArchivedReceive = createAction(
  ON_CONVERSATION_ARCHIVED_RECEIVE,
  (action) => (conversationId: string) => action({ conversationId }),
);

export const onLiveChatSetupFetchedReceive = createAction(
  ON_LIVE_CHAT_SETUP_FETCHED_RECEIVE,
  (action) => (liveChatSetup: LiveChatSetup) => action({ liveChatSetup }),
);

export const setFetchingLiveChatSetup = createAction(
  SET_FETCHING_LIVE_CHAT_SETUP,
  (action) => (fetchingLiveChatSetup: boolean) =>
    action({ fetchingLiveChatSetup }),
);

export const fetchNavigatorHelpingMaterialsRequest = createAction(
  FETCH_NAVIGATOR_HELPING_MATERIALS_REQUEST,
  (action) => (interventionId: string) => action({ interventionId }),
);

export const fetchNavigatorHelpingMaterialsSuccess = createAction(
  FETCH_NAVIGATOR_HELPING_MATERIALS_SUCCESS,
  (action) =>
    (interventionId: string, helpingMaterials: NavigatorHelpingMaterials) =>
      action({ interventionId, helpingMaterials }),
);

export const fetchNavigatorHelpingMaterialsError = createAction(
  FETCH_NAVIGATOR_HELPING_MATERIALS_ERROR,
  (action) => (interventionId: string, error: ApiError) =>
    action({ interventionId, error }),
);

export const generateConversationTranscriptRequest = createAction(
  GENERATE_CONVERSATION_TRANSCRIPT_REQUEST,
  (action) => (conversationId: string) => action({ conversationId }),
);

export const onCurrentScreenTitleChanged = createAction(
  ON_CURRENT_SCREEN_TITLE_CHANGED,
  (action) => (conversationId: string, currentScreenTitle: string) =>
    action({ conversationId, currentScreenTitle }),
);
