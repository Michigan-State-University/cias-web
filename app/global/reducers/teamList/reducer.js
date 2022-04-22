/*
 *
 * TeamList reducer
 *
 */
import produce from 'immer';
import isEmpty from 'lodash/isEmpty';

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
  FETCH_SINGLE_TEAM_REQUEST,
  FETCH_SINGLE_TEAM_SUCCESS,
  FETCH_SINGLE_TEAM_FAILURE,
  EDIT_SINGLE_TEAM_REQUEST,
  EDIT_SINGLE_TEAM_SUCCESS,
  EDIT_SINGLE_TEAM_FAILURE,
  PER_PAGE,
} from './constants';

export const initialState = {
  teams: [],
  singleTeam: {},
  teamsSize: 0,
  shouldRefetch: false,
  cache: {
    teams: [],
    singleTeam: {},
  },
  loaders: {
    teamsLoading: true,
    singleTeamLoading: true,
    teamCreateLoading: false,
    singleTeamEditLoading: false,
  },
  errors: {
    teamsFetchError: null,
    singleTeamFetchError: null,
    teamCreateError: null,
  },
};

/* eslint-disable default-case, no-param-reassign */
const teamListReducer = (state = initialState, { type, payload }) =>
  produce(state, (draft) => {
    switch (type) {
      case FETCH_TEAMS_REQUEST:
        if (isEmpty(state.teams)) draft.loaders.teamsLoading = true;
        draft.errors.teamsFetchError = null;
        draft.shouldRefetch = false;
        break;

      case FETCH_TEAMS_SUCCESS:
        const { teams: teamsList, teamsSize } = payload;
        draft.teams = teamsList;
        draft.cache.teams = teamsList;
        draft.teamsSize = teamsSize;
        draft.loaders.teamsLoading = false;
        draft.errors.teamsFetchError = null;
        break;

      case FETCH_TEAMS_FAILURE:
        draft.errors.teamsFetchError = payload;
        draft.loaders.teamsLoading = false;
        draft.teams = state.cache.teams;
        break;

      case CREATE_TEAM_REQUEST:
        draft.errors.teamCreateError = null;
        draft.loaders.teamCreateLoading = true;
        break;

      case CREATE_TEAM_SUCCESS:
        draft.errors.teamCreateError = null;
        draft.loaders.teamCreateLoading = false;
        if (state.teamsSize < PER_PAGE) {
          draft.teams.push(payload.team);
          draft.cache.teams.push(payload.team);
        }
        draft.shouldRefetch = true;
        break;

      case CREATE_TEAM_FAILURE:
        draft.errors.teamCreateError = payload;
        draft.loaders.teamCreateLoading = false;
        draft.teams = state.cache.teams;
        break;

      case DELETE_TEAM_REQUEST: {
        const index = state.teams.findIndex(({ id }) => id === payload.id);

        if (index) draft.teams.splice(index, 1);
        break;
      }

      case DELETE_TEAM_SUCCESS:
        draft.cache.teams = state.teams;
        draft.shouldRefetch = true;
        break;

      case DELETE_TEAM_FAILURE:
        draft.teams = state.cache.teams;
        break;

      case FETCH_SINGLE_TEAM_REQUEST:
        draft.errors.singleTeamFetchError = null;
        draft.loaders.singleTeamLoading = true;
        break;

      case FETCH_SINGLE_TEAM_SUCCESS:
        draft.errors.singleTeamFetchError = null;
        draft.loaders.singleTeamLoading = false;
        draft.singleTeam = payload.team;
        draft.cache.singleTeam = payload.team;
        break;

      case FETCH_SINGLE_TEAM_FAILURE:
        draft.errors.singleTeamFetchError = payload;
        draft.loaders.singleTeamLoading = false;
        draft.singleTeam = state.cache.singleTeam;
        break;

      case EDIT_SINGLE_TEAM_REQUEST:
        draft.loaders.singleTeamEditLoading = true;
        break;

      case EDIT_SINGLE_TEAM_SUCCESS:
        draft.singleTeam = payload.team;
        draft.cache.singleTeam = payload.team;
        draft.loaders.singleTeamEditLoading = false;
        break;

      case EDIT_SINGLE_TEAM_FAILURE:
        draft.singleTeam = state.cache.singleTeam;
        draft.loaders.singleTeamEditLoading = false;
        break;
    }
  });

export default teamListReducer;
