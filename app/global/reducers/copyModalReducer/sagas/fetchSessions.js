import axios from 'axios';
import { put, call, takeLatest } from 'redux-saga/effects';

import { jsonApiToArray } from 'utils/jsonApiMapper';

import { FETCH_SESSIONS_REQUEST } from '../constants';
import { fetchSessionsSuccess, fetchSessionsError } from '../actions';

export function* fetchSessions({ payload: { id } }) {
  const interventionsRequestURL = `v1/interventions/${id}/sessions`;
  try {
    const { data } = yield call(axios.get, interventionsRequestURL);

    const sessions = jsonApiToArray(data, 'session');

    yield put(fetchSessionsSuccess(sessions));
  } catch (error) {
    yield put(fetchSessionsError(error));
  }
}

export default function* fetchSessionsSaga() {
  yield takeLatest(FETCH_SESSIONS_REQUEST, fetchSessions);
}
