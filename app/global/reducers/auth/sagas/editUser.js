import axios from 'axios';
import { put, select, takeLatest, call } from 'redux-saga/effects';
import { error as showError } from 'react-toastify-redux';

import { mapCurrentUser } from 'utils/mapResponseObjects';
import objectKeysToSnakeCase from 'utils/objectToSnakeCase';
import LocalStorageService from 'utils/localStorageService';

import { makeSelectUser } from '../selectors';
import { editUserSuccess, editUserError } from '../actions';
import { EDIT_USER_REQUEST, EDIT_USER_ERROR } from '../constants';

function* editUser({ payload }) {
  const user = yield select(makeSelectUser());
  const requestURL = `v1/users/${user.id}`;

  const userData = objectKeysToSnakeCase(payload.user);
  try {
    const {
      data: { data },
    } = yield axios.put(requestURL, {
      user: userData,
    });
    const mappedUser = mapCurrentUser(data);
    yield call(LocalStorageService.updateState, mappedUser);
    yield put(editUserSuccess(mappedUser));
  } catch (error) {
    yield put(
      showError(error.toString(), {
        id: EDIT_USER_ERROR,
      }),
    );
    yield put(editUserError(error));
  }
}

export default function* editUserSaga() {
  yield takeLatest(EDIT_USER_REQUEST, editUser);
}
