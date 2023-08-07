import { takeLatest, put, call, delay } from 'redux-saga/effects';
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

// Added delay to avoid request spamming
function* deleteCoverLetterCustomLogo({
  payload: { sessionId, reportTemplateId },
}: ReturnType<typeof deleteCoverLetterCustomLogoRequest>) {
  const requestUrl = `/v1/sessions/${sessionId}/report_templates/${reportTemplateId}/remove_cover_letter_custom_logo`;
  try {
    yield axios.delete(requestUrl);

    yield delay(1000);
    yield put(deleteCoverLetterCustomLogoSuccess());
  } catch (error) {
    yield delay(1000);
    yield put(deleteCoverLetterCustomLogoFailure(error));
    yield call(
      toast.error,
      formatMessage(messages.deleteCoverLetterCustomLogoFailure),
    );
  }
}

export default function* deleteCoverLetterCustomLogoSaga() {
  yield takeLatest(
    DELETE_COVER_LETTER_CUSTOM_LOGO_REQUEST,
    deleteCoverLetterCustomLogo,
  );
}
