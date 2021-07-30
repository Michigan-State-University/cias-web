import produce from 'immer';

import {
  FETCH_REPORTS_ERROR,
  FETCH_REPORTS_REQUEST,
  FETCH_REPORTS_SUCCESS,
  FETCH_INTERVENTIONS_REQUEST,
  FETCH_INTERVENTIONS_SUCCESS,
  FETCH_INTERVENTIONS_ERROR,
  FETCH_LATEST_REPORT_REQUEST,
  FETCH_LATEST_REPORT_SUCCESS,
  FETCH_LATEST_REPORT_ERROR,
  TOGGLE_NOTIFICATIONS_REQUEST,
  TOGGLE_NOTIFICATIONS_SUCCESS,
  TOGGLE_NOTIFICATIONS_ERROR,
  SORT_BY_LATEST,
  PARTICIPANTS,
  THIRD_PARTY,
  RESET_STATE,
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

      case FETCH_INTERVENTIONS_REQUEST:
        if (!draft.interventions)
          draft.loaders.fetchInterventionsLoading = true;
        draft.errors.fetchInterventionsError = null;
        break;
      case FETCH_INTERVENTIONS_SUCCESS:
        draft.loaders.fetchInterventionsLoading = false;
        draft.interventions = action.payload.interventions;
        break;
      case FETCH_INTERVENTIONS_ERROR:
        draft.loaders.fetchInterventionsLoading = false;
        draft.errors.fetchInterventionsError = action.payload.error;
        break;

      case FETCH_LATEST_REPORT_REQUEST:
        if (!draft.latestReport) draft.loaders.fetchLatestReportLoading = true;
        draft.errors.fetchLatestReportError = null;
        break;
      case FETCH_LATEST_REPORT_SUCCESS:
        draft.loaders.fetchLatestReportLoading = false;
        draft.latestReport = action.payload.report;
        break;
      case FETCH_LATEST_REPORT_ERROR:
        draft.loaders.fetchLatestReportLoading = false;
        draft.errors.fetchLatestReportError = action.payload.error;
        break;

      case TOGGLE_NOTIFICATIONS_REQUEST:
        const index = state.interventions.findIndex(
          ({ id }) => id === action.payload.id,
        );

        draft.interventions[index].emailNotifications =
          !state.interventions[index].emailNotifications;

        draft.errors.fetchInterventionsError = null;
        break;
      case TOGGLE_NOTIFICATIONS_SUCCESS:
        break;
      case TOGGLE_NOTIFICATIONS_ERROR:
        draft.errors.fetchInterventionsError = action.payload.error;
        break;
      case RESET_STATE:
        draft.reports = null;
        draft.reportsSize = 0;
        break;
    }
  });

export default generatedReportsReducer;
