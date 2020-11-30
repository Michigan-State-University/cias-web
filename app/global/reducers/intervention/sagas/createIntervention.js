import { put, call, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

import { defaultMapper } from 'utils/mapResponseObjects';
import { CREATE_INTERVENTION_REQUEST } from '../constants';

import { createInterventionSuccess, createInterventionError } from '../actions';

export function* createIntervention({ payload: { id, lastPosition } }) {
  const requestURL = `v1/interventions/${id}/sessions`;

  try {
    const {
      data: { data },
    } = yield call(axios.post, requestURL, {
      session: {
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
