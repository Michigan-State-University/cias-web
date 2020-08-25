import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

import { defaultMapper } from 'utils/mapResponseObjects';

import { GET_INTERVENTION_REQUEST } from '../constants';
import { getInterventionSuccess, getInterventionError } from '../actions';

function* getIntervention({ payload: { interventionId, problemId } }) {
  const requestURL = `v1/problems/${problemId}/interventions/${interventionId}`;

  try {
    const {
      data: { data },
    } = yield axios.get(requestURL);

    yield put(getInterventionSuccess(defaultMapper(data)));
  } catch (error) {
    yield put(getInterventionError(error));
  }
}

export default function* getInterventionSaga() {
  yield takeLatest(GET_INTERVENTION_REQUEST, getIntervention);
}
