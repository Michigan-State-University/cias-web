import axios from 'axios';
import { put, takeLatest, select, call } from 'redux-saga/effects';

import { makeSelectIntervention } from 'global/reducers/intervention/selectors';
import { FETCH_USERS_WITH_ACCESS_REQUEST } from '../constants';
import {
  fetchUsersWithAccessSuccess,
  fetchUsersWithAccessFailure,
} from '../actions';

export function* fetchUsersWithAccess({ payload: { id } }) {
  const intervention = yield select(makeSelectIntervention());

  if (intervention && intervention.id === id) {
    const requestURL = `v1/interventions/${id}/invitations`;
    try {
      const {
        data: { user_sessions: users },
      } = yield call(axios.get, requestURL);
      yield put(fetchUsersWithAccessSuccess(users));
    } catch (error) {
      yield put(fetchUsersWithAccessFailure(error));
    }
  }
}

export default function* fetchUsersWithAccessSaga() {
  yield takeLatest(FETCH_USERS_WITH_ACCESS_REQUEST, fetchUsersWithAccess);
}
