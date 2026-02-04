import axios from 'axios';
import { call, put, takeEvery } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

import { formatMessage } from 'utils/intlOutsideReact';

import {
  exportInterventionRequest,
  exportInterventionSuccess,
  exportInterventionError,
} from '../actions';
import messages from '../messages';
import {
  EXPORT_INTERVENTION_REQUEST,
  EXPORT_INTERVENTION_ERROR,
} from '../constants';

dayjs.extend(utc);
dayjs.extend(timezone);

function* exportIntervention({
  payload: {
    interventionId,
    onSuccess,
    startDate,
    endDate,
    timezone: selectedTimezone,
  },
}: ReturnType<typeof exportInterventionRequest>) {
  let url = `v1/interventions/${interventionId}/export`;

  const params = new URLSearchParams();
  if (startDate) {
    const formattedStartDate = selectedTimezone
      ? dayjs(startDate)
          .tz(selectedTimezone, true)
          .format('YYYY-MM-DDTHH:mm:ss')
      : dayjs(startDate).format('YYYY-MM-DDTHH:mm:ss');
    params.append('start_datetime', formattedStartDate);
  }
  if (endDate) {
    const formattedEndDate = selectedTimezone
      ? dayjs(endDate).tz(selectedTimezone, true).format('YYYY-MM-DDTHH:mm:ss')
      : dayjs(endDate).format('YYYY-MM-DDTHH:mm:ss');
    params.append('end_datetime', formattedEndDate);
  }
  if (selectedTimezone) {
    params.append('timezone', selectedTimezone);
  }

  const queryString = params.toString();
  if (queryString) {
    url = `${url}?${queryString}`;
  }

  try {
    yield call(axios.post, url);
    yield put(exportInterventionSuccess());
    onSuccess();
  } catch (error) {
    yield put(exportInterventionError(error));
    yield call(toast.error, formatMessage(messages.exportInterventionError), {
      toastId: EXPORT_INTERVENTION_ERROR,
    });
  }
}

function* exportInterventionSaga() {
  yield takeEvery(EXPORT_INTERVENTION_REQUEST, exportIntervention);
}

export const withExportInterventionSaga = {
  key: 'exportInterventionSaga',
  saga: exportInterventionSaga,
};
