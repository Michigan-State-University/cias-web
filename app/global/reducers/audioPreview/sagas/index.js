import { all } from 'redux-saga/effects';
import phoneticPreviewSaga from './phoneticPreviewRequest';

export { phoneticPreviewSaga };

export function* allAudioPreviewSagas() {
  yield all([phoneticPreviewSaga()]);
}
