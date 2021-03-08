import { put, takeLatest, call } from 'redux-saga/effects';
import axios from 'axios';

import { GeneratedReportBuilder } from 'models/GeneratedReport';

import { FETCH_REPORTS_REQUEST } from '../constants';
import { fetchReportsSuccess, fetchReportsError } from '../actions';

// eslint-disable-next-line no-unused-vars
export function* fetchReports({ payload: { page } }) {
  try {
    const requestUrl = '/v1/generated_reports';
    const {
      // eslint-disable-next-line no-unused-vars
      data: { data: reports },
    } = yield call(axios.get, requestUrl);
    const mappedReports = reports.map(report =>
      new GeneratedReportBuilder().fromJson(report).build(),
    );
    yield put(fetchReportsSuccess(mappedReports, reports.length));
  } catch (error) {
    yield put(fetchReportsError(error));
  }
}

export default function* fetchReportsSaga() {
  yield takeLatest(FETCH_REPORTS_REQUEST, fetchReports);
}
