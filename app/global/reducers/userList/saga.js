import { takeLatest, put } from 'redux-saga/effects';
import axios from 'axios';

import { defaultMapper } from 'utils/mapResponseObjects';
import { FETCH_USERS } from './constants';

import { fetchUsersFailure, fetchUsersSuccess } from './actions';

function* fetchUsers() {
  const requestUrl = `/v1/users`;
  try {
    const { data } = yield axios.get(requestUrl);
    const mappedData = data.data.map(defaultMapper);
    yield put(fetchUsersSuccess(mappedData));
  } catch (error) {
    yield put(fetchUsersFailure(error));
  }
}

export default function* userListSaga() {
  yield takeLatest(FETCH_USERS, fetchUsers);
}
