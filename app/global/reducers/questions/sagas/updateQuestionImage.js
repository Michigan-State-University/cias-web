import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

import { UPDATE_QUESTION_IMAGE_REQUEST } from '../constants';
import {
  updateQuestionImageError,
  updateQuestionImageSuccess,
} from '../actions';

function* updateQuestionImage({ payload: { description, questionId } }) {
  const requestURL = `v1/questions/${questionId}/images`;

  try {
    yield axios.patch(requestURL, { image: { image_alt: description } });

    yield put(updateQuestionImageSuccess(questionId));
  } catch (error) {
    yield put(updateQuestionImageError({ error, questionId }));
  }
}

export default function* updateQuestionImageSaga() {
  yield takeLatest(UPDATE_QUESTION_IMAGE_REQUEST, updateQuestionImage);
}
