import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';
import { info as showInfo, error as showError } from 'react-toastify-redux';
import get from 'lodash/get';

import { SEND_PROBLEM_CSV_REQUEST } from 'global/reducers/problem/constants';
import { formatMessage } from 'utils/intlOutsideReact';

import { sendProblemCsvSuccess, sendProblemCsvError } from '../actions';
import messages from '../messages';

function* sendProblemCsv({ payload: { id } }) {
  const requestURL = `v1/problems/${id}/answers.csv`;
  try {
    const {
      data: { message },
    } = yield axios.get(requestURL);
    yield put(sendProblemCsvSuccess(message));
    yield put(showInfo(message));
  } catch (error) {
    yield put(sendProblemCsvError(error));
    yield put(
      showError(get(error, 'data.message', formatMessage(messages.csvError))),
    );
  }
}

export default function* sendProblemCsvSaga() {
  yield takeLatest(SEND_PROBLEM_CSV_REQUEST, sendProblemCsv);
}
