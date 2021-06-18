import { all } from 'redux-saga/effects';
import copyQuestionSaga from './copyQuestion';
import createQuestionSaga from './createQuestion';
import deleteQuestionSaga from './deleteQuestion';
import reorderQuestionsSaga from './reorderQuestions';
import deleteQuestionsSaga from './deleteQuestions';
import editQuestionAllSagas, {
  editQuestionSaga,
  updateQuestionDataSaga,
  updateQuestionSettingsSaga,
  changeQuestionTypeSaga,
} from './editQuestion';
import copyExternallyQuestionSaga from './copyExternallyQuestion';
import questionImageSaga from './questionImage';

export {
  copyQuestionSaga,
  createQuestionSaga,
  deleteQuestionSaga,
  reorderQuestionsSaga,
  editQuestionAllSagas,
  editQuestionSaga,
  updateQuestionDataSaga,
  updateQuestionSettingsSaga,
  changeQuestionTypeSaga,
  deleteQuestionsSaga,
  copyExternallyQuestionSaga,
  questionImageSaga,
};

export default function* allQuestionsSagas() {
  yield all([
    copyQuestionSaga(),
    createQuestionSaga(),
    deleteQuestionSaga(),
    reorderQuestionsSaga(),
    editQuestionSaga(),
    updateQuestionDataSaga(),
    updateQuestionSettingsSaga(),
    changeQuestionTypeSaga(),
    deleteQuestionsSaga(),
    copyExternallyQuestionSaga(),
    questionImageSaga(),
  ]);
}
