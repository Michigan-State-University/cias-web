import { createSelector } from 'reselect';

import { initialState } from './reducer';

export const selectOrganizationsState = state =>
  state.organizations || initialState;

export const makeSelectOrganizations = () =>
  createSelector(
    selectOrganizationsState,
    substate => substate.organizations,
  );

export const makeSelectOrganizationsLoader = () =>
  createSelector(
    selectOrganizationsState,
    substate => substate.loaders.fetchOrganizations,
  );

export const makeSelectOrganizationsError = () =>
  createSelector(
    selectOrganizationsState,
    substate => substate.errors.fetchOrganizations,
  );

export const makeSelectNewOrganizationLoader = () =>
  createSelector(
    selectOrganizationsState,
    substate => substate.loaders.createOrganization,
  );
