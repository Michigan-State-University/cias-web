import { all } from 'redux-saga/effects';

import reorderQuestionGroupsSaga from './reorderQuestionGroups';
import duplicateGroupsHereSaga from './duplicateGroupsHere';
import groupQuestionsSaga from './groupQuestions';
import shareQuestionsToResearchersSaga from './shareQuestionsToResearchers';
import changeGroupNameSaga from './changeGroupName';
import getQuestionGroupsSaga from './getQuestionGroups';
import duplicateGroupsInternallySaga from './duplicateGroupsInternally';

export {
  duplicateGroupsHereSaga,
  groupQuestionsSaga,
  shareQuestionsToResearchersSaga,
  changeGroupNameSaga,
  getQuestionGroupsSaga,
  reorderQuestionGroupsSaga,
  duplicateGroupsInternallySaga,
};

export default function* allQuestionsSagas() {
  yield all([
    duplicateGroupsHereSaga(),
    groupQuestionsSaga(),
    shareQuestionsToResearchersSaga(),
    changeGroupNameSaga(),
    reorderQuestionGroupsSaga(),
    duplicateGroupsInternallySaga(),
  ]);
}
