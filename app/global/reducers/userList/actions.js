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
  PER_PAGE,
  FETCH_USERS_SELECTOR,
  FETCH_USERS_SELECTOR_SUCCESS,
  FETCH_USERS_SELECTOR_FAILURE,
  DELETE_USER_FROM_TEAM_FAILURE,
  DELETE_USER_FROM_TEAM_REQUEST,
  DELETE_USER_FROM_TEAM_SUCCESS,
  FETCH_RESEARCHERS_REQUEST,
  FETCH_RESEARCHERS_SUCCESS,
  FETCH_RESEARCHERS_FAILURE,
} from './constants';

export const fetchUsers = (roles, name, page, includeInactive, teamId) =>
  actionBuilder(FETCH_USERS, {
    roles,
    name,
    page,
    includeInactive,
    teamId,
    perPage: PER_PAGE,
  });
export const fetchUsersSuccess = (users, usersSize) =>
  actionBuilder(FETCH_USERS_SUCCESS, { users, usersSize });
export const fetchUsersFailure = (error) =>
  actionBuilder(FETCH_USERS_FAILURE, error);

export const fetchResearchersRequest = (extraParams) =>
  actionBuilder(FETCH_RESEARCHERS_REQUEST, { extraParams });
export const fetchResearchersSuccess = (users, usersSize) =>
  actionBuilder(FETCH_RESEARCHERS_SUCCESS, { users, usersSize });
export const fetchResearchersError = (error) =>
  actionBuilder(FETCH_RESEARCHERS_FAILURE, error);

export const fetchUsersSelector = (
  roles,
  name,
  page,
  includeInactive,
  teamId,
) =>
  actionBuilder(FETCH_USERS_SELECTOR, {
    roles,
    name,
    page,
    includeInactive,
    teamId,
    perPage: 999999,
  });
export const fetchUsersSelectorSuccess = (users, usersSize) =>
  actionBuilder(FETCH_USERS_SELECTOR_SUCCESS, { users, usersSize });
export const fetchUsersSelectorFailure = (error) =>
  actionBuilder(FETCH_USERS_SELECTOR_FAILURE, error);

export const changeActivateStatusRequest = (id, active, showInactive) =>
  actionBuilder(CHANGE_ACTIVATE_STATUS_REQUEST, { id, active, showInactive });
export const changeActivateStatusSuccess = () =>
  actionBuilder(CHANGE_ACTIVATE_STATUS_SUCCESS, {});
export const changeActivateStatusFailure = () =>
  actionBuilder(CHANGE_ACTIVATE_STATUS_FAILURE, {});

export const addUserToList = (user) =>
  actionBuilder(ADD_USER_TO_LIST, { user });

export const deleteUserFromTeamRequest = (userId, teamId) =>
  actionBuilder(DELETE_USER_FROM_TEAM_REQUEST, { userId, teamId });
export const deleteUserFromTeamSuccess = () =>
  actionBuilder(DELETE_USER_FROM_TEAM_SUCCESS, {});
export const deleteUserFromTeamFailure = (error) =>
  actionBuilder(DELETE_USER_FROM_TEAM_FAILURE, error);
