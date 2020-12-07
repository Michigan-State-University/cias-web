import { put, takeLatest, delay } from 'redux-saga/effects';

import {
  createParticipantIntervention,
  createParticipantSession,
} from 'utils/reducerCreators';

import { FETCH_INTERVENTIONS_REQUEST } from '../constants';
import { fetchInterventionsSuccess, fetchInterventionsError } from '../actions';

export const FETCH_DATA = [
  createParticipantIntervention(2, [
    createParticipantSession(3),
    createParticipantSession(5),
    createParticipantSession(4, true),
  ]),
  createParticipantIntervention(),
  createParticipantIntervention(1),
  createParticipantIntervention(6, [
    createParticipantSession(7),
    createParticipantSession(8),
    createParticipantSession(9, true),
  ]),
  createParticipantIntervention(10),
  createParticipantIntervention(11, [
    createParticipantSession(12),
    createParticipantSession(13, true),
  ]),
];

export function* fetchInterventions() {
  try {
    yield delay(2000);
    yield put(fetchInterventionsSuccess(FETCH_DATA));
  } catch (error) {
    yield put(fetchInterventionsError(error));
  }
}

export default function* fetchInterventionsSaga() {
  yield takeLatest(FETCH_INTERVENTIONS_REQUEST, fetchInterventions);
}
