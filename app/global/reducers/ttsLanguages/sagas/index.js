import { all } from 'redux-saga/effects';
import getLanguagesSaga from './getLanguages';
import getLanguageVoicesSaga from './getLanguageVoices';

export { getLanguagesSaga };

export default function* allLanguagesSagas() {
  yield all([getLanguagesSaga(), getLanguageVoicesSaga()]);
}
