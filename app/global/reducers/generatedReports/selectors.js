import { createSelector } from 'reselect';

import { generatedReportsReducerKey, initialState } from './reducer';

const selectGeneratedReports = (state) =>
  state[generatedReportsReducerKey] || initialState;

export const makeSelectReports = () =>
  createSelector(selectGeneratedReports, (substate) => substate.reports);

export const makeSelectReportsSize = () =>
  createSelector(selectGeneratedReports, (substate) => substate.reportsSize);

export const makeSelectLoader = (name) =>
  createSelector(selectGeneratedReports, (substate) => substate.loaders[name]);

export const makeSelectError = (name) =>
  createSelector(selectGeneratedReports, (substate) => substate.errors[name]);

export const makeSelectCurrentPage = () =>
  createSelector(selectGeneratedReports, (substate) => substate.reportsPage);

export const makeSelectCurrentFilterOption = () =>
  createSelector(
    selectGeneratedReports,
    (substate) => substate.reportsFilterOption,
  );

export const makeSelectCurrentSortOption = () =>
  createSelector(
    selectGeneratedReports,
    (substate) => substate.reportsSortOption,
  );
