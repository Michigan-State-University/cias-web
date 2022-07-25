import produce from 'immer';
import { getType } from 'typesafe-actions';

import { updateItemById } from 'utils/reduxUtils';

import {
  fetchConversationMessagesError,
  fetchConversationMessagesRequest,
  fetchConversationMessagesSuccess,
  onMessageSentReceive,
  openConversation,
  onMessageReadReceive,
  closeConversation,
  fetchConversationsRequest,
  fetchConversationsSuccess,
  fetchConversationsError,
  onConversationCreatedReceive,
  markMessageReadLocally,
  setCreatingConversation,
  setGuestInterlocutorId,
  setArchivingConversation,
  onConversationArchivedReceive,
  setNavigatorUnavailable,
} from './actions';
import { LiveChatAction, LiveChatState } from './types';

export const liveChatReducerKey = 'liveChat';

export const initialState: LiveChatState = {
  interventionConversations: {},
  conversations: {},
  messages: {},
  openedConversationId: null,
  guestInterlocutorId: null,
  creatingConversation: false,
  archivingConversation: false,
  navigatorUnavailable: false,
  loaders: {
    conversations: false,
    messages: false,
  },
  errors: {
    conversations: null,
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
      case getType(fetchConversationsRequest): {
        draft.loaders.conversations = true;
        draft.errors.conversations = null;
        break;
      }
      case getType(fetchConversationsSuccess): {
        const { interventionConversations, conversations } = payload;
        draft.interventionConversations = interventionConversations;
        draft.conversations = conversations;
        draft.loaders.conversations = false;
        break;
      }
      case getType(fetchConversationsError): {
        const { error } = payload;
        draft.loaders.conversations = false;
        draft.errors.conversations = error;
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

        const conversation = draft.conversations[conversationId];
        if (conversation) {
          conversation.lastMessage = message;
        }
        break;
      }
      case getType(markMessageReadLocally): {
        const { conversationId, messageId } = payload;
        const { lastMessage } = draft.conversations[conversationId];

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

        const { lastMessage } = draft.conversations[conversationId] ?? {};
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
        if (state.interventionConversations[interventionId]) {
          draft.interventionConversations[interventionId].conversationIds.push(
            conversation.id,
          );
        } else {
          draft.interventionConversations[interventionId] =
            interventionConversation;
        }
        draft.conversations[conversation.id] = conversation;
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
        const conversation = draft.conversations[conversationId];
        if (conversation) {
          conversation.archived = true;
        }
      }
    }
  });
