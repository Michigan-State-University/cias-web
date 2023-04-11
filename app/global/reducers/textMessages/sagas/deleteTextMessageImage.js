import { takeEvery, put, call } from 'redux-saga/effects';
import axios from 'axios';
import { toast } from 'react-toastify';

import { formatMessage } from 'utils/intlOutsideReact';

import { DELETE_TEXT_MESSAGE_IMAGE_REQUEST } from '../constants';
import messages from '../messages';
import {
  deleteTextMessageImageError,
  deleteTextMessageImageSuccess,
} from '../actions';

function* deleteTextMessageImage({ payload: { textMessageId } }) {
  const requestUrl = `/v1/sms_plans/${textMessageId}/no_formula_image`;

  try {
    yield axios.delete(requestUrl);
    yield put(deleteTextMessageImageSuccess());
  } catch (error) {
    yield call(
      toast.error,
      formatMessage(messages.deleteTextMessageImageError),
    );
    yield put(deleteTextMessageImageError(error));
  }
}

export default function* deleteTextMessageImageSaga() {
  yield takeEvery(DELETE_TEXT_MESSAGE_IMAGE_REQUEST, deleteTextMessageImage);
}
