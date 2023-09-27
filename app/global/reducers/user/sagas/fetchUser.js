import { takeLatest, put, call } from 'redux-saga/effects';
import axios from 'axios';

import { pickUserAttributes, mapCurrentUser } from 'utils/mapResponseObjects';
import { FETCH_USER_REQUEST } from '../constants';

import { fetchUserFailure, fetchUserSuccess } from '../actions';

export function* fetchUser({ payload: { id } }) {
  const requestUrl = `/v1/users/${id}`;
  try {
    const { data } = yield call(axios.get, requestUrl);
    const user = mapCurrentUser(data);
    const pickedUser = pickUserAttributes(user);
    yield put(fetchUserSuccess(pickedUser));
  } catch (error) {
    yield put(fetchUserFailure(error));
  }
}

export default function* userSaga() {
  yield takeLatest(FETCH_USER_REQUEST, fetchUser);
}
