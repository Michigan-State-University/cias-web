import axios from 'axios';
import { put, takeLatest, call } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import { formatMessage } from 'utils/intlOutsideReact';
import { mapCurrentUser } from 'utils/mapResponseObjects';
import LocalStorageService from 'utils/localStorageService';

import { changeEmailError, changeEmailSuccess } from '../actions';
import { CHANGE_EMAIL_SUCCESS, CHANGE_EMAIL_REQUEST } from '../constants';
import messages from '../messages';

export function* changeEmail({ payload: { oldPassword, newEmail } }) {
  const requestURL = `/v1/auth`;
  try {
    const {
      data: { data },
    } = yield call(axios.patch, requestURL, {
      current_password: oldPassword,
      email: newEmail,
    });
    const mappedUser = mapCurrentUser(data);
    yield call(LocalStorageService.updateState, { user: mappedUser });
    yield call(LocalStorageService.setUid, mappedUser.email);
    yield call(toast.success, formatMessage(messages.changeEmailSuccess), {
      toastId: CHANGE_EMAIL_SUCCESS,
    });

    yield put(changeEmailSuccess(mappedUser));
  } catch (error) {
    yield put(changeEmailError(error.toString()));
  }
}

export default function* changeEmailSaga() {
  yield takeLatest(CHANGE_EMAIL_REQUEST, changeEmail);
}
