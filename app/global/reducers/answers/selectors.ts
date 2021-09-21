import { createSelector } from 'reselect';

import { initialState } from './reducer';
import { AnswersState } from './types';

const selectAnswers = (rootState: { answers: AnswersState }): AnswersState =>
  rootState.answers || initialState;

export const makeSelectAnswers = () =>
  createSelector(selectAnswers, ({ answers }) => answers);

export const makeSelectAnswersLoader = (name: string) =>
  createSelector(selectAnswers, ({ loaders }) => loaders[name]);

export const makeSelectAnswersError = (name: string) =>
  createSelector(selectAnswers, ({ errors }) => errors[name]);
