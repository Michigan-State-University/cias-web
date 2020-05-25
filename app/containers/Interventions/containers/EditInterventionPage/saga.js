import { put, takeLatest, select, all } from 'redux-saga/effects';
import axios from 'axios';
import { getHeaders } from 'utils/getHeaders';
import { makeSelectHeaders } from 'global/reducers/auth';
import { CREATE_INTERVENTION_REQUEST } from './constants';
import { createInterventionSuccess, createInterventionError } from './actions';

function* createIntervention() {
  const requestURL = `${process.env.API_URL}/v1/interventions`;

  try {
    const response = yield axios.post(
      requestURL,
      {
        intervention: {
          type: 'Intervention::Single',
          name: 'e-Intervention New',
          settings: {},
        },
      },
      { headers: getHeaders(yield select(makeSelectHeaders())) },
    );

    const token = response.headers['access-token'];

    yield put(createInterventionSuccess(token));
  } catch (error) {
    yield put(createInterventionError(error));
  }
}

export default function* editInterventionPageSaga() {
  yield all([
    yield takeLatest(CREATE_INTERVENTION_REQUEST, createIntervention),
  ]);
}
