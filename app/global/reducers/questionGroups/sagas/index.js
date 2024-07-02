import { all } from 'redux-saga/effects';

import reorderQuestionGroupsSaga from './reorderQuestionGroups';
import duplicateGroupsHereSaga from './duplicateGroupsHere';
import groupQuestionsSaga from './groupQuestions';
import shareQuestionsToResearchersSaga from './shareGroupsExternally';
import changeGroupNameSaga from './changeGroupName';
import updateQuestionGroupSaga from './updateQuestionGroup';
import getQuestionGroupsSaga from './getQuestionGroups';
import duplicateGroupsInternallySaga from './duplicateGroupsInternally';

export {
  duplicateGroupsHereSaga,
  groupQuestionsSaga,
  shareQuestionsToResearchersSaga,
  changeGroupNameSaga,
  updateQuestionGroupSaga,
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
    updateQuestionGroupSaga(),
    reorderQuestionGroupsSaga(),
    duplicateGroupsInternallySaga(),
  ]);
}
