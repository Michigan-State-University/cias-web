import axios from 'axios';
import { put, takeLatest, call } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import get from 'lodash/get';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

import { SEND_INTERVENTION_CSV_REQUEST } from 'global/reducers/intervention/constants';
import { formatMessage } from 'utils/intlOutsideReact';

import {
  sendInterventionCsvSuccess,
  sendInterventionCsvError,
} from '../actions';
import messages from '../messages';

dayjs.extend(utc);
dayjs.extend(timezone);

export function* sendInterventionCsv({
  payload: { id, onSuccess, startDate, endDate, timezone: selectedTimezone },
}) {
  let requestURL = `v1/interventions/${id}/answers.csv`;

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
    requestURL = `${requestURL}?${queryString}`;
  }

  try {
    const {
      data: { message },
    } = yield call(axios.get, requestURL);
    yield put(sendInterventionCsvSuccess(message));
    onSuccess();
  } catch (error) {
    yield put(sendInterventionCsvError(error));
    yield call(
      toast.error,
      get(error, 'data.message', formatMessage(messages.csvError)),
    );
  }
}

export default function* sendInterventionCsvSaga() {
  yield takeLatest(SEND_INTERVENTION_CSV_REQUEST, sendInterventionCsv);
}
