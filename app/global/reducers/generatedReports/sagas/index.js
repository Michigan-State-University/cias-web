import { all } from 'redux-saga/effects';
import fetchReportsSaga from './fetchReports';

export default function* allReportsSagas() {
  yield all([fetchReportsSaga()]);
}

export { fetchReportsSaga };
