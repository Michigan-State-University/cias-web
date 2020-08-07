import { createSelector } from 'reselect';
import { initialState } from './reducer';

const problems = state => state.problems || initialState;

export const makeSelectProblemsState = () =>
  createSelector(
    problems,
    problemsState => problemsState,
  );

export const makeSelectProblems = () =>
  createSelector(
    problems,
    problemsState => problemsState.problems,
  );

export const makeSelectProblemsLoader = () =>
  createSelector(
    problems,
    problemsState => problemsState.fetchProblemLoading,
  );
