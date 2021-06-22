import { takeLatest, put, select } from 'redux-saga/effects';
import axios from 'axios';

import { jsonApiToObject } from 'utils/jsonApiMapper';

import { FETCH_SINGLE_REPORT_TEMPLATE_REQUEST } from '../constants';
import {
  fetchSingleReportTemplateSuccess,
  fetchSingleReportTemplateFailure,
  selectTemplateSection,
} from '../actions';
import { makeSelectSelectedSectionTemplateId } from '../selectors';

function* fetchSingleReportTemplate({ payload: { sessionId, reportId } }) {
  const requestUrl = `/v1/sessions/${sessionId}/report_templates/${reportId}`;

  try {
    const { data } = yield axios.get(requestUrl);

    const mappedData = jsonApiToObject(data, 'reportTemplate');

    yield put(fetchSingleReportTemplateSuccess(mappedData));

    const selectedTemplateSection = yield select(
      makeSelectSelectedSectionTemplateId(),
    );

    if (!selectedTemplateSection && mappedData.sections.length)
      yield put(selectTemplateSection(mappedData.sections[0].id));
  } catch (error) {
    yield put(fetchSingleReportTemplateFailure(error));
  }
}

export default function* fetchSingleReportTemplateSaga() {
  yield takeLatest(
    FETCH_SINGLE_REPORT_TEMPLATE_REQUEST,
    fetchSingleReportTemplate,
  );
}
