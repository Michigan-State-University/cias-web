/*
 *
 * UserList reducer
 *
 */
import produce from 'immer';

import {
  FETCH_USER_REQUEST,
  FETCH_USER_FAILURE,
  FETCH_USER_SUCCESS,
  EDIT_OTHER_USER_ERROR,
  EDIT_OTHER_USER_REQUEST,
  EDIT_OTHER_USER_SUCCESS,
  ADD_OTHER_USER_AVATAR_ERROR,
  ADD_OTHER_USER_AVATAR_REQUEST,
  ADD_OTHER_USER_AVATAR_SUCCESS,
  DELETE_OTHER_USER_AVATAR_ERROR,
  DELETE_OTHER_USER_AVATAR_REQUEST,
  DELETE_OTHER_USER_AVATAR_SUCCESS,
  CHANGE_ACTIVATE_STATUS_REQUEST,
  CHANGE_ACTIVATE_STATUS_ERROR,
  CHANGE_ACTIVATE_STATUS_SUCCESS,
} from './constants';

export const initialState = {
  user: null,
  userError: null,
  userLoading: true,
  cache: {
    user: null,
  },
};

/* eslint-disable default-case, no-param-reassign */
const userReducer = (state = initialState, { type, payload }) =>
  produce(state, draft => {
    switch (type) {
      case FETCH_USER_REQUEST:
        draft.userLoading = true;
        draft.userError = null;
        draft.user = null;
        break;
      case FETCH_USER_SUCCESS:
        draft.user = payload;
        draft.userLoading = false;
        break;
      case FETCH_USER_FAILURE:
        draft.userError = payload;
        draft.userLoading = false;
        break;
      case EDIT_OTHER_USER_REQUEST:
        draft.cache.user = state.user;
        break;
      case EDIT_OTHER_USER_SUCCESS:
        draft.user = payload.user;
        draft.cache.user = null;
        break;
      case EDIT_OTHER_USER_ERROR:
        draft.user = draft.cache.user;
        draft.cache.user = null;
        break;
      case ADD_OTHER_USER_AVATAR_REQUEST:
        draft.user.avatar = payload.imageUrl;
        draft.cache.user = state.user;
        break;
      case ADD_OTHER_USER_AVATAR_SUCCESS:
        draft.user = payload.user;
        draft.cache.user = null;
        break;
      case ADD_OTHER_USER_AVATAR_ERROR:
        draft.user = draft.cache.user;
        draft.cache.user = null;
        break;
      case DELETE_OTHER_USER_AVATAR_REQUEST:
        draft.user.avatar = null;
        draft.cache.user = state.user;
        break;
      case DELETE_OTHER_USER_AVATAR_SUCCESS:
        draft.user = payload.user;
        draft.cache.user = null;
        break;
      case DELETE_OTHER_USER_AVATAR_ERROR:
        draft.user = draft.cache.user;
        draft.cache.user = null;
        break;
      case CHANGE_ACTIVATE_STATUS_REQUEST:
        draft.user.deactivated = payload.deactivated;
        draft.cache.user = state.user;
        break;
      case CHANGE_ACTIVATE_STATUS_SUCCESS:
        draft.cache.user = null;
        break;
      case CHANGE_ACTIVATE_STATUS_ERROR:
        draft.user = draft.cache.user;
        draft.cache.user = null;
        break;
    }
  });

export default userReducer;
