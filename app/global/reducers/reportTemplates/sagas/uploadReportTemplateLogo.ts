import { takeEvery, put } from 'redux-saga/effects';
import axios from 'axios';

import { jsonApiToObject } from 'utils/jsonApiMapper';

import {
  uploadReportTemplateLogoRequest,
  uploadReportTemplateLogoSuccess,
  uploadReportTemplateLogoFailure,
  updateReportTemplateSuccess,
} from '../actions';
import { UPLOAD_REPORT_TEMPLATE_LOGO_REQUEST } from '../constants';

function* uploadReportTemplateLogo({
  payload: { sessionId, reportTemplateId, imageData },
}: ReturnType<typeof uploadReportTemplateLogoRequest>) {
  const requestUrl = `/v1/sessions/${sessionId}/report_templates/${reportTemplateId}`;

  try {
    const formData = new FormData();
    formData.append(`report_template[logo]`, imageData);

    const { data } = yield axios.put(requestUrl, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    const mappedData = jsonApiToObject(data, 'reportTemplate');
    yield put(uploadReportTemplateLogoSuccess());
    yield put(updateReportTemplateSuccess(mappedData));
  } catch (error) {
    yield put(uploadReportTemplateLogoFailure(error));
  }
}

export default function* uploadReportTemplateLogoSaga() {
  yield takeEvery(
    UPLOAD_REPORT_TEMPLATE_LOGO_REQUEST,
    uploadReportTemplateLogo,
  );
}
