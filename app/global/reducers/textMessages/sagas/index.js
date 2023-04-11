import { all } from 'redux-saga/effects';
import fetchTextMessagesSaga from './fetchTextMessages';
import createTextMessageSaga from './createTextMessage';
import updateTextMessageSaga from './updateTextMessage';
import fetchVariantsAndPhonesSaga from './fetchVariantsAndPhones';
import createVariantSaga from './createVariant';
import removeTextMessageSaga from './removeTextMessage';
import updateTextMessageVariantSaga from './updateTextMessageVariant';
import removeTextMessageVariantSaga from './removeTextMessageVariant';
import cloneTextMessageSaga from './cloneTextMessage';
import { addPhoneSaga } from './addPhone';
import { removePhoneSaga } from './removePhone';
import { updatePhoneSaga } from './updatePhone';
import reorderTextMessageVarians from './reorderTextMessageVariants';
import uploadTextMessageImageSaga from './uploadTextMessageImage';
import deleteTextMessageImageSaga from './deleteTextMessageImage';

export function* allTextMessagesSagas() {
  yield all([
    fetchTextMessagesSaga(),
    createTextMessageSaga(),
    updateTextMessageSaga(),
    fetchVariantsAndPhonesSaga(),
    createVariantSaga(),
    removeTextMessageSaga(),
    updateTextMessageVariantSaga(),
    removeTextMessageVariantSaga(),
    cloneTextMessageSaga(),
    addPhoneSaga(),
    removePhoneSaga(),
    updatePhoneSaga(),
    reorderTextMessageVarians(),
    uploadTextMessageImageSaga(),
    deleteTextMessageImageSaga(),
  ]);
}
