import { takeEvery, put, call } from 'redux-saga/effects';
import axios from 'axios';
import { toast } from 'react-toastify';

import { jsonApiToObject } from 'utils/jsonApiMapper';
import { formatMessage } from 'utils/intlOutsideReact';

import { UPLOAD_TEXT_MESSAGE_IMAGE_REQUEST } from '../constants';
import messages from '../messages';
import {
  uploadTextMessageImageSuccess,
  uploadTextMessageImageError,
} from '../actions';

function* uploadTextMessageImage({
  payload: { textMessageId, noFormulaImage },
}) {
  const requestUrl = `/v1/sms_plans/${textMessageId}`;

  try {
    const formData = new FormData();
    formData.append('sms_plan[image]', noFormulaImage);

    const { data } = yield axios.patch(requestUrl, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    const mappedData = jsonApiToObject(data, 'sms_plan');

    yield put(uploadTextMessageImageSuccess(textMessageId, mappedData));
  } catch (error) {
    yield call(
      toast.error,
      formatMessage(messages.uploadTextMessageImageError),
    );
    yield put(uploadTextMessageImageError(textMessageId, error));
  }
}

export default function* uploadTextMessageImageSaga() {
  yield takeEvery(UPLOAD_TEXT_MESSAGE_IMAGE_REQUEST, uploadTextMessageImage);
}
