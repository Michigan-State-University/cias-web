import axios from 'axios';
import get from 'lodash/get';

import { put, takeLatest, call } from 'redux-saga/effects';
import { formatMessage } from 'utils/intlOutsideReact';

import { fetchProblemsSuccess, fetchProblemsError } from '../actions';
import { FETCH_PROBLEMS_REQUEST } from '../constants';

import messages from '../messages';

export function* fetchProblems() {
  const requestURL = `v1/problems`;

  try {
    const {
      data: { problems },
    } = yield call(axios.get, requestURL);

    yield put(fetchProblemsSuccess(problems));
  } catch (error) {
    yield put(
      fetchProblemsError(
        get(error, 'message', formatMessage(messages.defaultError)),
      ),
    );
  }
}
export default function* fetchProblemsSaga() {
  yield takeLatest(FETCH_PROBLEMS_REQUEST, fetchProblems);
}
