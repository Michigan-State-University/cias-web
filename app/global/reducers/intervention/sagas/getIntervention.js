import { put, select, takeLatest, call } from 'redux-saga/effects';
import axios from 'axios';

import { defaultMapper } from 'utils/mapResponseObjects';
import isNullOrUndefined from 'utils/isNullOrUndefined';

import {
  fetchProblemRequest,
  makeSelectProblem,
} from 'global/reducers/problem';
import { GET_INTERVENTION_REQUEST } from '../constants';
import { getInterventionSuccess, getInterventionError } from '../actions';

export function* getIntervention({ payload: { interventionId, problemId } }) {
  const problem = yield select(makeSelectProblem());

  if (isNullOrUndefined(problem) || problem.id !== problemId)
    yield put(fetchProblemRequest(problemId));

  const requestURL = `v1/problems/${problemId}/interventions/${interventionId}`;

  try {
    const {
      data: { data },
    } = yield call(axios.get, requestURL);

    yield put(getInterventionSuccess(defaultMapper(data)));
  } catch (error) {
    yield put(getInterventionError(error));
  }
}

export default function* getInterventionSaga() {
  yield takeLatest(GET_INTERVENTION_REQUEST, getIntervention);
}
