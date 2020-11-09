import axios from 'axios';
import { put, takeLatest, call } from 'redux-saga/effects';
import { toast } from 'react-toastify';
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

export function* copyProblem({
  payload: { problemId, users, withoutRedirect },
}) {
  const requestURL = `v1/problems/${problemId}/clone`;
  let params;
  if (users) params = { problem: { user_ids: users } };
  try {
    const response = yield call(axios.post, requestURL, params);
    if (!params) {
      const copiedProblem = defaultMapper(response.data.data);
      yield put(copyProblemSuccess(copiedProblem));
      if (!withoutRedirect) {
        yield put(push('/'));
      }
    } else
      yield call(toast.success, formatMessage(messages.sendSuccess), {
        toastId: COPY_PROBLEM_SUCCESS,
      });
  } catch (error) {
    yield call(toast.error, formatMessage(messages.copyError), {
      toastId: COPY_PROBLEM_ERROR,
    });
  }
}

export default function* copyProblemSaga() {
  yield takeLatest(COPY_PROBLEM_REQUEST, copyProblem);
}
