import { takeLatest, put, call } from 'redux-saga/effects';
import axios from 'axios';
import { toast } from 'react-toastify';

import { formatMessage } from 'utils/intlOutsideReact';

import {
  RESET_AUDIO_ERROR,
  RESET_AUDIO_REQUEST,
  RESET_AUDIO_SUCCESS,
} from '../constants';
import { resetAudioError, resetAudioSuccess } from '../actions';
import messages from './messages';

function* resetAudio() {
  try {
    yield axios.post(`/v1/recreate_audio`);

    yield put(resetAudioSuccess());
    yield call(toast.success, formatMessage(messages.resetAudioSuccess), {
      toastId: RESET_AUDIO_SUCCESS,
    });
  } catch (error) {
    yield put(resetAudioError(error));
    yield call(toast.error, error, {
      toastId: RESET_AUDIO_ERROR,
    });
  }
}

export default function* resetAudioSaga() {
  yield takeLatest(RESET_AUDIO_REQUEST, resetAudio);
}
