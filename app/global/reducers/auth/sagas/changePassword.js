import axios from 'axios';
import { put, takeLatest, call } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import { formatMessage } from 'utils/intlOutsideReact';

import messages from '../messages';
import { changePasswordError, changePasswordSuccess } from '../actions';
import { CHANGE_PASSWORD_SUCCESS, CHANGE_PASSWORD_REQUEST } from '../constants';

export function* changePassword({
  payload: { oldPassword, newPassword, newPasswordConfirmation },
}) {
  const requestURL = `/v1/auth/password`;
  try {
    yield call(axios.patch, requestURL, {
      current_password: oldPassword,
      password: newPassword,
      password_confirmation: newPasswordConfirmation,
    });

    yield call(toast.success, formatMessage(messages.changePasswordSuccess), {
      toastId: CHANGE_PASSWORD_SUCCESS,
    });
    yield put(changePasswordSuccess());
  } catch (error) {
    yield put(changePasswordError(error?.toString()));
  }
}

export default function* changePasswordSaga() {
  yield takeLatest(CHANGE_PASSWORD_REQUEST, changePassword);
}
