import { takeEvery, put, call } from 'redux-saga/effects';
import axios from 'axios';
import { toast } from 'react-toastify';

import { formatMessage } from 'utils/intlOutsideReact';

import { DELETE_TEXT_MESSAGE_VARIANT_ATTACHMENT_REQUEST } from '../constants';
import messages from '../messages';
import {
  deleteTextMessageVariantAttachmentError,
  deleteTextMessageVariantAttachmentRequest,
  deleteTextMessageVariantAttachmentSuccess,
} from '../actions';

function* deleteTextMessageVariantAttachment({
  payload: { textMessageId, variantId },
}: ReturnType<typeof deleteTextMessageVariantAttachmentRequest>) {
  const requestUrl = `/v1/sms_plans/${textMessageId}/variants/${variantId}/attachment`;

  try {
    yield axios.delete(requestUrl);
    yield put(deleteTextMessageVariantAttachmentSuccess());
  } catch (error) {
    yield call(
      toast.error,
      formatMessage(messages.deleteTextMessageAttachmentError),
    );
    yield put(deleteTextMessageVariantAttachmentError(error));
  }
}

export default function* deleteTextMessageVariantAttachmentSaga() {
  yield takeEvery(
    DELETE_TEXT_MESSAGE_VARIANT_ATTACHMENT_REQUEST,
    deleteTextMessageVariantAttachment,
  );
}
