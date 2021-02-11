import axios from 'axios';
import { put, takeLatest, call } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import { toast } from 'react-toastify';

import { formatMessage } from 'utils/intlOutsideReact';

import objectToCamelKebabCase from 'utils/objectToCamelKebabCase';
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
        headers: objectToCamelKebabCase({
          'Content-Type': 'application/json;charset=utf-8',
          'Token-Type': 'Bearer',
          'Access-Token': accessToken,
          client,
          uid,
        }),
      },
    );
    yield call(toast.success, formatMessage(messages.passwordChanged), {
      toastId: SET_NEW_PASSWORD_SUCCESS,
    });
    yield put(setNewPasswordSuccess());
    yield put(push('/'));
  } catch (error) {
    yield put(setNewPasswordError(error.toString()));
  }
}

export default function* setNewPasswordSaga() {
  yield takeLatest(SET_NEW_PASSWORD_REQUEST, setNewPassword);
}
