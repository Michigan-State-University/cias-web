import { put, call } from 'redux-saga/effects';
import axios from 'axios';

import { jsonApiToObject } from 'utils/jsonApiMapper';

import { fetchChartError, fetchChartSuccess } from '../actions';

// Called directly via `call` by the regenerate poll - deliberately has no watcher.
export function* fetchChart({ payload: { chartId } }) {
  const requestURL = `v1/charts/${chartId}`;

  try {
    const { data } = yield call(axios.get, requestURL);
    const chart = jsonApiToObject(data, 'chart');

    yield put(fetchChartSuccess(chart));

    return chart;
  } catch (error) {
    yield put(fetchChartError(error));

    return null;
  }
}
