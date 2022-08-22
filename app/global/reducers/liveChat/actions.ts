import { createAction } from 'typesafe-actions';

import {
  InterventionConversation,
  Conversation,
  Message,
} from 'models/LiveChat';
import { ApiError } from 'models/Api';

import { LiveChatSetup } from 'models/NavigatorSetup';
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
  SET_FETCHING_NAVIGATOR_SETUP,
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

export const setFetchingNavigatorSetup = createAction(
  SET_FETCHING_NAVIGATOR_SETUP,
  (action) => (fetchingNavigatorSetup: boolean) =>
    action({ fetchingNavigatorSetup }),
);
