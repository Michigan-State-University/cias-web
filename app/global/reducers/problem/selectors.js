import { createSelector } from 'reselect';
import { initialState } from './reducer';

const problem = state => state.problem || initialState;

export const makeSelectProblemState = () =>
  createSelector(
    problem,
    substate => substate,
  );

export const makeSelectProblem = () =>
  createSelector(
    problem,
    substate => substate.problem,
  );

export const makeSelectProblemLoader = loader =>
  createSelector(
    problem,
    substate => substate.loaders[loader],
  );
