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

export function* sendInterventionCsv({ payload: { id, onSuccess } }) {
  const requestURL = `v1/interventions/${id}/answers.csv`;
  try {
    const {
      data: { message },
    } = yield call(axios.get, requestURL);
    yield put(sendInterventionCsvSuccess(message));
    yield call(toast.info, message);
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
