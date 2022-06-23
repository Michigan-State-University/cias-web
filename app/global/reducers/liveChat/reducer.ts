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
  readMessage,
} from './actions';
import { LiveChatAction, LiveChatState } from './types';

export const liveChatReducerKey = 'liveChat';

export const initialState: LiveChatState = {
  conversations: {},
  messages: {},
  openedConversationId: null,
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
      case getType(readMessage): {
        const { conversationId, messageId } = payload;
        const { lastMessage } = draft.conversations[conversationId];
        if (lastMessage?.id === messageId) {
          lastMessage.isRead = true;
        }
        updateItemById(draft.messages[conversationId], messageId, {
          isRead: true,
        });
        break;
      }
      case getType(fetchConversationsRequest): {
        draft.loaders.conversations = true;
        draft.errors.conversations = null;
        break;
      }
      case getType(fetchConversationsSuccess): {
        const { conversations } = payload;
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
        draft.messages[conversationId].push(message);
        draft.conversations[conversationId].lastMessage = message;
        break;
      }
      case getType(onMessageReadReceive): {
        const {
          messageReadDTO: { messageId, conversationId },
        } = payload;

        updateItemById(draft.messages[conversationId], messageId, {
          isRead: true,
        });

        const { lastMessage } = draft.conversations[conversationId];
        if (lastMessage && lastMessage.id === messageId) {
          lastMessage.isRead = true;
        }
        break;
      }
      case getType(onConversationCreatedReceive): {
        const { conversation } = payload;
        draft.conversations[conversation.id] = conversation;
        draft.messages[conversation.id] = [];
        break;
      }
    }
  });
