import { put, takeLatest, call } from 'redux-saga/effects';
import axios from 'axios';

import { jsonApiToObject } from 'utils/jsonApiMapper';
import { FETCH_HEALTH_SYSTEM_REQUEST } from '../constants';
import { fetchHealthSystemFailure, fetchHealthSystemSuccess } from '../actions';

export function* fetchHealthSystem({ payload: { id } }) {
  const requestURL = `v1/health_systems/${id}`;

  try {
    const { data } = yield call(axios.get, requestURL);
    const healthSystem = jsonApiToObject(data, 'healthSystem');

    yield put(fetchHealthSystemSuccess(healthSystem));
  } catch (error) {
    yield put(fetchHealthSystemFailure(error));
  }
}

export default function* fetchHealthSystemSaga() {
  yield takeLatest(FETCH_HEALTH_SYSTEM_REQUEST, fetchHealthSystem);
}
