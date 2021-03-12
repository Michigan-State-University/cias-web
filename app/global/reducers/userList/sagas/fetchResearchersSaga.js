import { takeLatest, put, call } from 'redux-saga/effects';
import axios from 'axios';

import { mapCurrentUserWithoutAttributes } from 'utils/mapResponseObjects';

import { FETCH_RESEARCHERS_REQUEST } from '../constants';
import { fetchResearchersSuccess, fetchResearchersError } from '../actions';

function* fetchResearchers() {
  const requestUrl = `/v1//users/researchers`;

  try {
    const {
      data: { users, users_size: usersSize },
    } = yield call(axios.get, requestUrl);
    const mappedData = users.map(mapCurrentUserWithoutAttributes);

    yield put(fetchResearchersSuccess(mappedData, usersSize));
  } catch (error) {
    yield put(fetchResearchersError(error));
  }
}

export default function* fetchResearchersSaga() {
  yield takeLatest(FETCH_RESEARCHERS_REQUEST, fetchResearchers);
}
