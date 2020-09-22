import { takeLatest, put } from 'redux-saga/effects';
import axios from 'axios';

import { mapCurrentUser } from 'utils/mapResponseObjects';
import { FETCH_USER } from '../constants';

import { fetchUserFailure, fetchUserSuccess } from '../actions';

function* fetchUser({ payload: { id } }) {
  const requestUrl = `/v1/users/${id}`;
  try {
    const { data } = yield axios.get(requestUrl);
    const mappedData = mapCurrentUser(data.data);
    yield put(fetchUserSuccess(mappedData));
  } catch (error) {
    yield put(fetchUserFailure(error));
  }
}

export default function* userSaga() {
  yield takeLatest(FETCH_USER, fetchUser);
}
