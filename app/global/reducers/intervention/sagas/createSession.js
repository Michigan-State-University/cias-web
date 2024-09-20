import { put, call, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

import { CAT_SESSION_NAME_PREFIX, SessionTypes } from 'models/Session';

import { defaultMapper } from 'utils/mapResponseObjects';
import objectToCamelCase from 'utils/objectToCamelCase';

import { CREATE_SESSION_REQUEST } from '../constants';
import { createSessionSuccess, createSessionError } from '../actions';

export function* createSession({ payload: { id, lastPosition, type } }) {
  const requestURL = `v1/interventions/${id}/sessions`;
  const sessionNamePrefix =
    type === SessionTypes.CAT_SESSION ? CAT_SESSION_NAME_PREFIX : '';
  const sessionName =
    type === SessionTypes.SMS_SESSION
      ? 'New SMS Campaign'
      : `${sessionNamePrefix}New Session`;
  const defaultResponse =
    type === SessionTypes.SMS_SESSION ? 'Wrong message' : '';
  try {
    const {
      data: { data },
    } = yield call(axios.post, requestURL, {
      session: {
        type,
        name: sessionName,
        position: lastPosition + 1,
        default_response: defaultResponse,
      },
    });

    yield put(createSessionSuccess(defaultMapper(objectToCamelCase(data))));
  } catch (error) {
    yield put(createSessionError(error));
  }
}

export default function* createSessionSaga() {
  yield takeLatest(CREATE_SESSION_REQUEST, createSession);
}
