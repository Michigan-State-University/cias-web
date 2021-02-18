import { takeLatest, put, select } from 'redux-saga/effects';
import axios from 'axios';

import { ReportTemplateBuilder } from 'models/ReportTemplate/ReportTemplateBuilder';
import { makeSelectSelectedReportId } from '../selectors';
import { FETCH_REPORT_TEMPLATES_REQUEST } from '../constants';
import {
  fetchReportTemplatesSuccess,
  fetchReportTemplatesFailure,
  selectReportTemplate,
} from '../actions';

function* fetchReportTemplates({ payload: { sessionId } }) {
  const requestUrl = `/v1/sessions/${sessionId}/report_templates`;

  try {
    const {
      data: { data },
    } = yield axios.get(requestUrl);

    const mappedData = data.map(item =>
      new ReportTemplateBuilder().fromJson(item).build(),
    );

    yield put(fetchReportTemplatesSuccess(mappedData));

    const selectedReport = yield select(makeSelectSelectedReportId());

    if (!selectedReport && mappedData.length)
      yield put(selectReportTemplate(mappedData[0].id));
  } catch (error) {
    yield put(fetchReportTemplatesFailure(error));
  }
}

export default function* fetchReportTemplatesSaga() {
  yield takeLatest(FETCH_REPORT_TEMPLATES_REQUEST, fetchReportTemplates);
}
