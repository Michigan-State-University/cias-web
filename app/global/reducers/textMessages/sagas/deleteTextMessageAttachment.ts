import { takeEvery, put, call } from 'redux-saga/effects';
import axios from 'axios';
import { toast } from 'react-toastify';

import { formatMessage } from 'utils/intlOutsideReact';

import { DELETE_TEXT_MESSAGE_ATTACHMENT_REQUEST } from '../constants';
import messages from '../messages';
import {
  deleteTextMessageAttachmentError,
  deleteTextMessageAttachmentRequest,
  deleteTextMessageAttachmentSuccess,
} from '../actions';

function* deleteTextMessageAttachment({
  payload: { textMessageId },
}: ReturnType<typeof deleteTextMessageAttachmentRequest>) {
  const requestUrl = `/v1/sms_plans/${textMessageId}/no_formula_attachment`;

  try {
    yield axios.delete(requestUrl);
    yield put(deleteTextMessageAttachmentSuccess());
  } catch (error) {
    yield call(
      toast.error,
      formatMessage(messages.deleteTextMessageAttachmentError),
    );
    yield put(deleteTextMessageAttachmentError(error));
  }
}

export default function* deleteTextMessageAttachmentSaga() {
  yield takeEvery(
    DELETE_TEXT_MESSAGE_ATTACHMENT_REQUEST,
    deleteTextMessageAttachment,
  );
}
