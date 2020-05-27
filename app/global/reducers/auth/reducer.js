/*
 *
 * auth reducer
 *
 */
import produce from 'immer';
import { SET_IS_LOGGED_IN } from './constants';

export const initialState = {
  isLoggedIn: false,
};

/* eslint-disable default-case, no-param-reassign */
export const authReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case SET_IS_LOGGED_IN:
        draft.isLoggedIn = action.payload.isLoggedIn;
        break;
    }
  });
