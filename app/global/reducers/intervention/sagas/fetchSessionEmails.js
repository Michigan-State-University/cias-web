import axios from 'axios';
import { makeSelectProblem } from 'global/reducers/intervention/selectors';
import { put, call, select, takeLatest } from 'redux-saga/effects';
import isNullOrUndefined from 'utils/isNullOrUndefined';

import { FETCH_INTERVENTION_EMAILS_REQUEST } from '../constants';
import {
  fetchInterventionEmailsError,
  fetchInterventionEmailsSuccess,
} from '../actions';

export function* fetchSessionEmails({ payload: { index } }) {
  const problem = yield select(makeSelectProblem());
  const intervention = problem.interventions[index];
  if (isNullOrUndefined(intervention)) return;
  const requestURL = `v1/sessions/${intervention.id}/invitations`;
  try {
    const {
      data: { session_invitations: users },
    } = yield call(axios.get, requestURL);
    yield put(fetchInterventionEmailsSuccess(users, index));
  } catch (error) {
    yield put(fetchInterventionEmailsError(error));
  }
}

export default function* fetchSessionEmailsSaga() {
  yield takeLatest([FETCH_INTERVENTION_EMAILS_REQUEST], fetchSessionEmails);
}
