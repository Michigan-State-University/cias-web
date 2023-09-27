import { takeEvery, put, call } from 'redux-saga/effects';
import axios from 'axios';

import { toast } from 'react-toastify';
import { formatMessage } from 'utils/intlOutsideReact';
import {
  deleteReportTemplateLogoSuccess,
  deleteReportTemplateLogoFailure,
} from '../actions';
import { DELETE_REPORT_TEMPLATE_LOGO_REQUEST } from '../constants';
import messages from './messages';

function* deleteReportLogoTemplate({
  payload: { sessionId, reportTemplateId },
}) {
  const requestUrl = `/v1/sessions/${sessionId}/report_templates/${reportTemplateId}/remove_logo`;
  try {
    yield axios.delete(requestUrl);

    yield put(deleteReportTemplateLogoSuccess());
  } catch (error) {
    yield put(deleteReportTemplateLogoFailure(error));
    yield call(
      toast.error,
      formatMessage(messages.deleteReportTemplateLogoFailure),
    );
  }
}

export default function* deleteReportTemplateLogoSaga() {
  yield takeEvery(
    DELETE_REPORT_TEMPLATE_LOGO_REQUEST,
    deleteReportLogoTemplate,
  );
}
