import { createSelector } from 'reselect';

import { initialState } from './reducer';

export const selectDashboardSectionsState = state =>
  state.dashboardSections || initialState;

const mapSections = dashboardSections =>
  dashboardSections.map(section => ({
    ...section,
    charts: [
      {
        id: '1',
        name: 'Chart 1',
        description: 'This is description of Chart 1',
        formula: {},
        type: 'PIE_CHART',
        dashboardSectionId: section.id,
      },
    ],
  }));

export const makeSelectDashboardSections = () =>
  createSelector(
    selectDashboardSectionsState,
    substate => mapSections(substate.dashboardSections),
  );

export const makeSelectSingleDashboardSection = () =>
  createSelector(
    selectDashboardSectionsState,
    substate => substate.singleDashboardSection,
  );

export const makeSelectSelectedChart = () =>
  createSelector(
    selectDashboardSectionsState,
    substate => {
      const dashboardSection = mapSections(substate.dashboardSections).find(
        ({ id }) => id === substate.selectedChart?.dashboardSectionId,
      );

      return dashboardSection?.charts.find(
        ({ id }) => id === substate.selectedChart?.chartId,
      );
    },
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
