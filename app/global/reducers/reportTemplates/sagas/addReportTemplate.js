import { takeLatest, put, delay, call } from 'redux-saga/effects';
import axios from 'axios';
import { toast } from 'react-toastify';

import objectToSnakeCase from 'utils/objectToSnakeCase';
import { formatMessage } from 'utils/intlOutsideReact';
import { jsonApiToObject } from 'utils/jsonApiMapper';

import messages from './messages';
import {
  addReportTemplateSuccess,
  addReportTemplateFailure,
  selectReportTemplate,
} from '../actions';
import { ADD_REPORT_TEMPLATE_REQUEST } from '../constants';

// Added delay to avoid request spamming
function* addReportTemplate({ payload: { sessionId, reportTemplate } }) {
  const requestUrl = `/v1/sessions/${sessionId}/report_templates`;

  try {
    const { data } = yield axios.post(
      requestUrl,
      objectToSnakeCase({ reportTemplate }),
    );

    const mappedData = jsonApiToObject(data, 'reportTemplate');

    yield delay(1000);
    yield put(addReportTemplateSuccess(mappedData));
    yield call(toast.success, formatMessage(messages.addReportTemplateSuccess));

    yield put(selectReportTemplate(mappedData.id));
  } catch (error) {
    yield delay(1000);
    yield put(addReportTemplateFailure(error));
    yield call(toast.error, formatMessage(messages.addReportTemplateFailure));
  }
}

export default function* addReportTemplateSaga() {
  yield takeLatest(ADD_REPORT_TEMPLATE_REQUEST, addReportTemplate);
}
