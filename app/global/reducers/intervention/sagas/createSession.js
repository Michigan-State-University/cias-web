import { put, call, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

import { defaultMapper } from 'utils/mapResponseObjects';
import { CREATE_SESSION_REQUEST } from '../constants';

import { createSessionSuccess, createSessionError } from '../actions';

export function* createSession({ payload: { id, lastPosition } }) {
  const requestURL = `v1/interventions/${id}/sessions`;

  try {
    const {
      data: { data },
    } = yield call(axios.post, requestURL, {
      session: {
        type: 'Session::Single',
        name: 'New Session',
        position: lastPosition + 1,
      },
    });

    yield put(createSessionSuccess(defaultMapper(data)));
  } catch (error) {
    yield put(createSessionError(error));
  }
}

export default function* createSessionSaga() {
  yield takeLatest(CREATE_SESSION_REQUEST, createSession);
}
