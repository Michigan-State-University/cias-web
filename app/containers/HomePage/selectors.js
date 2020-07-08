import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectDashboardPageDomain = state => state.dashboardPage || initialState;

export const makeSelectDashboardPage = () =>
  createSelector(
    selectDashboardPageDomain,
    substate => substate,
  );

export const makeSelectInterventionCreatingLoader = () =>
  createSelector(
    selectDashboardPageDomain,
    substate => substate.loaders.interventionCreating,
  );
