import iterateRecursively from 'utils/iterateRecursively';
import { createSelector } from 'reselect';
import { initialState } from './reducer';

const dashboard = (state) => state.generatedReports || initialState;

export const makeSelectDashboardState = () =>
  createSelector(dashboard, (substate) => substate);

export const makeSelectReports = () =>
  createSelector(dashboard, (substate) => substate.reports);

export const makeSelectReportsSize = () =>
  createSelector(dashboard, (substate) => substate.reportsSize);

export const makeSelectLatestReport = () =>
  createSelector(dashboard, (substate) => substate.latestReport);

export const makeSelectPendingSessions = () =>
  createSelector(dashboard, (substate) =>
    iterateRecursively(substate.interventions, 'sessions').filter(
      ({ available }) => available,
    ),
  );

export const makeSelectInterventions = () =>
  createSelector(dashboard, (substate) => substate.interventions);

export const makeSelectLoader = (name) =>
  createSelector(dashboard, (substate) => substate.loaders[name]);

export const makeSelectError = (name) =>
  createSelector(dashboard, (substate) => substate.errors[name]);

export const makeSelectCurrentPage = () =>
  createSelector(dashboard, (substate) => substate.reportsPage);

export const makeSelectCurrentFilterOption = () =>
  createSelector(dashboard, (substate) => substate.reportsFilterOption);

export const makeSelectCurrentSortOption = () =>
  createSelector(dashboard, (substate) => substate.reportsSortOption);
