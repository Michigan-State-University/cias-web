import { createSelector } from 'reselect';

import { initialState } from './reducer';
import { TlfbState } from './types';

const selectTlfbState = (state: { tlfbReducer: TlfbState }) =>
  state.tlfbReducer || initialState;

export const makeSelectTlfbDays = () =>
  createSelector(selectTlfbState, ({ days }) => days);

export const makeSelectTlfbLoaders = (loaderName: string) =>
  createSelector(selectTlfbState, ({ loaders }) => loaders[loaderName]);
