import { put, takeLatest, call } from 'redux-saga/effects';
import axios from 'axios';

import { jsonApiToObject } from 'utils/jsonApiMapper';
import objectToSnakeCase from 'utils/objectToSnakeCase';

import { EDIT_CHART_REQUEST } from '../constants';
import { editChartError, editChartSuccess } from '../actions';

export function* editChart({ payload: { chart } }) {
  const requestURL = `v1/charts/${chart.id}`;

  try {
    const { data } = yield call(
      axios.patch,
      requestURL,
      objectToSnakeCase({
        chart,
      }),
    );
    const updatedChart = jsonApiToObject(data, 'chart');

    yield put(editChartSuccess(updatedChart));
  } catch (error) {
    yield put(editChartError(error));
  }
}

export default function* editChartSaga() {
  yield takeLatest(EDIT_CHART_REQUEST, editChart);
}
