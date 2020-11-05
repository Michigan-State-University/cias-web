import axios from 'axios';
import { put, call, takeLatest } from 'redux-saga/effects';
import orderBy from 'lodash/orderBy';

import { defaultMapper } from 'utils/mapResponseObjects';
import { FETCH_PROBLEM_REQUEST } from '../constants';
import { fetchProblemSuccess, fetchProblemError } from '../actions';

export function* fetchProblem({ payload: { id } }) {
  const problemRequestURL = `v1/problems/${id}`;
  const interventionsRequestURL = `v1/problems/${id}/interventions`;
  try {
    const { data } = yield call(axios.get, problemRequestURL);
    const {
      data: { data: interventions },
    } = yield call(axios.get, interventionsRequestURL);
    const mappedInterventions = interventions.map(defaultMapper);
    data.interventions = orderBy(mappedInterventions, 'position');
    yield put(fetchProblemSuccess(data));
  } catch (error) {
    yield put(fetchProblemError(error));
  }
}

export default function* fetchProblemSaga() {
  yield takeLatest(FETCH_PROBLEM_REQUEST, fetchProblem);
}
