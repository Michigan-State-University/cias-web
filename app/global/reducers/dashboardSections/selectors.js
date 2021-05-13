import { createSelector } from 'reselect';

import { initialState } from './reducer';

export const selectDashboardSectionsState = state =>
  state.dashboardSections || initialState;

export const makeSelectDashboardSections = () =>
  createSelector(
    selectDashboardSectionsState,
    substate => substate.dashboardSections,
  );

export const makeSelectSingleDashboardSection = () =>
  createSelector(
    selectDashboardSectionsState,
    substate => substate.singleDashboardSection,
  );

export const makeSelectLoaders = () =>
  createSelector(
    selectDashboardSectionsState,
    substate => substate.loaders,
  );

export const makeSelectErrors = () =>
  createSelector(
    selectDashboardSectionsState,
    substate => substate.errors,
  );
