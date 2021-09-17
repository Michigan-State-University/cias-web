import axios from 'axios';
import { put, call, takeLatest } from 'redux-saga/effects';

import { jsonApiToArray } from 'utils/jsonApiMapper';

import { FETCH_ANSWERS_REQUEST } from '../constants';
import {
  fetchAnswersError,
  fetchAnswersRequest,
  fetchAnswersSuccess,
} from '../actions';

export function* fetchAnswers({
  payload: { userSessionId },
}: ReturnType<typeof fetchAnswersRequest>) {
  const url = `/v1/user_sessions/${userSessionId}/answers`;
  try {
    const { data } = yield call(axios.get, url);
    const answers = jsonApiToArray(data, 'answer');
    yield put(fetchAnswersSuccess(answers));
  } catch (error) {
    yield put(fetchAnswersError(error));
  }
}

export default function* fetchAnswersSaga() {
  yield takeLatest(FETCH_ANSWERS_REQUEST, fetchAnswers);
}
