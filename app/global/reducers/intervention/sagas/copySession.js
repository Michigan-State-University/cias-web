import axios from 'axios';
import { put, takeLatest, call } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import { formatMessage } from 'utils/intlOutsideReact';

import messages from '../messages';
import { copySessionSuccess } from '../actions';
import { COPY_SESSION_ERROR, COPY_SESSION_REQUEST } from '../constants';

export function* copySession({ payload: { sessionId } }) {
  const requestURL = `v1/sessions/${sessionId}/clone`;

  try {
    const response = yield call(axios.post, requestURL);

    const copiedInterventions = response.data.data;

    yield put(copySessionSuccess(copiedInterventions));
  } catch (error) {
    yield call(toast.error, formatMessage(messages.copyError), {
      toastId: COPY_SESSION_ERROR,
    });
  }
}

export default function* copySessionSaga() {
  yield takeLatest(COPY_SESSION_REQUEST, copySession);
}
