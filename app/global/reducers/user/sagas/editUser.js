import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';
import { error as showError } from 'react-toastify-redux';

import { mapCurrentUserWithoutAttributes } from 'utils/mapResponseObjects';
import objectKeysToSnakeCase from 'utils/objectToSnakeCase';

import { editOtherUserSuccess, editOtherUserError } from '../actions';
import { EDIT_OTHER_USER_REQUEST, EDIT_OTHER_USER_ERROR } from '../constants';

function* editSingleUser({ payload: { userId, ...newUserData } }) {
  const requestURL = `v1/users/${userId}`;

  const userData = objectKeysToSnakeCase(newUserData);
  try {
    const { data } = yield axios.patch(requestURL, {
      user: userData,
    });
    const mappedUser = mapCurrentUserWithoutAttributes(data);
    yield put(editOtherUserSuccess(mappedUser));
  } catch (error) {
    yield put(
      showError(error.toString(), {
        id: EDIT_OTHER_USER_ERROR,
      }),
    );
    yield put(editOtherUserError(error));
  }
}

export default function* editSingleUserSaga() {
  yield takeLatest(EDIT_OTHER_USER_REQUEST, editSingleUser);
}
