import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

import { mapAccessToStateObject } from 'utils/mapResponseObjects';
import { FETCH_USERS_WITH_ACCESS_REQUEST } from '../constants';
import {
  fetchUsersWithAccessSuccess,
  fetchUsersWithAccessFailure,
} from '../actions';

function* fetchUsersWithAccess({ payload: { id } }) {
  const requestURL = `v1/problems/${id}/users`;
  try {
    const {
      data: { data },
    } = yield axios.get(requestURL);
    const accessMapped = data.map(mapAccessToStateObject);
    yield put(fetchUsersWithAccessSuccess(accessMapped));
  } catch (error) {
    yield put(fetchUsersWithAccessFailure(error));
  }
}

export default function* fetchUsersWithAccessSaga() {
  yield takeLatest(FETCH_USERS_WITH_ACCESS_REQUEST, fetchUsersWithAccess);
}
