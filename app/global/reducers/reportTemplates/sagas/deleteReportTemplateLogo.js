import { takeLatest, put, call, delay } from 'redux-saga/effects';
import axios from 'axios';

import { toast } from 'react-toastify';
import { formatMessage } from 'utils/intlOutsideReact';
import {
  deleteReportTemplateLogoSuccess,
  deleteReportTemplateLogoFailure,
} from '../actions';
import { DELETE_REPORT_TEMPLATE_LOGO_REQUEST } from '../constants';
import messages from './messages';

// Added delay to avoid request spamming
function* deleteReportLogoTemplate({ payload: { sessionId, id } }) {
  const requestUrl = `/v1/sessions/${sessionId}/report_templates/${id}/remove_logo`;
  try {
    yield axios.delete(requestUrl);

    yield delay(1000);
    yield put(deleteReportTemplateLogoSuccess());
  } catch (error) {
    yield delay(1000);
    yield put(deleteReportTemplateLogoFailure(error));
    yield call(
      toast.error,
      formatMessage(messages.deleteReportTemplateLogoFailure),
    );
  }
}

export default function* deleteReportTemplateLogoSaga() {
  yield takeLatest(
    DELETE_REPORT_TEMPLATE_LOGO_REQUEST,
    deleteReportLogoTemplate,
  );
}
