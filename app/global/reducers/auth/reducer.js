/*
 *
 * auth reducer
 *
 */
import produce from 'immer';
import { SET_AUTH_DATA, SET_TOKEN } from './constants';

export const initialState = {
  isLoggedIn: false,
};

/* eslint-disable default-case, no-param-reassign */
export const authReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case SET_AUTH_DATA:
        draft.headers = { ...action.payload };
        draft.isLoggedIn = true;
        break;
      case SET_TOKEN:
        draft.headers.token = action.payload;
        break;
    }
  });
