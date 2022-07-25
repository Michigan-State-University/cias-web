import { ReportFor } from 'global/reducers/reportTemplates';

export const FETCH_REPORTS_REQUEST = 'app/Dashboard/FETCH_REPORTS_REQUEST';
export const FETCH_REPORTS_SUCCESS = 'app/Dashboard/FETCH_REPORTS_SUCCESS';
export const FETCH_REPORTS_ERROR = 'app/Dashboard/FETCH_REPORTS_ERROR';

export const PARTICIPANTS = ReportFor.participant;
export const THIRD_PARTY = ReportFor.thirdParty;

export const filterOptions = [PARTICIPANTS, THIRD_PARTY];

export const SORT_BY_NEWEST = 'desc';
export const SORT_BY_LATEST = 'asc';

export const REPORTS_PER_PAGE = 7;

export const sortByOptions = [SORT_BY_NEWEST, SORT_BY_LATEST];
