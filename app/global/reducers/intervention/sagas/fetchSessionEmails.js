import axios from 'axios';
import { makeSelectIntervention } from 'global/reducers/intervention/selectors';
import { put, call, select, takeLatest } from 'redux-saga/effects';
import isNullOrUndefined from 'utils/isNullOrUndefined';
import groupBy from 'lodash/groupBy';

import { jsonApiToArray } from 'utils/jsonApiMapper';
import { FETCH_SESSION_EMAILS_REQUEST } from '../constants';
import { fetchSessionEmailsError, fetchSessionEmailsSuccess } from '../actions';

export function* fetchSessionEmails({ payload: { index } }) {
  const { sessions, organizationId } = yield select(makeSelectIntervention());
  const session = sessions[index];
  if (isNullOrUndefined(session)) return;
  const organizationPrefix = organizationId
    ? `organizations/${organizationId}/`
    : '';
  const requestURL = `v1/${organizationPrefix}sessions/${
    session.id
  }/invitations`;
  try {
    const { data } = yield call(axios.get, requestURL);
    let invitations = jsonApiToArray(data, 'invitation');
    if (organizationId) {
      invitations = groupBy(invitations, 'healthClinicId');
    }
    yield put(fetchSessionEmailsSuccess(invitations, index));
  } catch (error) {
    yield put(fetchSessionEmailsError(error));
  }
}

export default function* fetchSessionEmailsSaga() {
  yield takeLatest([FETCH_SESSION_EMAILS_REQUEST], fetchSessionEmails);
}
