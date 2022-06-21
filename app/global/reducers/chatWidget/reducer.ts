import produce from 'immer';
import { Reducer } from 'redux';
import { getType } from 'typesafe-actions';
import { setChatEnabled } from './actions';

import { ChatWidgetAction, ChatWidgetState } from './types';

export const initialState = {
  liveChatEnabled: false,
};

export const chatWidgetReducerKey = 'chatWidget';

/* eslint-disable default-case, no-param-reassign */
const ChatWidgetReducer: Reducer<ChatWidgetState, ChatWidgetAction> = (
  state = initialState,
  { payload, type }: ChatWidgetAction,
) =>
  produce(state, (draft) => {
    switch (type) {
      case getType(setChatEnabled):
        draft.liveChatEnabled = payload;
        break;
    }
  });

export { ChatWidgetReducer };
