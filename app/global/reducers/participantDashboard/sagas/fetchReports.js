import { put, takeLatest, delay } from 'redux-saga/effects';
import slice from 'lodash/slice';

import { createReport } from 'utils/reducerCreators';

import { FETCH_REPORTS_REQUEST, PER_PAGE } from '../constants';
import { fetchReportsSuccess, fetchReportsError } from '../actions';

export const FETCH_DATA = [
  createReport(1),
  createReport(2),
  createReport(3),
  createReport(4),
  createReport(5),
  createReport(6),
  createReport(7),
  createReport(8),
  createReport(9),
  createReport(10),
  createReport(11),
];

export function* fetchReports({ payload: { page } }) {
  try {
    const startIndex = (page - 1) * PER_PAGE;
    yield delay(2000);
    yield put(
      fetchReportsSuccess(
        slice(FETCH_DATA, startIndex, startIndex + PER_PAGE),
        FETCH_DATA.length,
      ),
    );
  } catch (error) {
    yield put(fetchReportsError(error));
  }
}

export default function* fetchReportsSaga() {
  yield takeLatest(FETCH_REPORTS_REQUEST, fetchReports);
}
