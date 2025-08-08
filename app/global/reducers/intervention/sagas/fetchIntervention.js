import axios from 'axios';
import { put, call, takeLatest } from 'redux-saga/effects';
import orderBy from 'lodash/orderBy';

import { defaultMapper } from 'utils/mapResponseObjects';
import { jsonApiToObject } from 'utils/jsonApiMapper';
import objectToCamelCase from 'utils/objectToCamelCase';

import { FETCH_INTERVENTION_REQUEST } from '../constants';
import { fetchInterventionSuccess, fetchInterventionError } from '../actions';

export function* fetchIntervention({ payload: { id } }) {
  const interventionRequestURL = `v1/interventions/${id}`;
  const sessionRequestUrl = `v1/interventions/${id}/sessions`;
  try {
    const { data } = yield call(axios.get, interventionRequestURL);
    const {
      data: { data: sessions },
    } = yield call(axios.get, sessionRequestUrl);

    const intervention = jsonApiToObject(data, 'intervention');
    const camelCaseIntervention = objectToCamelCase(intervention);
    const mappedSessions = sessions.map(defaultMapper);
    const camelCaseSessions = objectToCamelCase(mappedSessions);
    camelCaseIntervention.sessions = orderBy(camelCaseSessions, 'position');
    yield put(fetchInterventionSuccess(camelCaseIntervention));
  } catch (error) {
    yield put(fetchInterventionError(error));
  }
}

export default function* fetchInterventionSaga() {
  yield takeLatest(FETCH_INTERVENTION_REQUEST, fetchIntervention);
}
