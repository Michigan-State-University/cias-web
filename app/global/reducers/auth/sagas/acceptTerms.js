import { takeLatest, put, call, select } from 'redux-saga/effects';
import axios from 'axios';
import { toast } from 'react-toastify';

import objectKeysToSnakeCase from 'utils/objectToSnakeCase';
import { formatMessage } from 'utils/intlOutsideReact';

import { TERMS_ACCEPT_REQUEST, TERMS_ACCEPT_SUCCESS } from '../constants';
import { termsAcceptSuccess, termsAcceptError } from '../actions';
import messages from '../messages';
import { makeSelectCachePassword } from '../selectors';

export function* termsAccept({ payload: { fields, onSuccess } }) {
  const requestUrl = 'v1/users/confirm_terms';
  try {
    const password = yield select(makeSelectCachePassword());
    yield call(axios.patch, requestUrl, {
      ...objectKeysToSnakeCase(fields),
      password,
    });
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

export const withTermsAcceptSaga = {
  key: 'termsAcceptSaga',
  saga: termsAcceptSaga,
};
