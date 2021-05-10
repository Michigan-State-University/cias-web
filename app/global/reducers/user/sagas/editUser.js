import axios from 'axios';
import { put, takeLatest, call } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import { pickUserAttributes } from 'utils/mapResponseObjects';
import objectKeysToSnakeCase from 'utils/objectToSnakeCase';

import { jsonApiToObject } from 'utils/jsonApiMapper';
import { editOtherUserSuccess, editOtherUserError } from '../actions';
import { EDIT_OTHER_USER_REQUEST, EDIT_OTHER_USER_ERROR } from '../constants';

export function* editSingleUser({ payload: { userId, ...newUserData } }) {
  const requestURL = `v1/users/${userId}`;

  const userData = objectKeysToSnakeCase(newUserData);
  try {
    const { data } = yield call(axios.patch, requestURL, {
      user: userData,
    });
    const user = jsonApiToObject(data, 'user');
    const pickedUser = pickUserAttributes(user);
    yield put(editOtherUserSuccess(pickedUser));
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
