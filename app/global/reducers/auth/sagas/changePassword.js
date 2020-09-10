import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';
import { success as showSuccess } from 'react-toastify-redux';

import { formatMessage } from 'utils/intlOutsideReact';

import messages from '../messages';
import { changePasswordError, changePasswordSuccess } from '../actions';
import { CHANGE_PASSWORD_SUCCESS, CHANGE_PASSWORD_REQUEST } from '../constants';

function* changePassword({
  payload: { oldPassword, newPassword, newPasswordConfirmation },
}) {
  const requestURL = `/v1/auth/password`;
  try {
    yield axios.patch(requestURL, {
      current_password: oldPassword,
      password: newPassword,
      password_confirmation: newPasswordConfirmation,
    });
    yield put(
      showSuccess(formatMessage(messages.changePasswordSuccess), {
        id: CHANGE_PASSWORD_SUCCESS,
      }),
    );
    yield put(changePasswordSuccess());
  } catch (error) {
    yield put(changePasswordError(error.toString()));
  }
}

export default function* editUserSaga() {
  yield takeLatest(CHANGE_PASSWORD_REQUEST, changePassword);
}
