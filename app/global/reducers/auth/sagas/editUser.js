import axios from 'axios';
import { put, select, takeLatest } from 'redux-saga/effects';
import { error as showError } from 'react-toastify-redux';

import { mapCurrentUser } from 'utils/mapResponseObjects';
import objectKeysToSnakeCase from 'utils/objectToSnakeCase';

import { makeSelectUser } from '../selectors';
import { editUserSuccess } from '../actions';
import { EDIT_USER_REQUEST, EDIT_USER_ERROR } from '../constants';

function* editUser({ payload }) {
  const user = yield select(makeSelectUser());
  const requestURL = `v1/users/${user.id}`;

  const userData = objectKeysToSnakeCase(payload);
  try {
    const {
      data: { data },
    } = yield axios.put(requestURL, {
      user: userData,
    });
    yield put(editUserSuccess(mapCurrentUser(data)));
  } catch (error) {
    yield put(
      showError(error.toString(), {
        id: EDIT_USER_ERROR,
      }),
    );
  }
}

export default function* editUserSaga() {
  yield takeLatest(EDIT_USER_REQUEST, editUser);
}
