import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import { success as showSuccess } from 'react-toastify-redux';

import { formatMessage } from 'utils/intlOutsideReact';

import { setNewPasswordSuccess, setNewPasswordError } from './actions';
import {
  SET_NEW_PASSWORD_REQUEST,
  SET_NEW_PASSWORD_SUCCESS,
} from './constants';
import messages from './messages';

function* setNewPassword({
  payload: {
    password,
    passwordConfirmation,
    configuration: { accessToken, client, uid },
  },
}) {
  const requestURL = `/v1/auth/password`;
  try {
    yield axios.put(
      requestURL,
      {
        password,
        password_confirmation: passwordConfirmation,
      },
      {
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
          'token-type': 'Bearer',
          'access-token': accessToken,
          client,
          uid,
        },
      },
    );
    yield put(
      showSuccess(formatMessage(messages.passwordChanged), {
        id: SET_NEW_PASSWORD_SUCCESS,
      }),
    );
    yield put(setNewPasswordSuccess());
    yield put(push('/'));
  } catch (error) {
    yield put(setNewPasswordError(error.toString()));
  }
}

export default function* setNewPasswordSaga() {
  yield takeLatest(SET_NEW_PASSWORD_REQUEST, setNewPassword);
}
