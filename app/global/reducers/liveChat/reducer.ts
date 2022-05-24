import produce from 'immer';
import { getType } from 'typesafe-actions';

import {
  fetchChatMessageError,
  fetchChatMessagesRequest,
  fetchChatMessagesSuccess,
} from './actions';
import { LiveChatAction, LiveChatState } from './types';

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
        draft.conversations[conversationId] = {
          ...state.conversations[conversationId],
          hasError: true,
        };
        break;
      }
    }
  });
