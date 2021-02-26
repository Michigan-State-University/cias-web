import cloneDeep from 'lodash/cloneDeep';

import { TeamBuilder } from 'models/Teams/TeamBuilder';
import {
  fetchSingleTeamFailure,
  fetchSingleTeamRequest,
  fetchSingleTeamSuccess,
  fetchTeamsFailure,
  fetchTeamsRequest,
  fetchTeamsSuccess,
} from 'global/reducers/teamList/actions';
import teamListReducer, { initialState } from '../reducer';

describe('teamList reducer', () => {
  const teams = [
    new TeamBuilder()
      .withId('ta-1')
      .withName('Team 1')
      .withTeamAdmin({ name: 'TA 1', email: 'ta-1@test.pl', id: 'id-ta-1' })
      .build(),
    new TeamBuilder()
      .withId('ta-2')
      .withName('Team 2')
      .withTeamAdmin({ name: 'TA 2', email: 'ta-2@test.pl', id: 'id-ta-2' })
      .build(),
    new TeamBuilder()
      .withId('ta-3')
      .withName('Team 3')
      .withTeamAdmin({ name: 'TA 3', email: 'ta-3@test.pl', id: 'id-ta-3' })
      .build(),
  ];

  const mockState = {
    ...initialState,
  };

  const mockStateWithTeams = {
    ...initialState,
    teams,
    teamsSize: teams.length,
    cache: { teams: [...teams], singleTeam: {} },
  };

  const mockStateWithSingleTeam = {
    ...initialState,
    singleTeam: teams[0],
    cache: { teams: [], singleTeam: teams[0] },
  };

  it('FETCH_TEAMS_REQUEST', () => {
    const action = fetchTeamsRequest('', 1);

    const expectedState = cloneDeep(mockState);
    expectedState.loaders.teamsLoading = true;
    expectedState.errors.teamsFetchError = null;

    expect(teamListReducer(mockState, action)).toEqual(expectedState);
  });

  it('FETCH_TEAMS_SUCCESS', () => {
    const payloadTeams = { teams, teamsSize: teams.length };

    const action = fetchTeamsSuccess(
      payloadTeams.teams,
      payloadTeams.teamsSize,
    );

    const expectedState = cloneDeep(mockStateWithTeams);
    expectedState.teams = payloadTeams.teams;
    expectedState.teamsSize = payloadTeams.teamsSize;
    expectedState.loaders.teamsLoading = false;

    expect(teamListReducer(mockState, action)).toEqual(expectedState);
  });

  it('FETCH_TEAMS_FAILURE', () => {
    const payloadError = 'test-error';

    const action = fetchTeamsFailure(payloadError);

    const expectedState = cloneDeep(mockState);
    expectedState.errors.teamsFetchError = payloadError;
    expectedState.loaders.teamsLoading = false;

    expect(teamListReducer(mockState, action)).toEqual(expectedState);
  });

  it('FETCH_SINGLE_TEAM_REQUEST', () => {
    const action = fetchSingleTeamRequest('id-ta-1');

    const expectedState = cloneDeep(mockState);
    expectedState.loaders.singleTeamLoading = true;
    expectedState.errors.singleTeamFetchError = null;

    expect(teamListReducer(mockState, action)).toEqual(expectedState);
  });

  it('FETCH_SINGLE_TEAM_SUCCESS', () => {
    const payloadTeam = { singleTeam: teams[0] };

    const action = fetchSingleTeamSuccess(payloadTeam.singleTeam);

    const expectedState = cloneDeep(mockStateWithSingleTeam);
    expectedState.singleTeam = payloadTeam.singleTeam;
    expectedState.loaders.singleTeamLoading = false;

    expect(teamListReducer(mockState, action)).toEqual(expectedState);
  });

  it('FETCH_SINGLE_TEAM_FAILURE', () => {
    const payloadError = 'test-error';

    const action = fetchSingleTeamFailure(payloadError);

    const expectedState = cloneDeep(mockState);
    expectedState.errors.singleTeamFetchError = payloadError;
    expectedState.loaders.singleTeamLoading = false;

    expect(teamListReducer(mockState, action)).toEqual(expectedState);
  });
});
