import axios from 'axios';
import { makeSelectIntervention } from 'global/reducers/intervention/selectors';
import { put, call, select, takeLatest } from 'redux-saga/effects';
import isNullOrUndefined from 'utils/isNullOrUndefined';

import { jsonApiToArray } from 'utils/jsonApiMapper';
import { FETCH_SESSION_EMAILS_REQUEST } from '../constants';
import { fetchSessionEmailsError, fetchSessionEmailsSuccess } from '../actions';

export function* fetchSessionEmails({ payload: { index } }) {
  const intervention = yield select(makeSelectIntervention());
  const session = intervention.sessions[index];
  if (isNullOrUndefined(session)) return;
  const requestURL = `v1/sessions/${session.id}/invitations`;
  try {
    const { data } = yield call(axios.get, requestURL);
    const users = jsonApiToArray(data, 'invitation');
    yield put(fetchSessionEmailsSuccess(users || [], index));
  } catch (error) {
    yield put(fetchSessionEmailsError(error));
  }
}

export default function* fetchSessionEmailsSaga() {
  yield takeLatest([FETCH_SESSION_EMAILS_REQUEST], fetchSessionEmails);
}
