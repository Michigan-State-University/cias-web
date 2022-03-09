import { createSelector } from 'reselect';

import { RootState } from 'global/reducers';

import { initialState, tlfbReducerKey } from './reducer';
import { TlfbState } from './types';

const selectTlfbState = (rootState: RootState) =>
  rootState[tlfbReducerKey] || initialState;

export const makeSelectTlfbDays = () =>
  createSelector(selectTlfbState, ({ days }) => days);

export const makeSelectTlfbLoader = (loaderName: keyof TlfbState['loaders']) =>
  createSelector(selectTlfbState, ({ loaders }) => loaders[loaderName]);

export const makeSelectTlfbError = (errorName: keyof TlfbState['errors']) =>
  createSelector(selectTlfbState, ({ errors }) => errors[errorName]);

export const makeSelectAnswerSavedSuccessfully = () =>
  createSelector(
    selectTlfbState,
    ({ answerSavedSuccessfully }) => answerSavedSuccessfully,
  );
