import { all } from 'redux-saga/effects';
import fetchSessionsSaga from 'global/reducers/copyModalReducer/sagas/fetchSessions';
import fetchQuestionsGroupsSaga from 'global/reducers/copyModalReducer/sagas/fetchQuestionGroups';

export { fetchSessionsSaga };

export function* allCopyModalSagas() {
  yield all([fetchSessionsSaga(), fetchQuestionsGroupsSaga()]);
}
