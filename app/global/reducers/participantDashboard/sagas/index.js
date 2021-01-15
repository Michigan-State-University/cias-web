import { all } from 'redux-saga/effects';
import fetchReportsSaga from './fetchReports';
import fetchInterventionsSaga from './fetchInterventions';
import fetchLatestReportSaga from './fetchLatestReport';
import toggleNotificationsSaga from './toggleNotifications';

export default function* allReportsSagas() {
  yield all([
    fetchReportsSaga(),
    fetchInterventionsSaga(),
    fetchLatestReportSaga(),
    toggleNotificationsSaga(),
  ]);
}
