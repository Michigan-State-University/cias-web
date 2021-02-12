import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the teamList state domain
 */

const selectTeamListDomain = state => state.teamList || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by TeamList
 */

const makeSelectTeamList = () =>
  createSelector(
    selectTeamListDomain,
    substate => substate,
  );

const makeSelectTeamListLoaders = () =>
  createSelector(
    selectTeamListDomain,
    substate => substate.loaders,
  );

const makeSelectTeamListErrors = () =>
  createSelector(
    selectTeamListDomain,
    substate => substate.errors,
  );

const makeSelectTeamById = id =>
  createSelector(
    selectTeamListDomain,
    substate => substate.teams.find(({ id: teamId }) => teamId === id),
  );

const makeSelectSingleTeam = () =>
  createSelector(
    selectTeamListDomain,
    substate => substate.singleTeam,
  );

export default makeSelectTeamList;
export {
  selectTeamListDomain,
  makeSelectTeamListLoaders,
  makeSelectTeamListErrors,
  makeSelectTeamById,
  makeSelectSingleTeam,
};
