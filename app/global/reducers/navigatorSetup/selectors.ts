import { createSelector } from 'reselect';

import { RootState } from 'global/reducers';

import { initialState } from './reducer';
import { NavigatorSetupState } from './types';

const selectNavigatorSetup = ({
  navigatorSetup,
}: RootState): NavigatorSetupState => navigatorSetup || initialState;

export const makeSelectNavigatorSetupLoader = (
  loaderName: keyof NavigatorSetupState['loaders'],
) => createSelector(selectNavigatorSetup, ({ loaders }) => loaders[loaderName]);

export const makeSelectNavigatorSetupError = () =>
  createSelector(selectNavigatorSetup, ({ error }) => error);

export const makeSelectNavigatorSetup = () =>
  createSelector(selectNavigatorSetup, ({ navigatorSetup }) => navigatorSetup);

export const makeSelectPendingNavigatorInvitations = () =>
  createSelector(
    selectNavigatorSetup,
    ({ pendingNavigatorInvitations }) => pendingNavigatorInvitations,
  );

export const makeSelectInterventionNavigators = () =>
  createSelector(
    selectNavigatorSetup,
    ({ interventionNavigators }) => interventionNavigators,
  );

export const makeSelectParticipantLinks = () =>
  createSelector(makeSelectNavigatorSetup(), (navigatorSetup) => {
    if (!navigatorSetup) return null;
    return navigatorSetup.participantLinks;
  });

export const makeSelectNavigatorLinks = () =>
  createSelector(makeSelectNavigatorSetup(), (navigatorSetup) => {
    if (!navigatorSetup) return null;
    return navigatorSetup.navigatorLinks;
  });
