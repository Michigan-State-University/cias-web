import axios from 'axios';
import { put, call, takeLatest } from 'redux-saga/effects';

import { jsonApiToArray } from 'utils/jsonApiMapper';

import {
  fetchPredefinedParticipantsError,
  fetchPredefinedParticipantsRequest,
  fetchPredefinedParticipantsSuccess,
} from '../actions';
import { FETCH_PREDEFINED_PARTICIPANTS_REQUEST } from '../constants';

function* fetchPredefinedParticipants({
  payload: { interventionId },
}: ReturnType<typeof fetchPredefinedParticipantsRequest>) {
  const requestURL = `v1/interventions/${interventionId}/predefined_participantss`;

  try {
    const { data } = yield call(axios.get, requestURL);

    const predefinedParticipants = jsonApiToArray(
      data,
      'predefinedParticipant',
    );
    yield put(fetchPredefinedParticipantsSuccess(predefinedParticipants));
  } catch (error) {
    yield put(fetchPredefinedParticipantsError(error));
  }
}

export default function* fetchPredefinedParticipantsSaga() {
  yield takeLatest(
    FETCH_PREDEFINED_PARTICIPANTS_REQUEST,
    fetchPredefinedParticipants,
  );
}
