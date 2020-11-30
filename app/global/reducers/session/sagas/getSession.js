import { put, select, takeLatest, call } from 'redux-saga/effects';
import axios from 'axios';

import { defaultMapper } from 'utils/mapResponseObjects';
import isNullOrUndefined from 'utils/isNullOrUndefined';

import {
  fetchProblemRequest,
  makeSelectProblem,
} from 'global/reducers/intervention';
import { GET_SESSION_REQUEST } from '../constants';
import { getSessionSuccess, getSessionError } from '../actions';

export function* getSession({ payload: { sessionId, interventionId } }) {
  const problem = yield select(makeSelectProblem());

  if (isNullOrUndefined(problem) || problem.id !== interventionId)
    yield put(fetchProblemRequest(interventionId));

  const requestURL = `v1/interventions/${interventionId}/sessions/${sessionId}`;

  try {
    const {
      data: { data },
    } = yield call(axios.get, requestURL);

    yield put(getSessionSuccess(defaultMapper(data)));
  } catch (error) {
    yield put(getSessionError(error));
  }
}

export default function* getSessionSaga() {
  yield takeLatest(GET_SESSION_REQUEST, getSession);
}
