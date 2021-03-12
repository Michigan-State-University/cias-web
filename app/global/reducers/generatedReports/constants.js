import { ReportFor } from 'global/reducers/reportTemplates';

export const FETCH_REPORTS_REQUEST = 'app/Dashboard/FETCH_REPORTS_REQUEST';
export const FETCH_REPORTS_SUCCESS = 'app/Dashboard/FETCH_REPORTS_SUCCESS';
export const FETCH_REPORTS_ERROR = 'app/Dashboard/FETCH_REPORTS_ERROR';

export const FETCH_INTERVENTIONS_REQUEST =
  'app/GeneratedReports/FETCH_INTERVENTIONS_REQUEST';
export const FETCH_INTERVENTIONS_SUCCESS =
  'app/GeneratedReports/FETCH_INTERVENTIONS_SUCCESS';
export const FETCH_INTERVENTIONS_ERROR =
  'app/GeneratedReports/FETCH_INTERVENTIONS_ERROR';

export const FETCH_LATEST_REPORT_REQUEST =
  'app/GeneratedReports/FETCH_LATEST_REPORT_REQUEST';
export const FETCH_LATEST_REPORT_SUCCESS =
  'app/GeneratedReports/FETCH_LATEST_REPORT_SUCCESS';
export const FETCH_LATEST_REPORT_ERROR =
  'app/GeneratedReports/FETCH_LATEST_REPORT_ERROR';

export const TOGGLE_NOTIFICATIONS_REQUEST =
  'app/GeneratedReports/TOGGLE_NOTIFICATIONS_REQUEST';
export const TOGGLE_NOTIFICATIONS_SUCCESS =
  'app/GeneratedReports/TOGGLE_NOTIFICATIONS_SUCCESS';
export const TOGGLE_NOTIFICATIONS_ERROR =
  'app/GeneratedReports/TOGGLE_NOTIFICATIONS_ERROR';

export const RESET_STATE = 'app/GeneratedReports/RESET_STATE';

export const PARTICIPANTS = ReportFor.participant;
export const THIRD_PARTY = ReportFor.thirdParty;

export const filterOptions = [PARTICIPANTS, THIRD_PARTY];

export const SORT_BY_NEWEST = 'desc';
export const SORT_BY_LATEST = 'asc';

export const REPORTS_PER_PAGE = 7;

export const sortByOptions = [SORT_BY_NEWEST, SORT_BY_LATEST];
