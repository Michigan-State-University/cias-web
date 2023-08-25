import { takeEvery, put } from 'redux-saga/effects';
import axios from 'axios';

import { jsonApiToObject } from 'utils/jsonApiMapper';

import {
  uploadCoverLetterCustomLogoRequest,
  uploadCoverLetterCustomLogoSuccess,
  uploadCoverLetterCustomLogoFailure,
  updateReportTemplateSuccess,
} from '../actions';
import { UPLOAD_COVER_LETTER_CUSTOM_LOGO_REQUEST } from '../constants';

function* updateCoverLetterCustomLogo({
  payload: { sessionId, reportTemplateId, imageData },
}: ReturnType<typeof uploadCoverLetterCustomLogoRequest>) {
  const requestUrl = `/v1/sessions/${sessionId}/report_templates/${reportTemplateId}`;

  try {
    const formData = new FormData();
    formData.append(`report_template[cover_letter_custom_logo]`, imageData);

    const { data } = yield axios.put(requestUrl, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    const mappedData = jsonApiToObject(data, 'reportTemplate');
    yield put(uploadCoverLetterCustomLogoSuccess());
    yield put(updateReportTemplateSuccess(mappedData));
  } catch (error) {
    yield put(uploadCoverLetterCustomLogoFailure(error));
  }
}

export default function* uploadCoverLetterCustomLogoSaga() {
  yield takeEvery(
    UPLOAD_COVER_LETTER_CUSTOM_LOGO_REQUEST,
    updateCoverLetterCustomLogo,
  );
}
