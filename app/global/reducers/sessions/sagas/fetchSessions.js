import axios from 'axios';
import { put, call, takeLatest } from 'redux-saga/effects';

import { Roles } from 'models/User/UserRoles';
import { FETCH_SESSIONS_REQUEST } from '../constants';
import { fetchSessionsSuccess, fetchSessionsError } from '../actions';

export function* fetchSessions({ payload: { role } }) {
  let requestURL = `v1/sessions`;
  if (role === Roles.participant) requestURL = `v1/interventions`;

  try {
    const {
      data: { data },
    } = yield call(axios.get, requestURL);
    yield put(fetchSessionsSuccess(data));
  } catch (error) {
    yield put(fetchSessionsError(error));
  }
}

export default function* fetchSessionsSaga() {
  yield takeLatest(FETCH_SESSIONS_REQUEST, fetchSessions);
}
