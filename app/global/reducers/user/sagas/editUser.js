import axios from 'axios';
import { put, takeLatest, call } from 'redux-saga/effects';
import { toast } from 'react-toastify';

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
    yield call(toast.error, error.toString(), {
      toastId: EDIT_OTHER_USER_ERROR,
    });
    yield put(editOtherUserError(error));
  }
}

export default function* editSingleUserSaga() {
  yield takeLatest(EDIT_OTHER_USER_REQUEST, editSingleUser);
}
