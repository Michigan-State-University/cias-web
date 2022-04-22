import { takeLatest, put, call } from 'redux-saga/effects';
import axios from 'axios';

import { jsonApiToArray } from 'utils/jsonApiMapper';
import objectKeysToSnakeCase from 'utils/objectToSnakeCase';
import { FETCH_RESEARCHERS_REQUEST } from '../constants';
import { fetchResearchersSuccess, fetchResearchersError } from '../actions';

function* fetchResearchers({ payload: { extraParams } }) {
  const requestUrl = `/v1/users/researchers`;

  try {
    const params = objectKeysToSnakeCase(extraParams);
    const { data } = yield call(axios.get, requestUrl, { params });
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
