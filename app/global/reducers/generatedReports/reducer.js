import produce from 'immer';

import {
  FETCH_REPORTS_ERROR,
  FETCH_REPORTS_REQUEST,
  FETCH_REPORTS_SUCCESS,
  SORT_BY_LATEST,
  PARTICIPANTS,
  THIRD_PARTY,
} from './constants';

export const initialState = {
  reports: null,
  reportsSize: 0,
  reportsPage: 1,
  reportsSortOption: SORT_BY_LATEST,
  reportsFilterOption: [PARTICIPANTS, THIRD_PARTY],
  latestReport: null,
  interventions: null,
  loaders: {
    fetchReportsLoading: true,
    fetchInterventionsLoading: true,
    fetchLatestReportLoading: true,
  },
  errors: {
    fetchReportsError: null,
    fetchInterventionsError: null,
    fetchLatestReportError: null,
  },
};

/* eslint-disable default-case, no-param-reassign */

const selectFilter = (currentState, filter) => {
  if (!filter) return currentState;
  if (currentState.includes(filter)) {
    return currentState.filter((value) => value !== filter);
  }
  return [...currentState, filter];
};

export const generatedReportsReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case FETCH_REPORTS_REQUEST:
        const { page, filterOption, sortOption } = action.payload;
        draft.reportsPage = page;
        draft.reportsSortOption = sortOption;
        draft.reportsFilterOption = selectFilter(
          state.reportsFilterOption,
          filterOption,
        );
        draft.loaders.fetchReportsLoading = true;
        draft.errors.fetchReportsError = null;
        break;
      case FETCH_REPORTS_SUCCESS:
        draft.loaders.fetchReportsLoading = false;
        draft.reports = action.payload.reports;
        draft.reportsSize = action.payload.reportsSize;
        break;
      case FETCH_REPORTS_ERROR:
        draft.loaders.fetchReportsLoading = false;
        draft.errors.fetchReportsError = action.payload.error;
        draft.reportsSize = 0;
        break;
    }
  });

export default generatedReportsReducer;
