import axios from 'axios';
import { put, call, takeLatest } from 'redux-saga/effects';

import { defaultMapper } from 'utils/mapResponseObjects';
import { FETCH_SESSIONS_REQUEST } from '../constants';
import { fetchSessionsSuccess, fetchSessionsError } from '../actions';

export function* fetchSessions({ payload: { id } }) {
  const interventionsRequestURL = `v1/interventions/${id}/sessions`;
  try {
    const {
      data: { data: sessions },
    } = yield call(axios.get, interventionsRequestURL);
    const mappedSessions = sessions.map(defaultMapper);
    yield put(fetchSessionsSuccess(mappedSessions));
  } catch (error) {
    yield put(fetchSessionsError(error));
  }
}

export default function* fetchSessionsSaga() {
  yield takeLatest(FETCH_SESSIONS_REQUEST, fetchSessions);
}
