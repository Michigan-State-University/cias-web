import { actionBuilder } from 'utils/actionBuilder';

import {
  FETCH_REPORTS_REQUEST,
  FETCH_REPORTS_SUCCESS,
  FETCH_REPORTS_ERROR,
  FETCH_INTERVENTIONS_REQUEST,
  FETCH_INTERVENTIONS_SUCCESS,
  FETCH_INTERVENTIONS_ERROR,
  FETCH_LATEST_REPORT_REQUEST,
  FETCH_LATEST_REPORT_SUCCESS,
  FETCH_LATEST_REPORT_ERROR,
  TOGGLE_NOTIFICATIONS_REQUEST,
  TOGGLE_NOTIFICATIONS_SUCCESS,
  TOGGLE_NOTIFICATIONS_ERROR,
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

export const fetchInterventionsRequest = () =>
  actionBuilder(FETCH_INTERVENTIONS_REQUEST, {});
export const fetchInterventionsSuccess = (interventions) =>
  actionBuilder(FETCH_INTERVENTIONS_SUCCESS, { interventions });
export const fetchInterventionsError = (error) =>
  actionBuilder(FETCH_INTERVENTIONS_ERROR, { error });

export const fetchLatestReportRequest = () =>
  actionBuilder(FETCH_LATEST_REPORT_REQUEST, {});
export const fetchLatestReportSuccess = (report) =>
  actionBuilder(FETCH_LATEST_REPORT_SUCCESS, { report });
export const fetchLatestReportError = (error) =>
  actionBuilder(FETCH_LATEST_REPORT_ERROR, { error });

export const toggleNotificationsRequest = (id) =>
  actionBuilder(TOGGLE_NOTIFICATIONS_REQUEST, { id });
export const toggleNotificationsSuccess = () =>
  actionBuilder(TOGGLE_NOTIFICATIONS_SUCCESS, {});
export const toggleNotificationsError = (error) =>
  actionBuilder(TOGGLE_NOTIFICATIONS_ERROR, { error });
