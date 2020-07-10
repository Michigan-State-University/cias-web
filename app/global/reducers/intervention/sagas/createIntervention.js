import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import { push } from 'connected-react-router';

import { CREATE_INTERVENTION_REQUEST } from '../constants';

import { createInterventionSuccess, createInterventionError } from '../actions';

function* createIntervention() {
  const requestURL = `v1/interventions`;

  try {
    const response = yield axios.post(requestURL, {
      intervention: {
        type: 'Intervention::Single',
        name: 'e-Intervention New',
      },
    });

    yield put(createInterventionSuccess());
    yield put(push(`/interventions/${response.data.data.id}/edit`));
  } catch (error) {
    yield put(createInterventionError(error));
  }
}

export default function* createInterventionSaga() {
  yield takeLatest(CREATE_INTERVENTION_REQUEST, createIntervention);
}
