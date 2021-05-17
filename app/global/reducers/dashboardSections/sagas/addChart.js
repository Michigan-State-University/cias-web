import { put, takeLatest, call } from 'redux-saga/effects';
import axios from 'axios';

import { jsonApiToObject } from 'utils/jsonApiMapper';
import objectToSnakeCase from 'utils/objectToSnakeCase';

import { ADD_CHART_REQUEST } from '../constants';
import { addChartError, addChartSuccess } from '../actions';

export function* addChart({
  payload: { name, description, dashboardSectionId, chartType },
}) {
  const requestURL = `v1/charts`;

  try {
    const { data } = yield call(
      axios.post,
      requestURL,
      objectToSnakeCase({
        chart: {
          name: name ?? `New Chart`,
          description,
          dashboardSectionId,
          chartType,
        },
      }),
    );
    const chart = jsonApiToObject(data, 'chart');

    yield put(addChartSuccess(chart));
  } catch (error) {
    yield put(addChartError(error));
  }
}

export default function* addChartSaga() {
  yield takeLatest(ADD_CHART_REQUEST, addChart);
}
