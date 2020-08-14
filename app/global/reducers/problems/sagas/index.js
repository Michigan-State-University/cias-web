import { all } from 'redux-saga/effects';
import fetchProblemsSaga from './fetchProblems';

export { fetchProblemsSaga };

export default function* allProblemSagas() {
  yield all([fetchProblemsSaga()]);
}
