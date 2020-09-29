import { all } from 'redux-saga/effects';

import {
  deleteQuestionSaga,
  copyQuestionSaga,
  createQuestionSaga,
  reorderQuestionsSaga,
  copyQuestionsSaga,
  deleteQuestionsSaga,
  groupQuestionsSaga,
} from 'global/reducers/questions';

export default function* editInterventionPageSaga() {
  yield all([
    reorderQuestionsSaga(),
    createQuestionSaga(),
    deleteQuestionSaga(),
    copyQuestionSaga(),
    copyQuestionsSaga(),
    deleteQuestionsSaga(),
    groupQuestionsSaga(),
  ]);
}
