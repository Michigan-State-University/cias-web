import { createAction } from 'typesafe-actions';

import { LiveChatMessage } from 'models/LiveChatMessage';

import {
  FETCH_CHAT_MESSAGES_REQUEST,
  FETCH_CHAT_MESSAGES_SUCCESS,
  FETCH_CHAT_MESSAGES_ERROR,
  ON_NEW_CHAT_MESSAGE,
} from './constants';

export const fetchChatMessagesRequest = createAction(
  FETCH_CHAT_MESSAGES_REQUEST,
  (action) => (conversationId: string) => action({ conversationId }),
);

export const fetchChatMessagesSuccess = createAction(
  FETCH_CHAT_MESSAGES_SUCCESS,
  (action) => (conversationId: string, messages: LiveChatMessage[]) =>
    action({ messages, conversationId }),
);

export const fetchChatMessageError = createAction(
  FETCH_CHAT_MESSAGES_ERROR,
  (action) => (conversationId: string) => action({ conversationId }),
);

export const onNewChatMessage = createAction(
  ON_NEW_CHAT_MESSAGE,
  (action) => (message: LiveChatMessage) => action({ message }),
);
