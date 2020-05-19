/*
 *
 * auth reducer
 *
 */
import produce from 'immer';
import { SET_TOKEN, REMOVE_TOKEN } from './constants';

export const initialState = {
  token: null,
  isLoggedIn: false,
};

/* eslint-disable default-case, no-param-reassign */
export const authReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case SET_TOKEN:
        draft.token = action.payload.token;
        draft.isLoggedIn = true;
        break;
      case REMOVE_TOKEN:
        draft.token = null;
        draft.isLoggedIn = false;
    }
  });
