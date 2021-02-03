/*
 *
 * TeamList actions
 *
 */

import { actionBuilder } from 'utils/actionBuilder';
import {
  FETCH_TEAMS_REQUEST,
  FETCH_TEAMS_SUCCESS,
  FETCH_TEAMS_FAILURE,
  CREATE_TEAM_REQUEST,
  CREATE_TEAM_SUCCESS,
  CREATE_TEAM_FAILURE,
  DELETE_TEAM_REQUEST,
  DELETE_TEAM_SUCCESS,
  DELETE_TEAM_FAILURE,
  FETCH_SINGLE_TEAM_FAILURE,
  FETCH_SINGLE_TEAM_SUCCESS,
  FETCH_SINGLE_TEAM_REQUEST,
  EDIT_SINGLE_TEAM_REQUEST,
  EDIT_SINGLE_TEAM_SUCCESS,
  EDIT_SINGLE_TEAM_FAILURE,
} from './constants';

export const fetchTeamsRequest = (name, page) =>
  actionBuilder(FETCH_TEAMS_REQUEST, { name, page });
export const fetchTeamsSuccess = (teams, teamsSize) =>
  actionBuilder(FETCH_TEAMS_SUCCESS, { teams, teamsSize });
export const fetchTeamsFailure = error =>
  actionBuilder(FETCH_TEAMS_FAILURE, error);

export const fetchSingleTeamRequest = id =>
  actionBuilder(FETCH_SINGLE_TEAM_REQUEST, { id });
export const fetchSingleTeamSuccess = team =>
  actionBuilder(FETCH_SINGLE_TEAM_SUCCESS, { team });
export const fetchSingleTeamFailure = error =>
  actionBuilder(FETCH_SINGLE_TEAM_FAILURE, error);

export const editSingleTeamRequest = (id, name, user) =>
  actionBuilder(EDIT_SINGLE_TEAM_REQUEST, { id, name, user });
export const editSingleTeamSuccess = team =>
  actionBuilder(EDIT_SINGLE_TEAM_SUCCESS, { team });
export const editSingleTeamFailure = error =>
  actionBuilder(EDIT_SINGLE_TEAM_FAILURE, error);

export const createTeamRequest = (name, userId) =>
  actionBuilder(CREATE_TEAM_REQUEST, { name, userId });
export const createTeamSuccess = team =>
  actionBuilder(CREATE_TEAM_SUCCESS, { team });
export const createTeamFailure = error =>
  actionBuilder(CREATE_TEAM_FAILURE, error);

export const deleteTeamRequest = id =>
  actionBuilder(DELETE_TEAM_REQUEST, { id });
export const deleteTeamSuccess = () => actionBuilder(DELETE_TEAM_SUCCESS, {});
export const deleteTeamFailure = () => actionBuilder(DELETE_TEAM_FAILURE, {});
