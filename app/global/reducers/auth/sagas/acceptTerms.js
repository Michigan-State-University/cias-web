import { takeLatest, put, call } from 'redux-saga/effects';
import axios from 'axios';
import { toast } from 'react-toastify';

import objectKeysToSnakeCase from 'utils/objectToSnakeCase';
import { formatMessage } from 'utils/intlOutsideReact';

import { TERMS_ACCEPT_REQUEST, TERMS_ACCEPT_SUCCESS } from '../constants';
import { termsAcceptSuccess, termsAcceptError } from '../actions';
import messages from '../messages';

export function* termsAccept({ payload: { fields, onSuccess } }) {
  const requestUrl = 'v1/users/confirm_terms';
  try {
    yield call(axios.patch, requestUrl, { ...objectKeysToSnakeCase(fields) });
    yield call(onSuccess);
    yield call(toast.success, formatMessage(messages.termsAcceptSuccess), {
      toastId: TERMS_ACCEPT_SUCCESS,
    });
    yield put(termsAcceptSuccess());
  } catch {
    yield put(termsAcceptError());
  }
}

export default function* termsAcceptSaga() {
  yield takeLatest(TERMS_ACCEPT_REQUEST, termsAccept);
}
