import { put, takeLatest, call } from 'redux-saga/effects';
import axios from 'axios';

import { REMOVE_TEXT_MESSAGE_REQUEST } from '../constants';
import { removeTextMessageSuccess, removeTextMessageError } from '../actions';

export function* removeTextMessage({ payload: { textMessageId } }) {
  try {
    const requestUrl = `v1/sms_plans/${textMessageId}`;
    yield call(axios.delete, requestUrl);
    yield put(removeTextMessageSuccess());
  } catch (error) {
    yield put(removeTextMessageError(error));
  }
}

export default function* removeTextMessageSaga() {
  yield takeLatest(REMOVE_TEXT_MESSAGE_REQUEST, removeTextMessage);
}
