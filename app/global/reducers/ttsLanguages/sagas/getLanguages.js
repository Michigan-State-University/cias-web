import { put, takeLatest, call } from 'redux-saga/effects';
import axios from 'axios';

import { FETCH_LANGUAGES_REQUEST } from '../constants';
import { fetchLanguagesError, fetchLanguagesSuccess } from '../actions';

export function* getLanguages() {
  const requestURL = `v1/languages`;

  try {
    const {
      data: { data },
    } = yield call(axios.get, requestURL);
    const mappedData = data.map(
      ({ id, attributes: { language_name: languageName } }) => ({
        value: +id,
        label: languageName,
      }),
    );

    yield put(fetchLanguagesSuccess(mappedData));
  } catch (error) {
    yield put(fetchLanguagesError(error));
  }
}

export default function* getLanguagesSaga() {
  yield takeLatest(FETCH_LANGUAGES_REQUEST, getLanguages);
}
