import { all } from 'redux-saga/effects';

import addQuestionImageSaga from './addQuestionImage';
import deleteQuestionImageSaga from './deleteQuestionImage';
import updateQuestionImageSaga from './updateQuestionImage';
import addAnswerImageSaga from './addAnswerImage';
import deleteAnswerImageSaga from './deleteAnswerImage';
import updateAnswerImageSaga from './updateAnswerImage';

export default function* questionImageSaga() {
  yield all([
    addQuestionImageSaga(),
    deleteQuestionImageSaga(),
    updateQuestionImageSaga(),
    addAnswerImageSaga(),
    deleteAnswerImageSaga(),
    updateAnswerImageSaga(),
  ]);
}
