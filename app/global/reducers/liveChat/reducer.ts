import produce from 'immer';
import { getType } from 'typesafe-actions';

import {
  fetchChatMessageError,
  fetchChatMessagesRequest,
  fetchChatMessagesSuccess,
  onNewChatMessage,
} from './actions';
import { LiveChatAction, LiveChatState } from './types';

export const liveChatReducerKey = 'liveChat';

export const initialState: LiveChatState = {
  conversations: {},
};

/* eslint-disable default-case, no-param-reassign */
export const liveChatReducer = (
  state: LiveChatState = initialState,
  action: LiveChatAction,
) =>
  produce(state, (draft) => {
    switch (action.type) {
      case getType(fetchChatMessagesRequest):
        draft.conversations[action.payload.conversationId] = {
          loading: true,
          messages: [],
          hasError: false,
        };
        break;
      case getType(fetchChatMessagesSuccess): {
        const {
          payload: { conversationId, messages },
        } = action;
        draft.conversations[conversationId] = {
          loading: false,
          messages,
          hasError: false,
        };
        break;
      }
      case getType(fetchChatMessageError): {
        const {
          payload: { conversationId },
        } = action;
        draft.conversations[conversationId].hasError = true;
        break;
      }
      case getType(onNewChatMessage): {
        const {
          payload: { message },
        } = action;
        const { conversationId } = message;
        draft.conversations[conversationId].messages.push(message);
        break;
      }
    }
  });
