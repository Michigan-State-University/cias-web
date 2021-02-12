import { takeLatest, put } from 'redux-saga/effects';
import axios from 'axios';

import { mapCurrentUserWithoutAttributes } from 'utils/mapResponseObjects';

import { FETCH_USERS, FETCH_USERS_SELECTOR } from '../constants';
import {
  fetchUsersFailure,
  fetchUsersSelectorFailure,
  fetchUsersSelectorSuccess,
  fetchUsersSuccess,
} from '../actions';

function* fetchUsers({
  payload: { roles, name, page, includeInactive, teamId, perPage },
  type,
}) {
  const requestUrl = `/v1/users?`;
  let params = '';
  if (roles) {
    params = roles.reduce((acc, val) => acc.concat(`roles[]=${val}&`), params);
    if (roles.length === 0) {
      params += `roles[]=&`;
    }
  }
  if (teamId) {
    params += `team_id=${teamId}&`;
  }
  if (name) {
    params += `name=${name}&`;
  }
  if (page) {
    params += `page=${page}&per_page=${perPage}&`;
  }

  if (includeInactive) params += 'active[]=true&active[]=false&';

  try {
    const {
      data: { users, users_size: usersSize },
    } = yield axios.get(requestUrl.concat(params));
    const mappedData = users.map(mapCurrentUserWithoutAttributes);
    switch (type) {
      case FETCH_USERS:
        yield put(fetchUsersSuccess(mappedData, usersSize));
        break;
      case FETCH_USERS_SELECTOR:
        yield put(fetchUsersSelectorSuccess(mappedData, usersSize));
        break;
      default:
        break;
    }
  } catch (error) {
    switch (type) {
      case FETCH_USERS:
        yield put(fetchUsersFailure(error));
        break;
      case FETCH_USERS_SELECTOR:
        yield put(fetchUsersSelectorFailure(error));
        break;
      default:
        break;
    }
  }
}

export default function* fetchUsersSaga() {
  yield takeLatest(FETCH_USERS, fetchUsers);
  yield takeLatest(FETCH_USERS_SELECTOR, fetchUsers);
}
