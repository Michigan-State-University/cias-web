import { takeEvery, put, call } from 'redux-saga/effects';
import axios from 'axios';
import { toast } from 'react-toastify';

import { jsonApiToObject } from 'utils/jsonApiMapper';
import { formatMessage } from 'utils/intlOutsideReact';

import { UPLOAD_TEXT_MESSAGE_VARIANT_ATTACHMENT_REQUEST } from '../constants';
import messages from '../messages';
import {
  uploadTextMessageVariantAttachmentRequest,
  uploadTextMessageVariantAttachmentSuccess,
  uploadTextMessageVariantAttachmentError,
} from '../actions';

function* uploadTextMessageVariantAttachment({
  payload: { textMessageId, variantId, attachment },
}: ReturnType<typeof uploadTextMessageVariantAttachmentRequest>) {
  const requestUrl = `/v1/sms_plans/${textMessageId}/variants/${variantId}`;

  try {
    const formData = new FormData();
    formData.append('variant[attachment]', attachment);

    const { data } = yield axios.patch(requestUrl, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    const { attachmentUrl } = jsonApiToObject(data, 'variant');

    yield put(
      uploadTextMessageVariantAttachmentSuccess(
        textMessageId,
        variantId,
        attachmentUrl,
      ),
    );
  } catch (error) {
    yield call(
      toast.error,
      formatMessage(messages.uploadTextMessageAttachmentError),
    );
    yield put(
      uploadTextMessageVariantAttachmentError(textMessageId, variantId, error),
    );
  }
}

export default function* uploadTextMessageVariantAttachmentSaga() {
  yield takeEvery(
    UPLOAD_TEXT_MESSAGE_VARIANT_ATTACHMENT_REQUEST,
    uploadTextMessageVariantAttachment,
  );
}
