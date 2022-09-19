import { createSelector } from 'reselect';

import { RootState } from 'global/reducers';

import { answersReducerKey, initialState } from './reducer';
import { AnswersState } from './types';

const selectAnswers = (rootState: RootState): AnswersState =>
  rootState[answersReducerKey] || initialState;

export const makeSelectAnswers = () =>
  createSelector(selectAnswers, ({ answers }) => answers);

export const makeSelectAnswersLoader = (name: string) =>
  createSelector(selectAnswers, ({ loaders }) => loaders[name]);

export const makeSelectAnswersError = (name: string) =>
  createSelector(selectAnswers, ({ errors }) => errors[name]);
