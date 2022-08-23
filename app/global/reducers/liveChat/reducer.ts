import produce from 'immer';
import { getType } from 'typesafe-actions';

import { updateItemById } from 'utils/reduxUtils';

import { WithReducer } from 'global/reducers/types';

import {
  fetchConversationMessagesError,
  fetchConversationMessagesRequest,
  fetchConversationMessagesSuccess,
  onMessageSentReceive,
  openConversation,
  onMessageReadReceive,
  closeConversation,
  fetchActiveConversationsRequest,
  fetchActiveConversationsSuccess,
  fetchActiveConversationsError,
  onConversationCreatedReceive,
  markMessageReadLocally,
  setCreatingConversation,
  setGuestInterlocutorId,
  setArchivingConversation,
  onConversationArchivedReceive,
  setNavigatorUnavailable,
  onLiveChatSetupFetchedReceive,
  setFetchingNavigatorSetup,
  fetchArchivedConversationsRequest,
  fetchArchivedConversationsSuccess,
  fetchArchivedConversationsError,
} from './actions';
import { LiveChatAction, LiveChatState } from './types';

export const liveChatReducerKey = 'liveChat';

export const initialState: LiveChatState = {
  activeInterventionConversations: {},
  activeConversations: {},
  archivedInterventionConversations: {},
  archivedConversations: {},
  messages: {},
  openedConversationId: null,
  guestInterlocutorId: null,
  creatingConversation: false,
  archivingConversation: false,
  navigatorUnavailable: false,
  liveChatSetup: null,
  loaders: {
    activeConversations: false,
    archivedConversations: false,
    messages: false,
    liveChatSetup: false,
  },
  errors: {
    activeConversations: null,
    archivedConversations: null,
    messages: null,
  },
};

/* eslint-disable default-case, no-param-reassign */
export const liveChatReducer = (
  state: LiveChatState = initialState,
  { type, payload }: LiveChatAction,
) =>
  produce(state, (draft) => {
    switch (type) {
      case getType(openConversation): {
        const { conversationId } = payload;
        draft.openedConversationId = conversationId;
        break;
      }
      case getType(closeConversation): {
        draft.openedConversationId = null;
        break;
      }
      case getType(fetchActiveConversationsRequest): {
        draft.loaders.activeConversations = true;
        draft.errors.activeConversations = null;
        break;
      }
      case getType(fetchActiveConversationsSuccess): {
        const { interventionConversations, conversations } = payload;
        draft.activeInterventionConversations = interventionConversations;
        draft.activeConversations = conversations;
        draft.loaders.activeConversations = false;
        break;
      }
      case getType(fetchActiveConversationsError): {
        const { error } = payload;
        draft.loaders.activeConversations = false;
        draft.errors.activeConversations = error;
        break;
      }
      case getType(fetchArchivedConversationsRequest): {
        draft.loaders.archivedConversations = true;
        draft.errors.archivedConversations = null;
        break;
      }
      case getType(fetchArchivedConversationsSuccess): {
        const { interventionConversations, conversations } = payload;
        draft.archivedInterventionConversations = interventionConversations;
        draft.archivedConversations = conversations;
        draft.loaders.archivedConversations = false;
        break;
      }
      case getType(fetchArchivedConversationsError): {
        const { error } = payload;
        draft.loaders.archivedConversations = false;
        draft.errors.archivedConversations = error;
        break;
      }
      case getType(fetchConversationMessagesRequest): {
        draft.loaders.messages = true;
        draft.errors.messages = null;
        break;
      }
      case getType(fetchConversationMessagesSuccess): {
        const { conversationId, messages } = payload;
        draft.messages[conversationId] = messages;
        draft.loaders.messages = false;
        break;
      }
      case getType(fetchConversationMessagesError): {
        const { error } = payload;
        draft.loaders.messages = false;
        draft.errors.messages = error;
        break;
      }
      case getType(onMessageSentReceive): {
        const { message } = payload;
        const { conversationId } = message;
        draft.messages[conversationId]?.push(message);

        const conversation = draft.activeConversations[conversationId];
        if (conversation) {
          conversation.lastMessage = message;
        }
        break;
      }
      case getType(markMessageReadLocally): {
        const { conversationId, messageId } = payload;
        const { lastMessage } = draft.activeConversations[conversationId];

        if (lastMessage?.id === messageId) {
          lastMessage.isRead = true;
        }

        const messages = draft.messages[conversationId];
        if (messages) {
          updateItemById(messages, messageId, {
            isRead: true,
          });
        }
        break;
      }
      case getType(onMessageReadReceive): {
        const { messageId, conversationId } = payload;

        const messages = draft.messages[conversationId];
        if (messages) {
          updateItemById(messages, messageId, {
            isRead: true,
          });
        }

        const { lastMessage } = draft.activeConversations[conversationId] ?? {};
        if (lastMessage && lastMessage.id === messageId) {
          lastMessage.isRead = true;
        }
        break;
      }
      case getType(setCreatingConversation): {
        draft.creatingConversation = payload.creatingConversation;
        break;
      }
      case getType(onConversationCreatedReceive): {
        const {
          newConversationData: { conversation, interventionConversation },
        } = payload;
        const { interventionId } = interventionConversation;
        if (state.activeInterventionConversations[interventionId]) {
          draft.activeInterventionConversations[
            interventionId
          ].conversationIds.push(conversation.id);
        } else {
          draft.activeInterventionConversations[interventionId] =
            interventionConversation;
        }
        draft.activeConversations[conversation.id] = conversation;
        draft.messages[conversation.id] = [conversation.lastMessage];
        break;
      }
      case getType(setGuestInterlocutorId): {
        draft.guestInterlocutorId = payload.guestInterlocutorId;
        break;
      }
      case getType(setArchivingConversation): {
        draft.archivingConversation = payload.archivingConversation;
        break;
      }
      case getType(setNavigatorUnavailable): {
        draft.navigatorUnavailable = payload.navigatorUnavailable;
        break;
      }
      case getType(onConversationArchivedReceive): {
        const { conversationId } = payload;
        const conversation = draft.activeConversations[conversationId];
        if (conversation) {
          conversation.archived = true;
        }
        break;
      }
      case getType(onLiveChatSetupFetchedReceive): {
        draft.loaders.liveChatSetup = false;
        draft.liveChatSetup = payload.liveChatSetup;
        break;
      }

      case getType(setFetchingNavigatorSetup): {
        draft.loaders.liveChatSetup = payload.fetchingNavigatorSetup;
        break;
      }
    }
  });

export const withLiveChatReducer: WithReducer = {
  key: liveChatReducerKey,
  // @ts-ignore
  reducer: liveChatReducer,
};
