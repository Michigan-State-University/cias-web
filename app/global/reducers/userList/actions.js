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
} from './constants';

export const fetchUsers = (roles, name, page) =>
  actionBuilder(FETCH_USERS, { roles, name, page });
export const fetchUsersSuccess = users =>
  actionBuilder(FETCH_USERS_SUCCESS, users);
export const fetchUsersFailure = error =>
  actionBuilder(FETCH_USERS_FAILURE, error);

export const changeActivateStatusRequest = (id, deactivated) =>
  actionBuilder(CHANGE_ACTIVATE_STATUS_REQUEST, { id, deactivated });
export const changeActivateStatusSuccess = () =>
  actionBuilder(CHANGE_ACTIVATE_STATUS_SUCCESS, {});
export const changeActivateStatusFailure = () =>
  actionBuilder(CHANGE_ACTIVATE_STATUS_FAILURE, {});
