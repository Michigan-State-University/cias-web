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
} from './constants';

export const fetchUsers = types => actionBuilder(FETCH_USERS, { types });
export const fetchUsersSuccess = users =>
  actionBuilder(FETCH_USERS_SUCCESS, users);
export const fetchUsersFailure = error =>
  actionBuilder(FETCH_USERS_FAILURE, error);
