import { all } from 'redux-saga/effects';
import fetchProblemsSaga from './fetchProblems';
import copyProblemSaga from './copyProblem';
import archiveProblemSaga from './archiveProblem';

export { fetchProblemsSaga, copyProblemSaga, archiveProblemSaga };

export default function* allProblemSagas() {
  yield all([fetchProblemsSaga(), copyProblemSaga(), archiveProblemSaga()]);
}
