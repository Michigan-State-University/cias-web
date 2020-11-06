import axios from 'axios';
import { put, takeLatest, call } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import get from 'lodash/get';

import { SEND_PROBLEM_CSV_REQUEST } from 'global/reducers/problem/constants';
import { formatMessage } from 'utils/intlOutsideReact';

import { sendProblemCsvSuccess, sendProblemCsvError } from '../actions';
import messages from '../messages';

export function* sendProblemCsv({ payload: { id } }) {
  const requestURL = `v1/problems/${id}/answers.csv`;
  try {
    const {
      data: { message },
    } = yield call(axios.get, requestURL);
    yield put(sendProblemCsvSuccess(message));
    yield call(toast.info, message);
  } catch (error) {
    yield put(sendProblemCsvError(error));
    yield call(
      toast.error,
      get(error, 'data.message', formatMessage(messages.csvError)),
    );
  }
}

export default function* sendProblemCsvSaga() {
  yield takeLatest(SEND_PROBLEM_CSV_REQUEST, sendProblemCsv);
}
