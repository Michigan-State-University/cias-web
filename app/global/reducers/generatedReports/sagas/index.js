import { all } from 'redux-saga/effects';

import fetchReportsSaga from './fetchReports';
import markReportDownloadedSaga from './markReportDownloaded';

export default function* allGeneratedReportsSagas() {
  yield all([fetchReportsSaga(), markReportDownloadedSaga()]);
}

export const generatedReportsSagasKey = 'generatedReportsSagas';

export { allGeneratedReportsSagas, fetchReportsSaga };
