import { all } from 'redux-saga/effects';
import resetAudioSaga from './resetAudio';

export { resetAudioSaga };

export function* adminConsoleSaga() {
  yield all([resetAudioSaga()]);
}
