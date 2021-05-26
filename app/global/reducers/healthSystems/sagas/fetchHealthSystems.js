import axios from 'axios';

import { put, takeLatest, call } from 'redux-saga/effects';
import { jsonApiToArray } from 'utils/jsonApiMapper';

import { fetchHealthSystemsSuccess, fetchHealthSystemsError } from '../actions';
import { FETCH_HEALTH_SYSTEMS_REQUEST } from '../constants';

export function* fetchHealthSystems() {
  const requestURL = `v1/health_systems`;

  try {
    const { data } = yield call(axios.get, requestURL);
    const healthSystems = jsonApiToArray(data, 'healthSystem');
    yield put(fetchHealthSystemsSuccess(healthSystems));
  } catch (error) {
    yield put(fetchHealthSystemsError(error));
  }
}
export default function* fetchHealthSystemsSaga() {
  yield takeLatest(FETCH_HEALTH_SYSTEMS_REQUEST, fetchHealthSystems);
}
