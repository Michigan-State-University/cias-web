import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import { formatMessage } from 'utils/intlOutsideReact';
import { mapQuestionToStateObject } from 'utils/mapResponseObjects';

import { deleteAnswerImageSuccess, deleteAnswerImageError } from '../actions';
import { DELETE_ANSWER_IMAGE_REQUEST } from '../constants';

export function* deleteAnswerImage({ payload: { questionId, answerId } }) {
  const requestURL = `v1/questions/${questionId}/answer_images/${answerId}`;

  try {
    const { data } = yield axios.delete(requestURL);

    const responseQuestion = mapQuestionToStateObject(data.data);

    yield put(deleteAnswerImageSuccess(responseQuestion));
    yield toast.success(
      formatMessage({
        id: 'app.GlobalMessages.deleteAnswerImageSuccess',
        defaultMessage: 'Answer image deleted successfully',
      }),
    );
  } catch (error) {
    const errorMessage = error?.response?.data?.message || error.message;
    yield put(deleteAnswerImageError({ error: errorMessage, questionId }));
    yield toast.error(
      formatMessage({
        id: 'app.GlobalMessages.deleteAnswerImageError',
        defaultMessage: 'Failed to delete answer image',
      }),
    );
  }
}

export default function* deleteAnswerImageSaga() {
  yield takeLatest(DELETE_ANSWER_IMAGE_REQUEST, deleteAnswerImage);
}
