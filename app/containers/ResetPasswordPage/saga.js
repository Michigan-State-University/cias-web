import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';
import { success as showSuccess } from 'react-toastify-redux';

import { formatMessage } from 'utils/intlOutsideReact';

import { resetPasswordError, resetPasswordSuccess } from './actions';
import { RESET_PASSWORD_REQUEST, RESET_PASSWORD_SUCCESS } from './constants';
import messages from './messages';

function* resetPassword({ payload: { email } }) {
  const requestURL = `/v1/auth/password`;
  try {
    yield axios.post(requestURL, {
      email,
      redirect_url: `${process.env.WEB_URL}/set-new-password`,
    });
    yield put(
      showSuccess(formatMessage(messages.linkSent), {
        id: RESET_PASSWORD_SUCCESS,
      }),
    );
    yield put(resetPasswordSuccess());
  } catch (error) {
    yield put(resetPasswordError(error.toString()));
  }
}

export default function* resetPasswordSaga() {
  yield takeLatest(RESET_PASSWORD_REQUEST, resetPassword);
}
