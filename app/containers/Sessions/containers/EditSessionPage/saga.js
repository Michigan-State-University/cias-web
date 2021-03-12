import { all } from 'redux-saga/effects';

import {
  deleteQuestionSaga,
  copyQuestionSaga,
  createQuestionSaga,
  reorderQuestionsSaga,
  deleteQuestionsSaga,
  copyExternallyQuestionSaga,
} from 'global/reducers/questions';

import {
  copyQuestionsSaga,
  groupQuestionsSaga,
  shareQuestionsToResearchersSaga,
  changeGroupNameSaga,
} from 'global/reducers/questionGroups';

import logInGuestSaga from 'global/reducers/auth/sagas';
import { redirectToPreviewSaga } from 'containers/AnswerSessionPage/saga';

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
    logInGuestSaga(),
    redirectToPreviewSaga(),
    copyExternallyQuestionSaga(),
  ]);
}
