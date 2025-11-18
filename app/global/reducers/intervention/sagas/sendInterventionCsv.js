import axios from 'axios';
import { put, takeLatest, call } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import get from 'lodash/get';

import { SEND_INTERVENTION_CSV_REQUEST } from 'global/reducers/intervention/constants';
import { formatMessage } from 'utils/intlOutsideReact';

import {
  sendInterventionCsvSuccess,
  sendInterventionCsvError,
} from '../actions';
import messages from '../messages';

export function* sendInterventionCsv({
  payload: { id, onSuccess, startDate, endDate, timezone },
}) {
  let requestURL = `v1/interventions/${id}/answers.csv`;

  // Add query parameters for date range and timezone if provided
  const params = new URLSearchParams();
  if (startDate) {
    params.append('start_datetime', startDate.toISOString());
  }
  if (endDate) {
    params.append('end_datetime', endDate.toISOString());
  }
  if (timezone) {
    params.append('timezone', timezone);
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
