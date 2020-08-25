import { takeLatest, put } from 'redux-saga/effects';
import axios from 'axios';

import { defaultMapper } from 'utils/mapResponseObjects';
import isNullOrUndefined from 'utils/isNullOrUndefined';
import { FETCH_USERS } from './constants';

import { fetchUsersFailure, fetchUsersSuccess } from './actions';

function* fetchUsers({ payload: { types } }) {
  const requestUrl = `/v1/users?`;
  let params = '';
  if (!isNullOrUndefined(types)) {
    params = types.reduce((acc, val) => acc.concat(`roles[]=${val}&`), params);
  }

  try {
    const { data } = yield axios.get(requestUrl.concat(params));
    const mappedData = data.data.map(defaultMapper);
    yield put(fetchUsersSuccess(mappedData));
  } catch (error) {
    yield put(fetchUsersFailure(error));
  }
}

export default function* userListSaga() {
  yield takeLatest(FETCH_USERS, fetchUsers);
}
