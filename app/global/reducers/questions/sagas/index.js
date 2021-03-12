import { all } from 'redux-saga/effects';
import addQuestionImageSaga from './addQuestionImage';
import copyQuestionSaga from './copyQuestion';
import createQuestionSaga from './createQuestion';
import deleteQuestionSaga from './deleteQuestion';
import deleteQuestionImageSaga from './deleteQuestionImage';
import reorderQuestionsSaga from './reorderQuestions';
import deleteQuestionsSaga from './deleteQuestions';
import editQuestionAllSagas, {
  editQuestionSaga,
  updateQuestionDataSaga,
  updateQuestionSettingsSaga,
  changeQuestionTypeSaga,
} from './editQuestion';
import copyExternallyQuestionSaga from './copyExternallyQuestion';

export {
  addQuestionImageSaga,
  copyQuestionSaga,
  createQuestionSaga,
  deleteQuestionSaga,
  deleteQuestionImageSaga,
  reorderQuestionsSaga,
  editQuestionAllSagas,
  editQuestionSaga,
  updateQuestionDataSaga,
  updateQuestionSettingsSaga,
  changeQuestionTypeSaga,
  deleteQuestionsSaga,
  copyExternallyQuestionSaga,
};

export default function* allQuestionsSagas() {
  yield all([
    addQuestionImageSaga(),
    copyQuestionSaga(),
    createQuestionSaga(),
    deleteQuestionSaga(),
    deleteQuestionImageSaga(),
    reorderQuestionsSaga(),
    editQuestionSaga(),
    updateQuestionDataSaga(),
    updateQuestionSettingsSaga(),
    changeQuestionTypeSaga(),
    deleteQuestionsSaga(),
    copyExternallyQuestionSaga(),
  ]);
}
