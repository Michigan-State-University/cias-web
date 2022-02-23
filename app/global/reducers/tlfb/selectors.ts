import { createSelector } from 'reselect';

import { initialState } from './reducer';
import { TlfbState } from './types';

const selectTlfbState = (state: { tlfbReducer: TlfbState }) =>
  state.tlfbReducer || initialState;

export const makeSelectTlfbDays = () =>
  createSelector(selectTlfbState, ({ days }) => days);

export const makeSelectTlfbLoader = (loaderName: keyof TlfbState['loaders']) =>
  createSelector(selectTlfbState, ({ loaders }) => loaders[loaderName]);

export const makeSelectTlfbError = (errorName: keyof TlfbState['errors']) =>
  createSelector(selectTlfbState, ({ errors }) => errors[errorName]);
