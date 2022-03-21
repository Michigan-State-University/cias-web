import axios from 'axios';
import { takeLatest, call } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import { formatMessage } from 'utils/intlOutsideReact';

import messages from '../messages';
import {
  COPY_SESSION_ERROR,
  COPY_SESSION_REQUEST,
  COPY_SESSION_SUCCESS,
} from '../constants';

export function* copySession({ payload: { sessionId } }) {
  const requestURL = `v1/sessions/${sessionId}/clone`;

  try {
    yield call(axios.post, requestURL);
    yield call(toast.info, formatMessage(messages.copySuccess), {
      toastId: COPY_SESSION_SUCCESS,
    });
  } catch (error) {
    yield call(toast.error, formatMessage(messages.copyError), {
      toastId: COPY_SESSION_ERROR,
    });
  }
}

export default function* copySessionSaga() {
  yield takeLatest(COPY_SESSION_REQUEST, copySession);
}
