import axios from 'axios';
import { put, takeLatest, select } from 'redux-saga/effects';

import { mapAccessToStateObject } from 'utils/mapResponseObjects';
import { makeSelectProblem } from 'global/reducers/problem/selectors';
import { FETCH_USERS_WITH_ACCESS_REQUEST } from '../constants';
import {
  fetchUsersWithAccessSuccess,
  fetchUsersWithAccessFailure,
} from '../actions';

function* fetchUsersWithAccess({ payload: { id } }) {
  const problem = yield select(makeSelectProblem());

  if (problem && problem.id === id) {
    const requestURL = `v1/problems/${id}/users`;
    try {
      const {
        data: { user_interventions: users },
      } = yield axios.get(requestURL);
      const accessMapped = users.map(mapAccessToStateObject);
      yield put(fetchUsersWithAccessSuccess(accessMapped));
    } catch (error) {
      yield put(fetchUsersWithAccessFailure(error));
    }
  }
}

export default function* fetchUsersWithAccessSaga() {
  yield takeLatest(FETCH_USERS_WITH_ACCESS_REQUEST, fetchUsersWithAccess);
}
