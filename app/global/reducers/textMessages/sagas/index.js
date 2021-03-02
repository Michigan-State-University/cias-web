import { all } from 'redux-saga/effects';
import fetchTextMessagesSaga from './fetchTextMessages';
import createTextMessageSaga from './createTextMessage';
import updateTextMessageSaga from './updateTextMessage';
import fetchVariantsSaga from './fetchVariants';
import createVariantSaga from './createVariant';
import removeTextMessageSaga from './removeTextMessage';
import updateTextMessageVariantSaga from './updateTextMessageVariant';
import removeTextMessageVariantSaga from './removeTextMessageVariant';

export function* allTextMessagesSagas() {
  yield all([
    fetchTextMessagesSaga(),
    createTextMessageSaga(),
    updateTextMessageSaga(),
    fetchVariantsSaga(),
    createVariantSaga(),
    removeTextMessageSaga(),
    updateTextMessageVariantSaga(),
    removeTextMessageVariantSaga(),
  ]);
}
