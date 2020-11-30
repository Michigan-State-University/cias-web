import axios from 'axios';
import { makeSelectProblem } from 'global/reducers/intervention/selectors';
import { put, call, select, takeLatest } from 'redux-saga/effects';
import isNullOrUndefined from 'utils/isNullOrUndefined';

import { FETCH_SESSION_EMAILS_REQUEST } from '../constants';
import { fetchSessionEmailsError, fetchSessionEmailsSuccess } from '../actions';

export function* fetchSessionEmails({ payload: { index } }) {
  const problem = yield select(makeSelectProblem());
  const intervention = problem.sessions[index];
  if (isNullOrUndefined(intervention)) return;
  const requestURL = `v1/sessions/${intervention.id}/invitations`;
  try {
    const {
      data: { session_invitations: users },
    } = yield call(axios.get, requestURL);
    yield put(fetchSessionEmailsSuccess(users, index));
  } catch (error) {
    yield put(fetchSessionEmailsError(error));
  }
}

export default function* fetchSessionEmailsSaga() {
  yield takeLatest([FETCH_SESSION_EMAILS_REQUEST], fetchSessionEmails);
}
