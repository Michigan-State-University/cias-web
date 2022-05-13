import { put, select, takeLatest, call } from 'redux-saga/effects';
import axios from 'axios';

import isNullOrUndefined from 'utils/isNullOrUndefined';

import {
  fetchInterventionRequest,
  makeSelectIntervention,
} from 'global/reducers/intervention';
import { setTextMessagesCount } from 'global/reducers/textMessages';
import { mapJsonApiToObject } from 'utils/jsonApiMapper';
import { GET_SESSION_REQUEST } from '../constants';
import { getSessionSuccess, getSessionError } from '../actions';

export function* getSession({ payload: { sessionId, interventionId } }) {
  const intervention = yield select(makeSelectIntervention());

  if (isNullOrUndefined(intervention) || intervention.id !== interventionId)
    yield put(fetchInterventionRequest(interventionId));

  const requestURL = `v1/interventions/${interventionId}/sessions/${sessionId}`;

  try {
    const { data } = yield call(axios.get, requestURL);

    const mappedData = mapJsonApiToObject(data, 'session', {
      isSingleObject: true,
    });

    yield put(getSessionSuccess(mappedData));
    yield put(setTextMessagesCount(mappedData.smsPlansCount));
  } catch (error) {
    yield put(getSessionError(error));
  }
}

export default function* getSessionSaga() {
  yield takeLatest(GET_SESSION_REQUEST, getSession);
}
