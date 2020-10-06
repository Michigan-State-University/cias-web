import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';
import orderBy from 'lodash/orderBy';

import { FETCH_PROBLEM_REQUEST } from '../constants';
import { fetchProblemSuccess, fetchProblemError } from '../actions';
import { defaultMapper } from '../../../../utils/mapResponseObjects';

function* fetchProblem({ payload: { id } }) {
  const problemRequestURL = `v1/problems/${id}`;
  const interventionsRequestURL = `v1/problems/${id}/interventions`;
  try {
    const { data } = yield axios.get(problemRequestURL);
    const {
      data: { data: interventions },
    } = yield axios.get(interventionsRequestURL);
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
