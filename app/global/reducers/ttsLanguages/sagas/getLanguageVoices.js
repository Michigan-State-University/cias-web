import { put, takeLatest, call } from 'redux-saga/effects';
import axios from 'axios';

import { FETCH_LANGUAGE_VOICES_REQUEST } from '../constants';
import { fetchLanguageVoiceError, fetchLanguageVoiceSuccess } from '../actions';

export function* getLanguageVoices({ payload: { id: languageId } }) {
  const requestURL = `v1/languages/${languageId}/voices`;

  try {
    const {
      data: { data },
    } = yield call(axios.get, requestURL);
    const mappedData = data.map(
      ({ id, attributes: { voice_label: voiceLabel } }) => ({
        value: +id,
        label: voiceLabel,
      }),
    );

    yield put(fetchLanguageVoiceSuccess(languageId, mappedData));
  } catch (error) {
    yield put(fetchLanguageVoiceError(languageId, error));
  }
}

export default function* getLanguageVoicesSaga() {
  yield takeLatest(FETCH_LANGUAGE_VOICES_REQUEST, getLanguageVoices);
}
