import { createSelector } from 'reselect';

import { initialState } from './reducer';

export const selectDashboardSectionsState = (state) =>
  state.dashboardSections || initialState;

export const makeSelectDashboardSections = () =>
  createSelector(
    selectDashboardSectionsState,
    (substate) => substate.dashboardSections,
  );

export const makeSelectSingleDashboardSection = () =>
  createSelector(
    selectDashboardSectionsState,
    (substate) => substate.singleDashboardSection,
  );

export const makeSelectSelectedChart = () =>
  createSelector(selectDashboardSectionsState, (substate) => {
    const dashboardSection = substate.dashboardSections.find(
      ({ id }) => id === substate.selectedChart?.dashboardSectionId,
    );

    return dashboardSection?.charts.find(
      ({ id }) => id === substate.selectedChart?.chartId,
    );
  });

export const makeSelectLoaders = () =>
  createSelector(selectDashboardSectionsState, (substate) => substate.loaders);

export const makeSelectErrors = () =>
  createSelector(selectDashboardSectionsState, (substate) => substate.errors);

export const makeSelectFilters = () =>
  createSelector(selectDashboardSectionsState, (substate) => substate.filters);
