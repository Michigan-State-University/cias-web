import { takeEvery, put, call } from 'redux-saga/effects';
import axios from 'axios';
import { toast } from 'react-toastify';

import { jsonApiToObject } from 'utils/jsonApiMapper';
import { formatMessage } from 'utils/intlOutsideReact';

import { UPLOAD_TEXT_MESSAGE_ATTACHMENT_REQUEST } from '../constants';
import messages from '../messages';
import {
  uploadTextMessageAttachmentSuccess,
  uploadTextMessageAttachmentError,
  uploadTextMessageAttachmentRequest,
} from '../actions';

function* uploadTextMessageAttachment({
  payload: { textMessageId, noFormulaAttachment },
}: ReturnType<typeof uploadTextMessageAttachmentRequest>) {
  const requestUrl = `/v1/sms_plans/${textMessageId}`;

  try {
    const formData = new FormData();
    formData.append('sms_plan[no_formula_attachment]', noFormulaAttachment);

    const { data } = yield axios.patch(requestUrl, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    const { noFormulaAttachmentUrl } = jsonApiToObject(data, 'smsPlan');

    yield put(
      uploadTextMessageAttachmentSuccess(textMessageId, noFormulaAttachmentUrl),
    );
  } catch (error) {
    yield call(
      toast.error,
      formatMessage(messages.uploadTextMessageAttachmentError),
    );
    yield put(uploadTextMessageAttachmentError(textMessageId, error));
  }
}

export default function* uploadTextMessageAttachmentSaga() {
  yield takeEvery(
    UPLOAD_TEXT_MESSAGE_ATTACHMENT_REQUEST,
    uploadTextMessageAttachment,
  );
}
