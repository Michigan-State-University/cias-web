import { all } from 'redux-saga/effects';
import fetchSessionsSaga from './fetchSessions';
import fetchQuestionsGroupsSaga from './fetchQuestionGroups';
import fetchInterventionsWithPaginationSaga from './fetchInterventionsWithPagination';

export { fetchSessionsSaga };

export function* allCopyModalSagas() {
  yield all([
    fetchSessionsSaga(),
    fetchQuestionsGroupsSaga(),
    fetchInterventionsWithPaginationSaga(),
  ]);
}
