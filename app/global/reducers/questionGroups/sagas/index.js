import { all } from 'redux-saga/effects';

import reorderQuestionGroupsSaga from './reorderQuestionGroups';
import copyQuestionsSaga from './copyQuestions';
import deleteQuestionsSaga from './deleteQuestions';
import groupQuestionsSaga from './groupQuestions';
import shareQuestionsToResearchersSaga from './shareQuestionsToResearchers';
import changeGroupNameSaga from './changeGroupName';
import getQuestionGroupsSaga from './getQuestionGroups';

export {
  copyQuestionsSaga,
  deleteQuestionsSaga,
  groupQuestionsSaga,
  shareQuestionsToResearchersSaga,
  changeGroupNameSaga,
  getQuestionGroupsSaga,
  reorderQuestionGroupsSaga,
};

export default function* allQuestionsSagas() {
  yield all([
    copyQuestionsSaga(),
    deleteQuestionsSaga(),
    groupQuestionsSaga(),
    shareQuestionsToResearchersSaga(),
    changeGroupNameSaga(),
    reorderQuestionGroupsSaga(),
  ]);
}
