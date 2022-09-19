import { put, takeLatest, call } from 'redux-saga/effects';
import axios from 'axios';

import { MARK_REPORT_DOWNLOADED_REQUEST } from '../constants';
import {
  markReportDownloadedSuccess,
  markReportDownloadedError,
} from '../actions';

export function* markReportDownloaded({ payload: { reportId } }) {
  try {
    const requestUrl = '/v1/downloaded_reports';
    const params = {
      report_id: reportId,
    };
    yield call(axios.post, requestUrl, undefined, { params });
    yield put(markReportDownloadedSuccess(reportId));
  } catch (error) {
    yield put(markReportDownloadedError(error));
  }
}

export default function* markReportDownloadedSaga() {
  yield takeLatest(MARK_REPORT_DOWNLOADED_REQUEST, markReportDownloaded);
}
