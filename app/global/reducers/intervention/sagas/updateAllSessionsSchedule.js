import axios from 'axios';
import { put, takeLatest, call } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import { UPDATE_ALL_SESSIONS_SCHEDULE_REQUEST } from '../constants';
import {
  updateAllSessionsScheduleSuccess,
  updateAllSessionsScheduleError,
  fetchInterventionRequest,
} from '../actions';

export function* updateAllSessionsSchedule({
  payload: {
    interventionId,
    schedule,
    schedulePayload = null,
    scheduleAt = null,
  },
}) {
  const requestURL = `v1/interventions/${interventionId}/sessions/update_all_schedules`;

  try {
    yield call(axios.patch, requestURL, {
      schedule,
      schedule_payload: schedulePayload,
      schedule_at: scheduleAt,
    });

    yield put(updateAllSessionsScheduleSuccess());

    yield put(fetchInterventionRequest(interventionId));
  } catch (error) {
    yield call(toast.error, 'Failed to update session schedules', {
      toastId: 'UPDATE_ALL_SESSIONS_SCHEDULE_ERROR',
    });
    yield put(updateAllSessionsScheduleError(error));
  }
}

export default function* updateAllSessionsScheduleSaga() {
  yield takeLatest(
    UPDATE_ALL_SESSIONS_SCHEDULE_REQUEST,
    updateAllSessionsSchedule,
  );
}
