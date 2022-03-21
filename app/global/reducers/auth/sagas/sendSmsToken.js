import { call, put, takeLatest, delay, select } from 'redux-saga/effects';
import axios from 'axios';

import { makeSelectPhoneNumberPreview, makeSelectUser } from '../selectors';
import { sendSmsTokenSuccess, sendSmsTokenError } from '../actions';
import { SEND_SMS_TOKEN_REQUEST } from '../constants';

export function* sendSmsToken() {
  const requestURL = `v1/users/send_sms_token`;

  const requestObject = (phoneNumber) => ({
    phone_number: phoneNumber.number,
    iso: phoneNumber.iso,
    prefix: phoneNumber.prefix,
  });

  try {
    const previewNumber = yield select(makeSelectPhoneNumberPreview());
    const user = yield select(makeSelectUser());
    const { phone } = user ?? {};
    let body;
    if (phone) body = requestObject(phone);
    if (previewNumber) body = requestObject(previewNumber);

    yield call(axios.put, requestURL, body);
    yield delay(1000);
    yield put(sendSmsTokenSuccess());
  } catch (error) {
    yield delay(1000);
    yield put(sendSmsTokenError(error?.toString()));
  }
}

export default function* sendSmsTokenSaga() {
  yield takeLatest(SEND_SMS_TOKEN_REQUEST, sendSmsToken);
}
