import { takeLatest, put, call } from 'redux-saga/effects';
import axios from 'axios';
import toast from 'react-toastify';

import {
  PHONETIC_PREVIEW_REQUEST,
  PHONETIC_PREVIEW_FAILURE,
} from '../constants';
import { phoneticPreviewSuccess } from '../actions';
function* phoneticPreviewAsync({ payload: { text, options } }) {
  try {
    const {
      data: { url: mp3Url },
    } = yield axios.post(`/v1/phonetic_preview`, {
      audio: { ...options, text },
    });
    yield put(phoneticPreviewSuccess(`${process.env.API_URL}${mp3Url}`));
  } catch (error) {
    yield call(toast.error, error, {
      toastId: PHONETIC_PREVIEW_FAILURE,
    });
  }
}

// Individual exports for testing
export default function* AnswerSessionPageSaga() {
  yield takeLatest(PHONETIC_PREVIEW_REQUEST, phoneticPreviewAsync);
}
