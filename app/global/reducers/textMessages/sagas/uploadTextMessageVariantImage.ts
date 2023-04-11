import { takeEvery, put, call } from 'redux-saga/effects';
import axios from 'axios';
import { toast } from 'react-toastify';

import { jsonApiToObject } from 'utils/jsonApiMapper';
import { formatMessage } from 'utils/intlOutsideReact';

import { UPLOAD_TEXT_MESSAGE_VARIANT_IMAGE_REQUEST } from '../constants';
import messages from '../messages';
import {
  uploadTextMessageVariantImageRequest,
  uploadTextMessageVariantImageSuccess,
  uploadTextMessageVariantImageError,
} from '../actions';

function* uploadTextMessageVariantImage({
  payload: { textMessageId, variantId, image },
}: ReturnType<typeof uploadTextMessageVariantImageRequest>) {
  const requestUrl = `/v1/sms_plans/${textMessageId}/variants/${variantId}`;

  try {
    const formData = new FormData();
    formData.append('variant[image]', image);

    const { data } = yield axios.patch(requestUrl, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    const { imageUrl } = jsonApiToObject(data, 'variant');

    yield put(
      uploadTextMessageVariantImageSuccess(textMessageId, variantId, imageUrl),
    );
  } catch (error) {
    yield call(
      toast.error,
      formatMessage(messages.uploadTextMessageImageError),
    );
    yield put(
      uploadTextMessageVariantImageError(textMessageId, variantId, error),
    );
  }
}

export default function* uploadTextMessageVariantImageSaga() {
  yield takeEvery(
    UPLOAD_TEXT_MESSAGE_VARIANT_IMAGE_REQUEST,
    uploadTextMessageVariantImage,
  );
}
