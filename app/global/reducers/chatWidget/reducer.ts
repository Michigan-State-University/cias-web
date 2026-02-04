import produce from 'immer';
import { Reducer } from 'redux';
import { getType } from 'typesafe-actions';
import { setChatEnabled, setChatDisabled } from './actions';

import { ChatWidgetAction, ChatWidgetState } from './types';

export const initialState: ChatWidgetState = {
  interventionId: null,
};

export const chatWidgetReducerKey = 'chatWidget';

/* eslint-disable default-case, no-param-reassign, @typescript-eslint/default-param-last */
const ChatWidgetReducer: Reducer<ChatWidgetState, ChatWidgetAction> = (
  state = initialState,
  { payload, type }: ChatWidgetAction,
) =>
  produce(state, (draft) => {
    switch (type) {
      case getType(setChatEnabled):
        draft.interventionId = payload.interventionId;
        break;
      case getType(setChatDisabled):
        draft.interventionId = null;
        break;
    }
  });

export { ChatWidgetReducer };
