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

export const makeSelectProblemLoader = loader =>
  createSelector(
    selectProblem,
    substate => substate.loaders[loader],
  );
