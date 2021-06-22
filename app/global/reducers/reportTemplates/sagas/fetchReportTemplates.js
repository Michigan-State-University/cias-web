import { takeLatest, put, select } from 'redux-saga/effects';
import axios from 'axios';

import { jsonApiToArray } from 'utils/jsonApiMapper';

import { makeSelectSelectedReport } from '../selectors';
import { FETCH_REPORT_TEMPLATES_REQUEST } from '../constants';
import {
  fetchReportTemplatesSuccess,
  fetchReportTemplatesFailure,
  selectReportTemplate,
} from '../actions';

function* fetchReportTemplates({ payload: { sessionId } }) {
  const requestUrl = `/v1/sessions/${sessionId}/report_templates`;

  try {
    const { data } = yield axios.get(requestUrl);

    const mappedData = jsonApiToArray(data, 'reportTemplate');

    yield put(fetchReportTemplatesSuccess(mappedData));

    const selectedReport = yield select(makeSelectSelectedReport());

    if (!selectedReport || selectedReport?.sessionId !== sessionId)
      yield put(selectReportTemplate(mappedData[mappedData?.length - 1]?.id));
  } catch (error) {
    yield put(fetchReportTemplatesFailure(error));
  }
}

export default function* fetchReportTemplatesSaga() {
  yield takeLatest(FETCH_REPORT_TEMPLATES_REQUEST, fetchReportTemplates);
}
