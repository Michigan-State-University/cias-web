import axios from 'axios';
import { put, takeLatest, call } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import { formatMessage } from 'utils/intlOutsideReact';

import messages from '../messages';
import { externalCopySessionError } from '../actions';
import {
  EXTERNAL_COPY_SESSION_ERROR,
  EXTERNAL_COPY_SESSION_REQUEST,
  EXTERNAL_COPY_SESSION_SUCCESS,
} from '../constants';

export function* externalCopySession({
  payload: { sessionId, interventionId, currentInterventionId },
}) {
  const requestURL = `v1/interventions/${currentInterventionId}/sessions/${sessionId}/duplicate`;
  const params = { new_intervention_id: interventionId };
  try {
    yield call(axios.post, requestURL, params);

    yield call(toast.info, formatMessage(messages.copySuccess), {
      toastId: EXTERNAL_COPY_SESSION_SUCCESS,
    });
  } catch (error) {
    yield put(externalCopySessionError(error));
    yield call(toast.error, formatMessage(messages.copyError), {
      toastId: EXTERNAL_COPY_SESSION_ERROR,
    });
  }
}

export default function* externalCopySessionSaga() {
  yield takeLatest(EXTERNAL_COPY_SESSION_REQUEST, externalCopySession);
}
