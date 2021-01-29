import axios from 'axios';
import { put, takeLatest, call } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import { formatMessage } from 'utils/intlOutsideReact';

import messages from '../messages';
import { deleteSessionError, deleteSessionSuccess } from '../actions';
import {
  DELETE_SESSION_ERROR,
  DELETE_SESSION_REQUEST,
  DELETE_SESSION_SUCCESS,
} from '../constants';

export function* deleteSession({ payload: { sessionId, interventionId } }) {
  const requestURL = `v1/interventions/${interventionId}/sessions/${sessionId}`;

  try {
    yield call(axios.delete, requestURL);

    yield put(deleteSessionSuccess());
    yield call(toast.success, formatMessage(messages.deleteSessionSuccess), {
      toastId: DELETE_SESSION_SUCCESS,
    });
  } catch (error) {
    yield call(toast.error, formatMessage(messages.deleteSessionError), {
      toastId: DELETE_SESSION_ERROR,
    });
    yield put(deleteSessionError());
  }
}

export default function* deleteSessionSaga() {
  yield takeLatest(DELETE_SESSION_REQUEST, deleteSession);
}
