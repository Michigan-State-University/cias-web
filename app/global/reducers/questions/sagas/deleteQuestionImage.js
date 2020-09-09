import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

import { mapQuestionToStateObject } from 'utils/mapResponseObjects';

import { DELETE_QUESTION_IMAGE_REQUEST } from '../constants';
import {
  deleteQuestionImageSuccess,
  deleteQuestionImageError,
} from '../actions';

function* deleteQuestionImage({ payload: { selectedQuestionId } }) {
  const requestURL = `v1/questions/${selectedQuestionId}/images`;

  try {
    const response = yield axios.delete(requestURL);

    const responseQuestion = mapQuestionToStateObject(response.data.data);
    yield put(deleteQuestionImageSuccess(responseQuestion));
  } catch (error) {
    yield put(
      deleteQuestionImageError({ error, questionId: selectedQuestionId }),
    );
  }
}

export default function* deleteQuestionImageSaga() {
  yield takeLatest(DELETE_QUESTION_IMAGE_REQUEST, deleteQuestionImage);
}
