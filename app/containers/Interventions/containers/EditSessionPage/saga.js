import { all } from 'redux-saga/effects';

import {
  deleteQuestionSaga,
  copyQuestionSaga,
  createQuestionSaga,
  reorderQuestionsSaga,
} from 'global/reducers/questions';

import {
  copyQuestionsSaga,
  deleteQuestionsSaga,
  groupQuestionsSaga,
  shareQuestionsToResearchersSaga,
  changeGroupNameSaga,
} from 'global/reducers/questionGroups';

export default function* editInterventionPageSaga() {
  yield all([
    reorderQuestionsSaga(),
    createQuestionSaga(),
    deleteQuestionSaga(),
    copyQuestionSaga(),
    copyQuestionsSaga(),
    deleteQuestionsSaga(),
    groupQuestionsSaga(),
    shareQuestionsToResearchersSaga(),
    changeGroupNameSaga(),
  ]);
}
