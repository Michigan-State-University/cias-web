import { actionBuilder } from 'utils/actionBuilder';

import {
  FETCH_REPORTS_REQUEST,
  FETCH_REPORTS_SUCCESS,
  FETCH_REPORTS_ERROR,
} from './constants';

export const fetchReportsRequest = (
  page,
  filterOption,
  sortOption,
  sessionId,
) =>
  actionBuilder(FETCH_REPORTS_REQUEST, {
    page,
    filterOption,
    sortOption,
    sessionId,
  });
export const fetchReportsSuccess = (reports, reportsSize) =>
  actionBuilder(FETCH_REPORTS_SUCCESS, { reports, reportsSize });
export const fetchReportsError = (error) =>
  actionBuilder(FETCH_REPORTS_ERROR, { error });
