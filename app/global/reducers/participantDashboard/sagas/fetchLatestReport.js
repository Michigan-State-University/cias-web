import { put, takeLatest, delay } from 'redux-saga/effects';

import { createReport } from 'utils/reducerCreators';

import { FETCH_LATEST_REPORT_REQUEST } from '../constants';
import { fetchLatestReportSuccess, fetchLatestReportError } from '../actions';

export const FETCH_DATA = createReport(1);

export function* fetchLatestReport() {
  try {
    yield delay(2000);
    yield put(fetchLatestReportSuccess(FETCH_DATA));
  } catch (error) {
    yield put(fetchLatestReportError(error));
  }
}

export default function* fetchLatestReportSaga() {
  yield takeLatest(FETCH_LATEST_REPORT_REQUEST, fetchLatestReport);
}
