import { all } from 'redux-saga/effects';

import reorderQuestionGroupsSaga from './reorderQuestionGroups';
import copyQuestionsSaga from './copyQuestions';
import groupQuestionsSaga from './groupQuestions';
import shareQuestionsToResearchersSaga from './shareQuestionsToResearchers';
import changeGroupNameSaga from './changeGroupName';
import getQuestionGroupsSaga from './getQuestionGroups';
import duplicateGroupsInternallySaga from './duplicateGroupsInternally';

export {
  copyQuestionsSaga,
  groupQuestionsSaga,
  shareQuestionsToResearchersSaga,
  changeGroupNameSaga,
  getQuestionGroupsSaga,
  reorderQuestionGroupsSaga,
  duplicateGroupsInternallySaga,
};

export default function* allQuestionsSagas() {
  yield all([
    copyQuestionsSaga(),
    groupQuestionsSaga(),
    shareQuestionsToResearchersSaga(),
    changeGroupNameSaga(),
    reorderQuestionGroupsSaga(),
    duplicateGroupsInternallySaga(),
  ]);
}
