import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

import { mapInterventionToStateObject } from 'utils/mapResponseObjects';

import { GET_INTERVENTION_REQUEST } from '../constants';
import { getInterventionSuccess, getInterventionError } from '../actions';

function* getIntervention({ payload: { id } }) {
  const requestURL = `v1/interventions/${id}`;

  try {
    const {
      data: { data },
    } = yield axios.get(requestURL);

    yield put(getInterventionSuccess(mapInterventionToStateObject(data)));
  } catch (error) {
    yield put(getInterventionError(error));
  }
}

export default function* getInterventionSaga() {
  yield takeLatest(GET_INTERVENTION_REQUEST, getIntervention);
}
