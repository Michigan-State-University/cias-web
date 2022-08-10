import { actionBuilder } from 'utils/actionBuilder';

import {
  FETCH_REPORTS_REQUEST,
  FETCH_REPORTS_SUCCESS,
  FETCH_REPORTS_ERROR,
  MARK_REPORT_DOWNLOADED_REQUEST,
  MARK_REPORT_DOWNLOADED_SUCCESS,
  MARK_REPORT_DOWNLOADED_ERROR,
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

export const markReportDownloadedRequest = (reportId) =>
  actionBuilder(MARK_REPORT_DOWNLOADED_REQUEST, {
    reportId,
  });
export const markReportDownloadedSuccess = (reportId) =>
  actionBuilder(MARK_REPORT_DOWNLOADED_SUCCESS, { reportId });
export const markReportDownloadedError = (error) =>
  actionBuilder(MARK_REPORT_DOWNLOADED_ERROR, { error });
