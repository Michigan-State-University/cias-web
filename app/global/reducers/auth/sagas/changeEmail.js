import axios from 'axios';
import { put, takeLatest, call } from 'redux-saga/effects';
import { success as showSuccess } from 'react-toastify-redux';

import { formatMessage } from 'utils/intlOutsideReact';
import { mapCurrentUser } from 'utils/mapResponseObjects';
import LocalStorageService from 'utils/localStorageService';

import { changeEmailError, changeEmailSuccess } from '../actions';
import { CHANGE_EMAIL_SUCCESS, CHANGE_EMAIL_REQUEST } from '../constants';
import messages from '../messages';

function* changeEmail({ payload: { oldPassword, newEmail } }) {
  const requestURL = `/v1/auth`;
  try {
    const {
      data: { data },
    } = yield axios.patch(requestURL, {
      current_password: oldPassword,
      email: newEmail,
    });
    const mappedUser = mapCurrentUser(data);
    yield call(LocalStorageService.updateState, mappedUser);
    yield call(LocalStorageService.setUid, mappedUser.email);
    yield put(
      showSuccess(formatMessage(messages.changeEmailSuccess), {
        id: CHANGE_EMAIL_SUCCESS,
      }),
    );

    yield put(changeEmailSuccess(mappedUser));
  } catch (error) {
    yield put(changeEmailError(error.toString()));
  }
}

export default function* editUserSaga() {
  yield takeLatest(CHANGE_EMAIL_REQUEST, changeEmail);
}
