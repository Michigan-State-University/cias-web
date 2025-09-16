import axios from 'axios';
import { put, takeLatest, call } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import { BULK_UPDATE_SESSIONS_REQUEST } from '../constants';
import {
  bulkUpdateSessionsSuccess,
  bulkUpdateSessionsError,
  fetchInterventionRequest,
} from '../actions';

export function* bulkUpdateSessions({ payload: { interventionId, sessions } }) {
  const requestURL = `v1/interventions/${interventionId}/sessions/bulk_update`;

  try {
    yield call(axios.patch, requestURL, { sessions });

    yield put(bulkUpdateSessionsSuccess());

    yield put(fetchInterventionRequest(interventionId));
  } catch (error) {
    yield call(toast.error, 'Failed to update sessions', {
      toastId: 'BULK_UPDATE_SESSIONS_ERROR',
    });
    yield put(bulkUpdateSessionsError(error));
  }
}

export default function* bulkUpdateSessionsSaga() {
  yield takeLatest(BULK_UPDATE_SESSIONS_REQUEST, bulkUpdateSessions);
}
