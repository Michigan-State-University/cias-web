/*
 *
 * auth reducer
 *
 */
import produce from 'immer';

import {
  SET_NEW_PASSWORD_REQUEST,
  SET_NEW_PASSWORD_SUCCESS,
  SET_NEW_PASSWORD_ERROR,
} from './constants';

export const initialState = {
  setNewPasswordError: null,
  setNewPasswordLoading: false,
};

/* eslint-disable default-case, no-param-reassign */
export const setNewPasswordReducer = (
  state = initialState,
  { type, payload },
) =>
  produce(state, draft => {
    switch (type) {
      case SET_NEW_PASSWORD_REQUEST:
        draft.setNewPasswordLoading = true;
        draft.setNewPasswordError = null;
        break;
      case SET_NEW_PASSWORD_SUCCESS:
        draft.setNewPasswordLoading = false;
        draft.setNewPasswordError = null;
        break;
      case SET_NEW_PASSWORD_ERROR:
        draft.setNewPasswordLoading = false;
        draft.setNewPasswordError = payload.error;
        break;
    }
  });
