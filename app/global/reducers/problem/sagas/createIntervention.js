import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

import { defaultMapper } from 'utils/mapResponseObjects';
import { CREATE_INTERVENTION_REQUEST } from '../constants';

import { createInterventionSuccess, createInterventionError } from '../actions';

function* createIntervention({ payload: { id, lastPosition } }) {
  const requestURL = `v1/problems/${id}/interventions`;

  try {
    const {
      data: { data },
    } = yield axios.post(requestURL, {
      intervention: {
        type: 'Intervention::Single',
        name: 'New Session',
        position: lastPosition + 1,
      },
    });

    yield put(createInterventionSuccess(defaultMapper(data)));
  } catch (error) {
    yield put(createInterventionError(error));
  }
}

export default function* createInterventionSaga() {
  yield takeLatest(CREATE_INTERVENTION_REQUEST, createIntervention);
}
