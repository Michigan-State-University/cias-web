import produce from 'immer';

import { updateItemById } from 'utils/reduxUtils';

import {
  FETCH_REPORTS_ERROR,
  FETCH_REPORTS_REQUEST,
  FETCH_REPORTS_SUCCESS,
  SORT_BY_LATEST,
  PARTICIPANTS,
  THIRD_PARTY,
  MARK_REPORT_DOWNLOADED_SUCCESS,
  MARK_REPORT_DOWNLOADED_ERROR,
  MARK_REPORT_DOWNLOADED_REQUEST,
  HENRY_FORD_HEALTH,
} from './constants';

export const initialState = {
  reports: null,
  reportsSize: 0,
  reportsPage: 1,
  reportsSortOption: SORT_BY_LATEST,
  reportsFilterOption: [PARTICIPANTS, THIRD_PARTY, HENRY_FORD_HEALTH],
  loaders: {
    fetchReportsLoading: true,
    markReportDownloadedLoading: false,
  },
  errors: {
    fetchReportsError: null,
    markReportDownloadedError: null,
  },
};

export const generatedReportsReducerKey = 'generatedReports';

/* eslint-disable default-case, no-param-reassign, default-param-last */

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
      case MARK_REPORT_DOWNLOADED_REQUEST:
        draft.errors.markReportDownloadedError = null;
        draft.loaders.markReportDownloadedLoading = true;
        break;
      case MARK_REPORT_DOWNLOADED_SUCCESS:
        const { reportId } = action.payload;
        if (draft.reports) {
          updateItemById(draft.reports, reportId, { downloaded: true });
          // There is a bug - immer doesn't recognize change in nested state although it should:
          // https://immerjs.github.io/immer/update-patterns/#nested-data-structures
          draft.reports = [...draft.reports];
        }
        draft.loaders.markReportDownloadedLoading = false;
        break;
      case MARK_REPORT_DOWNLOADED_ERROR:
        const { error } = action.payload;
        draft.errors.markReportDownloadedError = error;
        draft.loaders.markReportDownloadedLoading = false;
        break;
    }
  });

export default generatedReportsReducer;
