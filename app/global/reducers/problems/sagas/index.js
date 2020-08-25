import { all } from 'redux-saga/effects';
import fetchProblemsSaga from './fetchProblems';
import copyProblemSaga from './copyProblem';

export { fetchProblemsSaga, copyProblemSaga };

export default function* allProblemSagas() {
  yield all([fetchProblemsSaga(), copyProblemSaga()]);
}
