import { takeLatest, put, call } from 'redux-saga/effects';
import axios from 'axios';

import { toast } from 'react-toastify';
import { formatMessage } from 'utils/intlOutsideReact';
import messages from 'global/reducers/reportTemplates/sagas/messages';
import {
  generateTestReportSuccess,
  generateTestReportFailure,
} from '../actions';
import { GENERATE_TEST_REPORT_REQUEST } from '../constants';

function* generateTestReport({ payload: { reportId } }) {
  const requestUrl = `/v1/report_templates/${reportId}/generate_pdf_preview`;

  try {
    yield axios.post(requestUrl);

    yield put(generateTestReportSuccess());
    yield call(
      toast.success,
      formatMessage(messages.generateTestReportSuccess),
    );
  } catch (error) {
    yield put(generateTestReportFailure(error));
    yield call(toast.error, formatMessage(messages.generateTestReportFailure));
  }
}

export default function* generateTestReportSaga() {
  yield takeLatest(GENERATE_TEST_REPORT_REQUEST, generateTestReport);
}
