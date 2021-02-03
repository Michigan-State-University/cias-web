/*
 *
 * UserList reducer
 *
 */
import produce from 'immer';
import isEmpty from 'lodash/isEmpty';
import findIndex from 'lodash/findIndex';

import {
  CHANGE_ACTIVATE_STATUS_REQUEST,
  FETCH_USERS,
  FETCH_USERS_FAILURE,
  FETCH_USERS_SUCCESS,
  CHANGE_ACTIVATE_STATUS_FAILURE,
  CHANGE_ACTIVATE_STATUS_SUCCESS,
  ADD_USER_TO_LIST,
  FETCH_USERS_SELECTOR,
  FETCH_USERS_SELECTOR_SUCCESS,
  FETCH_USERS_SELECTOR_FAILURE,
} from './constants';

export const initialState = {
  users: [],
  usersSelector: [],
  usersSize: 0,
  cache: {
    users: [],
  },
  usersSelectorError: null,
  usersSelectorLoading: true,
  usersError: null,
  usersLoading: true,
};

/* eslint-disable default-case, no-param-reassign */
const userListReducer = (state = initialState, { type, payload }) =>
  produce(state, draft => {
    switch (type) {
      case FETCH_USERS:
        if (isEmpty(state.users)) draft.usersLoading = true;
        draft.usersError = null;
        break;
      case FETCH_USERS_SUCCESS: {
        const { users: usersList, usersSize } = payload;
        draft.users = usersList;
        draft.usersSize = usersSize;
        draft.usersLoading = false;
        break;
      }
      case FETCH_USERS_FAILURE:
        draft.usersError = payload;
        draft.usersLoading = false;
        break;

      case FETCH_USERS_SELECTOR:
        if (isEmpty(state.usersSelector)) draft.usersSelectorLoading = true;
        draft.usersSelectorError = null;
        break;
      case FETCH_USERS_SELECTOR_SUCCESS: {
        const { users: usersList } = payload;
        draft.usersSelector = usersList;
        draft.usersSelectorLoading = false;
        draft.usersSelectorError = null;
        break;
      }
      case FETCH_USERS_SELECTOR_FAILURE:
        draft.usersSelectorLoading = false;
        draft.usersSelectorError = payload;
        break;

      case CHANGE_ACTIVATE_STATUS_REQUEST:
        const { users } = state;
        draft.cache.users = users;
        const { id, active, showInactive } = payload;
        const index = findIndex(users, user => user.id === id);

        if (showInactive) draft.users[index].active = active;
        else draft.users.splice(index, 1);

        break;
      case CHANGE_ACTIVATE_STATUS_SUCCESS:
        draft.cache.users = [];
        break;
      case CHANGE_ACTIVATE_STATUS_FAILURE:
        draft.users = state.cache.users;
        draft.cache.users = [];
        break;

      case ADD_USER_TO_LIST:
        draft.users = [payload.user, ...state.users];
        break;
    }
  });

export default userListReducer;
