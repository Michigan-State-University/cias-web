/*
 *
 * auth reducer
 *
 */
import produce from 'immer';

import {
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_ERROR,
} from './constants';

export const initialState = {
  resetPasswordError: null,
  resetPasswordLoading: false,
};

/* eslint-disable default-case, no-param-reassign, default-param-last */
export const resetPasswordReducer = (state = initialState, { type, payload }) =>
  produce(state, (draft) => {
    switch (type) {
      case RESET_PASSWORD_REQUEST:
        draft.resetPasswordLoading = true;
        draft.resetPasswordError = null;
        break;
      case RESET_PASSWORD_SUCCESS:
        draft.resetPasswordLoading = false;
        draft.resetPasswordError = null;
        break;
      case RESET_PASSWORD_ERROR:
        draft.resetPasswordLoading = false;
        draft.resetPasswordError = payload.error;
        break;
    }
  });
