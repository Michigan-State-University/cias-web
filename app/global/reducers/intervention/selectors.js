import { createSelector } from 'reselect';
import { initialState } from './reducer';

export const selectProblem = state => state.problem || initialState;

export const makeSelectProblemState = () =>
  createSelector(
    selectProblem,
    substate => substate,
  );

export const makeSelectProblem = () =>
  createSelector(
    selectProblem,
    substate => substate.problem,
  );

export const makeSelectCacheProblem = () =>
  createSelector(
    selectProblem,
    substate => substate.cache.problem,
  );

export const makeSelectProblemStatus = () =>
  createSelector(
    selectProblem,
    substate => (substate.problem ? substate.problem.status : null),
  );

export const makeSelectProblemLoader = loader =>
  createSelector(
    selectProblem,
    substate => substate.loaders[loader],
  );

export const makeSelectCurrentSessionIndex = () =>
  createSelector(
    selectProblem,
    substate => substate.currentSessionIndex,
  );
