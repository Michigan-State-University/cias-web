import { createSelector } from 'reselect';

import { initialState } from './reducer';

export const selectOrganizationsState = state =>
  state.organizations || initialState;

export const selectOrganizationState = createSelector(
  selectOrganizationsState,
  substate => substate.organization,
);

export const makeSelectOrganizations = organizationId =>
  createSelector(
    selectOrganizationsState,
    substate =>
      organizationId
        ? substate.organizations.find(({ id }) => id === organizationId)
        : substate.organizations,
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

export const makeSelectOrganization = () =>
  createSelector(
    selectOrganizationState,
    substate => substate.organization,
  );

export const makeSelectOrganizationLoaders = () =>
  createSelector(
    selectOrganizationState,
    substate => substate.loaders,
  );

export const makeSelectOrganizationErrors = () =>
  createSelector(
    selectOrganizationState,
    substate => substate.errors,
  );

export const makeSelectOrganizationShouldRefetch = () =>
  createSelector(
    selectOrganizationState,
    substate => substate.shouldRefetch,
  );

export const makeSelectOrganizationSelectedEntity = () =>
  createSelector(
    selectOrganizationState,
    substate => substate.selectedEntity,
  );

export const makeSelectHealthSystem = id =>
  createSelector(
    selectOrganizationState,
    substate =>
      substate.organization.healthSystems.find(
        ({ id: healthSystemId }) => id === healthSystemId,
      ),
  );

export const makeSelectOrganizationInterventions = () =>
  createSelector(
    selectOrganizationState,
    substate => substate.organization.interventions,
  );
