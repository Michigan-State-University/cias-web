import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import { toast } from 'react-toastify';

import { formatMessage } from 'utils/intlOutsideReact';

import { UPDATE_ANSWER_IMAGE_REQUEST } from '../constants';
import { updateAnswerImageError, updateAnswerImageSuccess } from '../actions';

function* updateAnswerImage({
  payload: { description, questionId, answerId },
}) {
  const requestURL = `v1/questions/${questionId}/answer_images/${answerId}`;

  try {
    yield axios.patch(requestURL, { image: { image_alt: description } });

    yield put(updateAnswerImageSuccess(questionId));
    yield toast.success(
      formatMessage({
        id: 'app.GlobalMessages.updateAnswerImageSuccess',
        defaultMessage: 'Answer image description updated successfully',
      }),
    );
  } catch (error) {
    const errorMessage = error?.response?.data?.message || error.message;
    yield put(updateAnswerImageError({ error: errorMessage, questionId }));
    yield toast.error(
      formatMessage({
        id: 'app.GlobalMessages.updateAnswerImageError',
        defaultMessage: 'Failed to update answer image description',
      }),
    );
  }
}

export default function* updateAnswerImageSaga() {
  yield takeLatest(UPDATE_ANSWER_IMAGE_REQUEST, updateAnswerImage);
}
