import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

import { defaultMapper } from 'utils/mapResponseObjects';

import { FETCH_PROBLEM_REQUEST } from '../constants';
import { fetchProblemSuccess, fetchProblemError } from '../actions';

function* fetchProblem({ payload: { id } }) {
  const requestURL = `v1/problems/${id}`;
  try {
    const {
      data: { data },
    } = yield axios.get(requestURL);
    const mappedData = defaultMapper(data);
    yield put(fetchProblemSuccess(mappedData));
  } catch (error) {
    yield put(fetchProblemError(error));
  }
}

export default function* fetchProblemSaga() {
  yield takeLatest(FETCH_PROBLEM_REQUEST, fetchProblem);
}
