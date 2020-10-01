/*
 *
 * UserList actions
 *
 */

import { actionBuilder } from 'utils/actionBuilder';
import {
  FETCH_USERS,
  FETCH_USERS_FAILURE,
  FETCH_USERS_SUCCESS,
  CHANGE_ACTIVATE_STATUS_REQUEST,
  CHANGE_ACTIVATE_STATUS_FAILURE,
  CHANGE_ACTIVATE_STATUS_SUCCESS,
  ADD_USER_TO_LIST,
} from './constants';

export const fetchUsers = (roles, name, page, includeInactive) =>
  actionBuilder(FETCH_USERS, { roles, name, page, includeInactive });
export const fetchUsersSuccess = users =>
  actionBuilder(FETCH_USERS_SUCCESS, users);
export const fetchUsersFailure = error =>
  actionBuilder(FETCH_USERS_FAILURE, error);

export const changeActivateStatusRequest = (id, active, showInactive) =>
  actionBuilder(CHANGE_ACTIVATE_STATUS_REQUEST, { id, active, showInactive });
export const changeActivateStatusSuccess = () =>
  actionBuilder(CHANGE_ACTIVATE_STATUS_SUCCESS, {});
export const changeActivateStatusFailure = () =>
  actionBuilder(CHANGE_ACTIVATE_STATUS_FAILURE, {});

export const addUserToList = user => actionBuilder(ADD_USER_TO_LIST, { user });
