import { takeLatest, put, call } from 'redux-saga/effects';
import axios from 'axios';

import { jsonApiToArray } from 'utils/jsonApiMapper';
import { FETCH_RESEARCHERS_REQUEST } from '../constants';
import { fetchResearchersSuccess, fetchResearchersError } from '../actions';

function* fetchResearchers() {
  const requestUrl = `/v1/users/researchers`;

  try {
    const { data } = yield call(axios.get, requestUrl);
    const users = jsonApiToArray(data, 'user');
    const { users_size: usersSize } = data;

    yield put(fetchResearchersSuccess(users, usersSize));
  } catch (error) {
    yield put(fetchResearchersError(error));
  }
}

export default function* fetchResearchersSaga() {
  yield takeLatest(FETCH_RESEARCHERS_REQUEST, fetchResearchers);
}
