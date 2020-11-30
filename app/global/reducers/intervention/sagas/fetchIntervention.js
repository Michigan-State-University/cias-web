import axios from 'axios';
import { put, call, takeLatest } from 'redux-saga/effects';
import orderBy from 'lodash/orderBy';

import { defaultMapper } from 'utils/mapResponseObjects';
import { FETCH_PROBLEM_REQUEST } from '../constants';
import { fetchProblemSuccess, fetchProblemError } from '../actions';

export function* fetchIntervention({ payload: { id } }) {
  const problemRequestURL = `v1/interventions/${id}`;
  const interventionsRequestURL = `v1/interventions/${id}/sessions`;
  try {
    const { data } = yield call(axios.get, problemRequestURL);
    const {
      data: { data: sessions },
    } = yield call(axios.get, interventionsRequestURL);
    const mappedInterventions = sessions.map(defaultMapper);
    data.sessions = orderBy(mappedInterventions, 'position');
    yield put(fetchProblemSuccess(data));
  } catch (error) {
    yield put(fetchProblemError(error));
  }
}

export default function* fetchInterventionSaga() {
  yield takeLatest(FETCH_PROBLEM_REQUEST, fetchIntervention);
}
