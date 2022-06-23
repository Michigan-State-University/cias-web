import { createSelector } from 'reselect';

import { initialState } from './reducer';
import { NavigatorSetupState } from './types';

const selectNavigatorSetup = (rootState: {
  navigatorSetup: NavigatorSetupState;
}): NavigatorSetupState => rootState.navigatorSetup || initialState;

export const makeSelectNavigatorSetupData = () =>
  createSelector(selectNavigatorSetup, ({ navigatorData }) => navigatorData);

export const makeSelectNavigatorSetupLoader = (loaderName: string) =>
  createSelector(selectNavigatorSetup, ({ loaders }) => loaders[loaderName]);

export const makeSelectNavigatorSetupError = () =>
  createSelector(selectNavigatorSetup, ({ error }) => error);
