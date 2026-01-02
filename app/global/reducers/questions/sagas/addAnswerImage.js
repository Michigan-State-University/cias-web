import { put, takeLatest, select } from 'redux-saga/effects';
import axios from 'axios';
import { toast } from 'react-toastify';

import { mapQuestionToStateObject } from 'utils/mapResponseObjects';
import { formatMessage } from 'utils/intlOutsideReact';

import { ADD_ANSWER_IMAGE_REQUEST } from '../constants';
import { addAnswerImageSuccess, addAnswerImageError } from '../actions';
import { makeSelectSelectedQuestionId } from '../selectors';

export const ADD_ANSWER_IMAGE_ERROR_TOAST = 'ADD_ANSWER_IMAGE_ERROR';

function* addAnswerImage({ payload: { image, answerId, imageUrl } }) {
  const selectedQuestionId = yield select(makeSelectSelectedQuestionId());
  const requestURL = `v1/questions/${selectedQuestionId}/answer_images`;

  const formData = new FormData();
  formData.append('image[file]', image);
  formData.append('image[answer_id]', answerId);

  try {
    const response = yield axios.post(requestURL, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    const responseQuestion = mapQuestionToStateObject(response.data.data);

    yield put(addAnswerImageSuccess(responseQuestion));
    if (imageUrl) {
      window.URL.revokeObjectURL(imageUrl);
    }
    yield toast.success(
      formatMessage({
        id: 'app.GlobalMessages.addAnswerImageSuccess',
        defaultMessage: 'Answer image uploaded successfully',
      }),
    );
  } catch (error) {
    const errorMessage = error?.response?.data?.message || error.message;
    yield put(
      addAnswerImageError({
        error: errorMessage,
        questionId: selectedQuestionId,
      }),
    );
    yield toast.error(
      formatMessage({
        id: 'app.GlobalMessages.addAnswerImageError',
        defaultMessage: 'Failed to upload answer image',
      }),
      {
        toastId: ADD_ANSWER_IMAGE_ERROR_TOAST,
      },
    );
  }
}

export default function* addAnswerImageSaga() {
  yield takeLatest(ADD_ANSWER_IMAGE_REQUEST, addAnswerImage);
}
