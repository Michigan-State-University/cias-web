import { all } from 'redux-saga/effects';

import {
  deleteQuestionSaga,
  copyQuestionSaga,
  createQuestionSaga,
  reorderQuestionsSaga,
  deleteQuestionsSaga,
} from 'global/reducers/questions';

import {
  copyQuestionsSaga,
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
