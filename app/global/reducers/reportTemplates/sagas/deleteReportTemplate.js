import { takeLatest, put, call } from 'redux-saga/effects';
import axios from 'axios';

import { toast } from 'react-toastify';
import { formatMessage } from 'utils/intlOutsideReact';
import {
  deleteReportTemplateSuccess,
  deleteReportTemplateFailure,
} from '../actions';
import { DELETE_REPORT_TEMPLATE_REQUEST } from '../constants';
import messages from './messages';

function* deleteReportTemplate({ payload: { sessionId, id } }) {
  const requestUrl = `/v1/sessions/${sessionId}/report_templates/${id}`;

  try {
    yield axios.delete(requestUrl);

    yield put(deleteReportTemplateSuccess());
    yield call(
      toast.success,
      formatMessage(messages.deleteReportTemplateSuccess),
    );
  } catch (error) {
    yield put(deleteReportTemplateFailure(error));
    yield call(
      toast.error,
      formatMessage(messages.deleteReportTemplateFailure),
    );
  }
}

export default function* deleteReportTemplateSaga() {
  yield takeLatest(DELETE_REPORT_TEMPLATE_REQUEST, deleteReportTemplate);
}
