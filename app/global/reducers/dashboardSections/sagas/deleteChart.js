import { put, takeLatest, call } from 'redux-saga/effects';
import axios from 'axios';

import { DELETE_CHART_REQUEST } from '../constants';
import { deleteChartError, deleteChartSuccess } from '../actions';

export function* deleteChart({ payload: { chartId, dashboardSectionId } }) {
  const requestURL = `v1/charts/${chartId}`;

  try {
    yield call(axios.delete, requestURL);

    yield put(deleteChartSuccess(chartId, dashboardSectionId));
  } catch (error) {
    yield put(deleteChartError(error));
  }
}

export default function* deleteChartSaga() {
  yield takeLatest(DELETE_CHART_REQUEST, deleteChart);
}
