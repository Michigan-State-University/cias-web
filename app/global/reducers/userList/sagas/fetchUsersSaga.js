import { takeLatest, put } from 'redux-saga/effects';
import axios from 'axios';

import { defaultMapper } from 'utils/mapResponseObjects';

import { FETCH_USERS, PER_PAGE } from '../constants';
import { fetchUsersFailure, fetchUsersSuccess } from '../actions';

function* fetchUsers({ payload: { roles, name, page } }) {
  const requestUrl = `/v1/users?`;
  let params = '';
  if (roles) {
    params = roles.reduce((acc, val) => acc.concat(`roles[]=${val}&`), params);
    if (roles.length === 0) {
      params += `roles[]=&`;
    }
  }
  if (name) {
    params += `name=${name}&`;
  }
  if (page) {
    params += `page=${page}&per_page=${PER_PAGE}&`;
  }

  try {
    const { data } = yield axios.get(requestUrl.concat(params));
    const mappedData = data.data.map(defaultMapper);
    yield put(fetchUsersSuccess(mappedData));
  } catch (error) {
    yield put(fetchUsersFailure(error));
  }
}

export default function* fetchUsersSaga() {
  yield takeLatest(FETCH_USERS, fetchUsers);
}
