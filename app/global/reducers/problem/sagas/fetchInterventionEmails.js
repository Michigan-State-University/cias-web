import axios from 'axios';
import { makeSelectProblem } from 'global/reducers/problem/selectors';
import { put, select, takeLatest } from 'redux-saga/effects';
import isNullOrUndefined from 'utils/isNullOrUndefined';

import { FETCH_INTERVENTION_EMAILS_REQUEST } from '../constants';
import {
  fetchInterventionEmailsError,
  fetchInterventionEmailsSuccess,
} from '../actions';

function* fetchInterventionEmails({ payload: { index } }) {
  const problem = yield select(makeSelectProblem());
  const intervention = problem.interventions[index];
  if (isNullOrUndefined(intervention)) return;
  const requestURL = `v1/interventions/${intervention.id}/invitations`;
  try {
    const {
      data: { intervention_invitations: users },
    } = yield axios.get(requestURL);
    yield put(fetchInterventionEmailsSuccess(users, index));
  } catch (error) {
    yield put(fetchInterventionEmailsError(error));
  }
}

export default function* fetchInterventionEmailsSaga() {
  yield takeLatest(
    [FETCH_INTERVENTION_EMAILS_REQUEST],
    fetchInterventionEmails,
  );
}
