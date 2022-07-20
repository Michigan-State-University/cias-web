import { createSelector } from 'reselect';

import { initialState } from './reducer';
import { NavigatorSetupState } from './types';

const selectNavigatorSetup = (rootState: {
  navigatorSetup: NavigatorSetupState;
}): NavigatorSetupState => rootState.navigatorSetup || initialState;

export const makeSelectTabsData = () =>
  createSelector(selectNavigatorSetup, ({ modalTabsData }) => modalTabsData);

export const makeSelectNavigatorSetupLoader = (loaderName: string) =>
  createSelector(selectNavigatorSetup, ({ loaders }) => loaders[loaderName]);

export const makeSelectNavigatorSetupError = () =>
  createSelector(selectNavigatorSetup, ({ error }) => error);
