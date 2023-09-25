import axios from 'axios';
import { put, call, takeLatest } from 'redux-saga/effects';

import { jsonApiToArray } from 'utils/jsonApiMapper';
import { FETCH_INTERVENTION_INVITATIONS_REQUEST } from '../constants';
import {
  fetchInterventionInvitationsError,
  fetchInterventionInvitationsSuccess,
} from '../actions';

function* fetchInterventionInvitations({ payload: { interventionId } }) {
  const requestURL = `/v1/interventions/${interventionId}/invitations`;
  try {
    const { data } = yield call(axios.get, requestURL);
    const invitations = jsonApiToArray(data, 'invitation');
    yield put(fetchInterventionInvitationsSuccess(invitations));
  } catch (error) {
    yield put(fetchInterventionInvitationsError(error));
  }
}

export default function* fetchInterventionInvitesSaga() {
  yield takeLatest(
    [FETCH_INTERVENTION_INVITATIONS_REQUEST],
    fetchInterventionInvitations,
  );
}
