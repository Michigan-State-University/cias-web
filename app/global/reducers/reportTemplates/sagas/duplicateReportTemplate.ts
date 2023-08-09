import { takeLatest, put, call } from 'redux-saga/effects';
import axios from 'axios';
import { toast } from 'react-toastify';

import objectToSnakeCase from 'utils/objectToSnakeCase';
import { formatMessage } from 'utils/intlOutsideReact';
import { jsonApiToObject } from 'utils/jsonApiMapper';

import messages from './messages';
import {
  duplicateReportTemplateRequest,
  duplicateReportTemplateSuccess,
  selectReportTemplate,
} from '../actions';
import { DUPLICATE_REPORT_TEMPLATE_REQUEST } from '../constants';

function* duplicateReportTemplate({
  payload: { sessionId, reportTemplateId, targetSessionId },
}: ReturnType<typeof duplicateReportTemplateRequest>) {
  const requestUrl = `/v1/sessions/${sessionId}/report_templates/${reportTemplateId}/duplicate`;

  const requestData = targetSessionId
    ? objectToSnakeCase({
        reportTemplate: {
          sessionId: targetSessionId,
        },
      })
    : undefined;

  try {
    const { data } = yield axios.post(requestUrl, requestData);
    const reportTemplate = jsonApiToObject(data, 'reportTemplate');

    yield put(duplicateReportTemplateSuccess(reportTemplate));
    yield call(
      toast.success,
      formatMessage(messages.duplicateReportTemplateSuccess),
    );

    if (!targetSessionId) {
      yield put(selectReportTemplate(reportTemplate.id));
    }
  } catch {
    yield put(duplicateReportTemplateSuccess());
    yield call(
      toast.error,
      formatMessage(messages.duplicateReportTemplateFailure),
    );
  }
}

export default function* duplicateReportTemplateSaga() {
  yield takeLatest(DUPLICATE_REPORT_TEMPLATE_REQUEST, duplicateReportTemplate);
}
