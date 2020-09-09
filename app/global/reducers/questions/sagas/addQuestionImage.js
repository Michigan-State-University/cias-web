import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

import { mapQuestionToStateObject } from 'utils/mapResponseObjects';

import { ADD_QUESTION_IMAGE_REQUEST } from '../constants';
import { addQuestionImageSuccess, addQuestionImageError } from '../actions';

function* addQuestionImage({
  payload: { image, imageUrl, selectedQuestionId },
}) {
  const requestURL = `v1/questions/${selectedQuestionId}/images`;

  const formData = new FormData();
  formData.append('image[file]', image);

  try {
    const response = yield axios.post(requestURL, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    const responseQuestion = mapQuestionToStateObject(response.data.data);

    yield put(addQuestionImageSuccess(responseQuestion));
    window.URL.revokeObjectURL(imageUrl);
  } catch (error) {
    yield put(addQuestionImageError({ error, questionId: selectedQuestionId }));
  }
}

export default function* addQuestionImageSaga() {
  yield takeLatest(ADD_QUESTION_IMAGE_REQUEST, addQuestionImage);
}
