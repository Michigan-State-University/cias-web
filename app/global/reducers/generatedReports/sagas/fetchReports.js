import { put, takeLatest, call, select } from 'redux-saga/effects';
import axios from 'axios';

import { GeneratedReportBuilder } from 'models/GeneratedReport';

import { FETCH_REPORTS_REQUEST, REPORTS_PER_PAGE } from '../constants';
import { fetchReportsSuccess, fetchReportsError } from '../actions';
import { makeSelectCurrentFilterOption } from '../selectors';

export function* fetchReports({ payload: { page, sortOption, sessionId } }) {
  try {
    const filterOption = yield select(makeSelectCurrentFilterOption());
    let requestParams = {
      params: {
        per_page: REPORTS_PER_PAGE,
        page,
        report_for: filterOption,
        order: sortOption,
      },
    };
    const requestUrl = '/v1/generated_reports';
    if (sessionId)
      requestParams = {
        params: { ...requestParams.params, session_id: sessionId },
      };
    const {
      data: { data, reports_size: reportsSize },
    } = yield call(axios.get, requestUrl, requestParams);
    const mappedReports = data.map((report) =>
      new GeneratedReportBuilder().fromJson(report).build(),
    );
    yield put(fetchReportsSuccess(mappedReports, reportsSize));
  } catch (error) {
    yield put(fetchReportsError(error));
  }
}

export default function* fetchReportsSaga() {
  yield takeLatest(FETCH_REPORTS_REQUEST, fetchReports);
}
