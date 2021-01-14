import { call, put, takeLatest, delay } from 'redux-saga/effects';
import axios from 'axios';

import { sendSmsTokenSuccess, sendSmsTokenError } from '../actions';
import { SEND_SMS_TOKEN_REQUEST } from '../constants';

export function* sendSmsToken() {
  const requestURL = `v1/users/send_sms_token`;

  try {
    yield call(axios.put, requestURL);

    yield delay(1000);
    yield put(sendSmsTokenSuccess());
  } catch (error) {
    yield delay(1000);
    yield put(sendSmsTokenError(error.toString()));
  }
}

export default function* sendSmsTokenSaga() {
  yield takeLatest(SEND_SMS_TOKEN_REQUEST, sendSmsToken);
}
