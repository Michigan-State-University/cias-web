/*
 *
 * auth reducer
 *
 */
import produce from 'immer';

import {
  LOG_IN_USER,
  LOG_OUT,
  EDIT_USER_REQUEST,
  EDIT_USER_SUCCESS,
  EDIT_USER_ERROR,
} from './constants';

export const initialState = {
  isLoggedIn: false,
  user: null,
};

/* eslint-disable default-case, no-param-reassign */
export const authReducer = (state = initialState, { type, payload }) =>
  produce(state, draft => {
    switch (type) {
      case LOG_IN_USER:
        draft.isLoggedIn = true;
        draft.user = payload.user;
        break;
      case LOG_OUT:
        draft.isLoggedIn = false;
        draft.user = null;
        break;

      case EDIT_USER_REQUEST:
        break;
      case EDIT_USER_SUCCESS:
        draft.user = payload.user;
        break;
      case EDIT_USER_ERROR:
        break;
    }
  });
