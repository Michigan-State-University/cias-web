import { takeEvery, put, call } from 'redux-saga/effects';
import axios from 'axios';
import { toast } from 'react-toastify';

import objectToSnakeCase from 'utils/objectToSnakeCase';
import { jsonApiToObject } from 'utils/jsonApiMapper';
import { formatApiErrorMessage } from 'utils/formatApiErrorMessage';

import { UPDATE_REPORT_TEMPLATE_REQUEST } from '../constants';
import {
  updateReportTemplateSuccess,
  updateReportTemplateFailure,
} from '../actions';
import messages from './messages';

function* updateReportTemplate({ payload: { sessionId, reportTemplate } }) {
  const requestUrl = `/v1/sessions/${sessionId}/report_templates/${reportTemplate.id}`;

  try {
    const { data } = yield axios.put(
      requestUrl,
      objectToSnakeCase({
        reportTemplate,
      }),
    );

    const mappedData = jsonApiToObject(data, 'reportTemplate');
    yield put(updateReportTemplateSuccess(mappedData));
  } catch (error) {
    yield call(
      toast.error,
      formatApiErrorMessage(error, messages.updateReportTemplateFailure),
    );
    yield put(updateReportTemplateFailure(error));
  }
}

export default function* updateReportTemplateSaga() {
  yield takeEvery(UPDATE_REPORT_TEMPLATE_REQUEST, updateReportTemplate);
}
