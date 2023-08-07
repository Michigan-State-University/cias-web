import { takeEvery, put, call } from 'redux-saga/effects';
import axios from 'axios';

import { toast } from 'react-toastify';
import { formatMessage } from 'utils/intlOutsideReact';
import {
  deleteCoverLetterCustomLogoFailure,
  deleteCoverLetterCustomLogoRequest,
  deleteCoverLetterCustomLogoSuccess,
} from '../actions';
import { DELETE_COVER_LETTER_CUSTOM_LOGO_REQUEST } from '../constants';
import messages from './messages';

function* deleteCoverLetterCustomLogo({
  payload: { sessionId, reportTemplateId },
}: ReturnType<typeof deleteCoverLetterCustomLogoRequest>) {
  const requestUrl = `/v1/sessions/${sessionId}/report_templates/${reportTemplateId}/remove_cover_letter_custom_logo`;
  try {
    yield axios.delete(requestUrl);

    yield put(deleteCoverLetterCustomLogoSuccess());
  } catch (error) {
    yield put(deleteCoverLetterCustomLogoFailure(error));
    yield call(
      toast.error,
      formatMessage(messages.deleteCoverLetterCustomLogoFailure),
    );
  }
}

export default function* deleteCoverLetterCustomLogoSaga() {
  yield takeEvery(
    DELETE_COVER_LETTER_CUSTOM_LOGO_REQUEST,
    deleteCoverLetterCustomLogo,
  );
}
