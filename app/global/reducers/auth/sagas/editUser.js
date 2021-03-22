import axios from 'axios';
import { put, select, takeLatest, call } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import { mapCurrentUserWithoutAttributes } from 'utils/mapResponseObjects';
import objectKeysToSnakeCase from 'utils/objectToSnakeCase';
import LocalStorageService from 'utils/localStorageService';

import { makeSelectUser } from '../selectors';
import { editUserSuccess, editUserError } from '../actions';
import { EDIT_USER_REQUEST, EDIT_USER_ERROR } from '../constants';

export function* editUser({ payload }) {
  const user = yield select(makeSelectUser());
  const requestURL = `v1/users/${user.id}`;

  const userData = objectKeysToSnakeCase(payload.user);
  try {
    const { data } = yield call(axios.patch, requestURL, {
      user: userData,
    });
    const mappedUser = mapCurrentUserWithoutAttributes(data);
    yield call(LocalStorageService.updateState, { user: mappedUser });
    yield put(editUserSuccess(mappedUser));
  } catch (error) {
    yield call(toast.error, error.toString(), {
      toastId: EDIT_USER_ERROR,
    });
    yield put(editUserError(error));
  }
}

export default function* editUserSaga() {
  yield takeLatest(EDIT_USER_REQUEST, editUser);
}
