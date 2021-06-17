import { all } from 'redux-saga/effects';

import addQuestionImageSaga from './addQuestionImage';
import deleteQuestionImageSaga from './deleteQuestionImage';
import updateQuestionImageSaga from './updateQuestionImage';

export default function* questionImageSaga() {
  yield all([
    addQuestionImageSaga(),
    deleteQuestionImageSaga(),
    updateQuestionImageSaga(),
  ]);
}
