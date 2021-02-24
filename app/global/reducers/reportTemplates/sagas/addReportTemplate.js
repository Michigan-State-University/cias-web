import { takeLatest, put, delay, call } from 'redux-saga/effects';
import axios from 'axios';

import objectToSnakeCase from 'utils/objectToSnakeCase';
import { toast } from 'react-toastify';
import { formatMessage } from 'utils/intlOutsideReact';

import { mapJsonApiToObject } from 'utils/jsonApiMapper';
import { ReportTemplate } from 'models/ReportTemplate';
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

    const mappedData = mapJsonApiToObject(data, 'reportTemplate', {
      isSingleObject: true,
    });

    yield delay(1000);
    yield put(addReportTemplateSuccess(new ReportTemplate({ ...mappedData })));
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
