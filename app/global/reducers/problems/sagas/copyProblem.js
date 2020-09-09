import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';
import {
  error as showError,
  success as showSuccess,
} from 'react-toastify-redux';
import { formatMessage } from 'utils/intlOutsideReact';
import { push } from 'connected-react-router';

import { defaultMapper } from 'utils/mapResponseObjects';
import messages from '../messages';
import { copyProblemSuccess } from '../actions';
import {
  COPY_PROBLEM_ERROR,
  COPY_PROBLEM_REQUEST,
  COPY_PROBLEM_SUCCESS,
} from '../constants';

function* copyProblem({ payload: { problemId, users, withoutRedirect } }) {
  const requestURL = `v1/problems/${problemId}/clone`;
  let params;
  if (users) params = { problem: { user_ids: users } };
  try {
    const response = yield axios.post(requestURL, params);
    if (!params) {
      const copiedProblem = defaultMapper(response.data.data);
      yield put(copyProblemSuccess(copiedProblem));
      if (!withoutRedirect) {
        yield put(push('/'));
      }
    } else
      yield put(
        showSuccess(formatMessage(messages.sendSuccess), {
          id: COPY_PROBLEM_SUCCESS,
        }),
      );
  } catch (error) {
    yield put(
      showError(formatMessage(messages.copyError), {
        id: COPY_PROBLEM_ERROR,
      }),
    );
  }
}

export default function* copyProblemSaga() {
  yield takeLatest(COPY_PROBLEM_REQUEST, copyProblem);
}
