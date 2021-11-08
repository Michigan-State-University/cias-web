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
  cache: {
    user: null,
  },
  loaders: {
    user: true,
  },
  errors: {
    user: null,
  },
};

/* eslint-disable default-case, no-param-reassign */
const userReducer = (state = initialState, { type, payload }) =>
  produce(state, draft => {
    switch (type) {
      case FETCH_USER_REQUEST:
        draft.loaders.user = true;
        draft.errors.user = null;
        draft.user = null;
        break;
      case FETCH_USER_SUCCESS:
        draft.user = payload;
        draft.loaders.user = false;
        break;
      case FETCH_USER_FAILURE:
        draft.errors.user = payload;
        draft.loaders.user = false;
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
        draft.user.active = payload.active;
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
