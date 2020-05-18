/*
 *
 * auth reducer
 *
 */
import produce from 'immer';
import { SET_TOKEN } from './constants';

export const initialState = {
  token: '',
};

/* eslint-disable default-case, no-param-reassign */
export const authReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case SET_TOKEN:
        draft.token = action.payload.token;
        break;
    }
  });
