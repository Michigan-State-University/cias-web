import { takeEvery, put, call } from 'redux-saga/effects';
import axios from 'axios';
import { toast } from 'react-toastify';

import { formatMessage } from 'utils/intlOutsideReact';

import { DELETE_TEXT_MESSAGE_VARIANT_IMAGE_REQUEST } from '../constants';
import messages from '../messages';
import {
  deleteTextMessageVariantImageError,
  deleteTextMessageVariantImageRequest,
  deleteTextMessageVariantImageSuccess,
} from '../actions';

function* deleteTextMessageVariantImage({
  payload: { textMessageId, variantId },
}: ReturnType<typeof deleteTextMessageVariantImageRequest>) {
  const requestUrl = `/v1/sms_plans/${textMessageId}/variants/${variantId}/image`;

  try {
    yield axios.delete(requestUrl);
    yield put(deleteTextMessageVariantImageSuccess());
  } catch (error) {
    yield call(
      toast.error,
      formatMessage(messages.deleteTextMessageImageError),
    );
    yield put(deleteTextMessageVariantImageError(error));
  }
}

export default function* deleteTextMessageVariantImageSaga() {
  yield takeEvery(
    DELETE_TEXT_MESSAGE_VARIANT_IMAGE_REQUEST,
    deleteTextMessageVariantImage,
  );
}
