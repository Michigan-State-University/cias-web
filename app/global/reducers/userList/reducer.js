/*
 *
 * UserList reducer
 *
 */
import produce from 'immer';
import isEmpty from 'lodash/isEmpty';
import findIndex from 'lodash/findIndex';

import {
  EDIT_SINGLE_TEAM_SUCCESS,
  INVITE_TO_TEAM_SUCCESS,
} from 'global/reducers/teamList/constants';

import { updateItemById } from 'utils/reduxUtils';
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
  DELETE_USER_FROM_TEAM_REQUEST,
  DELETE_USER_FROM_TEAM_SUCCESS,
  DELETE_USER_FROM_TEAM_FAILURE,
  FETCH_RESEARCHERS_REQUEST,
  FETCH_RESEARCHERS_SUCCESS,
  FETCH_RESEARCHERS_FAILURE,
  MAKE_RESEARCHER_LOADING,
  MAKE_RESEARCHER_NOT_LOADING,
} from './constants';

export const initialState = {
  users: [],
  usersSelector: [],
  researchersSelector: [],
  usersSize: 0,
  shouldRefetch: false,
  cache: {
    users: [],
    researchersSelector: [],
  },
  usersSelectorError: null,
  researchersSelectorError: null,
  usersSelectorLoading: true,
  researchersSelectorLoading: true,
  usersError: null,
  usersLoading: true,
};

/* eslint-disable default-case, no-param-reassign */
const userListReducer = (state = initialState, { type, payload }) =>
  produce(state, (draft) => {
    switch (type) {
      case FETCH_USERS:
        if (isEmpty(state.users)) draft.usersLoading = true;
        draft.usersError = null;
        draft.shouldRefetch = false;
        break;
      case FETCH_USERS_SUCCESS: {
        const { users: usersList, usersSize } = payload;
        draft.users = usersList;
        draft.cache.users = usersList;
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

      case CHANGE_ACTIVATE_STATUS_REQUEST: {
        const { users } = state;
        const { id, active, showInactive } = payload;
        const index = findIndex(users, (user) => user.id === id);

        if (showInactive) draft.users[index].active = active;
        else draft.users.splice(index, 1);

        break;
      }
      case CHANGE_ACTIVATE_STATUS_SUCCESS:
        draft.cache.users = state.users;
        break;
      case CHANGE_ACTIVATE_STATUS_FAILURE:
        draft.users = state.cache.users;
        break;

      case ADD_USER_TO_LIST:
        draft.users = [payload.user, ...state.users];
        break;

      case DELETE_USER_FROM_TEAM_REQUEST: {
        const index = state.users.findIndex(
          ({ id, teamId }) =>
            id === payload.userId && teamId === payload.teamId,
        );

        if (index !== -1) draft.users.splice(index, 1);

        break;
      }

      case DELETE_USER_FROM_TEAM_SUCCESS:
        draft.cache.users = state.users;
        draft.shouldRefetch = true;
        break;

      case DELETE_USER_FROM_TEAM_FAILURE:
        draft.users = state.cache.users;
        break;

      case INVITE_TO_TEAM_SUCCESS:
        draft.shouldRefetch = true;
        break;

      case EDIT_SINGLE_TEAM_SUCCESS:
        draft.shouldRefetch = true;
        break;

      case FETCH_RESEARCHERS_REQUEST:
        draft.researchersSelectorLoading = true;
        draft.researchersSelectorError = null;
        break;
      case FETCH_RESEARCHERS_SUCCESS: {
        const { users: usersList } = payload;
        draft.researchersSelector = usersList;
        draft.cache.researchersSelector = usersList;
        draft.researchersSelectorLoading = false;
        draft.researchersSelectorError = null;
        break;
      }
      case FETCH_RESEARCHERS_FAILURE:
        draft.researchersSelectorLoading = false;
        draft.researchersSelectorError = payload;
        draft.researchersSelector = state.cache.researchersSelector;
        break;

      case MAKE_RESEARCHER_LOADING: {
        const { id } = payload;
        if (id) {
          updateItemById(draft.researchersSelector, id, { loading: true });
        }
        break;
      }
      case MAKE_RESEARCHER_NOT_LOADING: {
        const { id } = payload;
        if (id) {
          updateItemById(draft.researchersSelector, id, { loading: false });
        }
        break;
      }
    }
  });

export default userListReducer;
