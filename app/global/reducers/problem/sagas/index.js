import { all } from 'redux-saga/effects';
import createProblemSaga from './createProblem';
import editProblemSaga from './editProblem';
import fetchProblemSaga from './fetchProblem';

export { createProblemSaga, editProblemSaga, fetchProblemSaga };

export default function* allProblemSagas() {
  yield all([createProblemSaga(), editProblemSaga(), fetchProblemSaga()]);
}
