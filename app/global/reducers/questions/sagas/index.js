import { all } from 'redux-saga/effects';
import addQuestionImageSaga from './addQuestionImage';
import copyQuestionSaga from './copyQuestion';
import copyQuestionsSaga from './copyQuestions';
import createQuestionSaga from './createQuestion';
import deleteQuestionSaga from './deleteQuestion';
import deleteQuestionsSaga from './deleteQuestions';
import deleteQuestionImageSaga from './deleteQuestionImage';
import getQuestionsSaga from './getQuestions';
import reorderQuestionsSaga from './reorderQuestions';
import groupQuestionsSaga from './groupQuestions';
import shareQuestionsToResearchersSaga from './shareQuestionsToResearchers';
import editQuestionAllSagas, {
  editQuestionSaga,
  updateQuestionDataSaga,
  updateQuestionSettingsSaga,
  changeQuestionTypeSaga,
} from './editQuestion';

export {
  addQuestionImageSaga,
  copyQuestionSaga,
  createQuestionSaga,
  deleteQuestionSaga,
  deleteQuestionImageSaga,
  getQuestionsSaga,
  reorderQuestionsSaga,
  editQuestionAllSagas,
  editQuestionSaga,
  updateQuestionDataSaga,
  updateQuestionSettingsSaga,
  changeQuestionTypeSaga,
  copyQuestionsSaga,
  deleteQuestionsSaga,
  groupQuestionsSaga,
  shareQuestionsToResearchersSaga,
};

export default function* allQuestionsSagas() {
  yield all([
    addQuestionImageSaga(),
    copyQuestionSaga(),
    createQuestionSaga(),
    deleteQuestionSaga(),
    deleteQuestionImageSaga(),
    getQuestionsSaga(),
    reorderQuestionsSaga(),
    editQuestionSaga(),
    updateQuestionDataSaga(),
    updateQuestionSettingsSaga(),
    changeQuestionTypeSaga(),
    copyQuestionsSaga(),
    deleteQuestionsSaga(),
    groupQuestionsSaga(),
    shareQuestionsToResearchersSaga(),
  ]);
}
