import axios from 'axios';
import { put, call, takeLatest, select } from 'redux-saga/effects';
import groupBy from 'lodash/groupBy';

import { jsonApiToArray } from 'utils/jsonApiMapper';
import { FETCH_INTERVENTION_INVITATIONS_REQUEST } from '../constants';
import {
  fetchInterventionInvitesError,
  fetchInterventionInvitesSuccess,
} from '../actions';
import { makeSelectInterventionOrganizationId } from '../selectors';

function* fetchInterventionInvites({ payload: { interventionId } }) {
  const organizationId = yield select(makeSelectInterventionOrganizationId());
  const requestURL = `/v1/interventions/${interventionId}/invitations`;
  try {
    const { data } = yield call(axios.get, requestURL);
    let invites = jsonApiToArray(data, 'invitation');
    if (organizationId) {
      invites = groupBy(invites, 'healthClinicId');
    }
    yield put(fetchInterventionInvitesSuccess(invites));
  } catch (error) {
    yield put(fetchInterventionInvitesError(error));
  }
}

export default function* fetchInterventionInvitesSaga() {
  yield takeLatest(
    [FETCH_INTERVENTION_INVITATIONS_REQUEST],
    fetchInterventionInvites,
  );
}
