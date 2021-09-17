import { createSelector } from 'reselect';

import { initialState, AnswersState } from './reducer';

export const selectAnswers = (rootState: {
  answers: AnswersState;
}): AnswersState => rootState.answers || initialState;

export const makeSelectAnswers = () =>
  createSelector(selectAnswers, ({ answers }) => answers);

export const makeSelectAnswersLoader = (name: string) =>
  createSelector(selectAnswers, ({ loaders }) => loaders[name]);

export const makeSelectAnswersError = (name: string) =>
  createSelector(selectAnswers, ({ errors }) => errors[name]);
