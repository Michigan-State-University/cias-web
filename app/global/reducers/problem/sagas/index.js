import { all } from 'redux-saga/effects';
import sendProblemCsvSaga from './sendProblemCsv';
import createProblemSaga from './createProblem';
import editProblemSaga from './editProblem';
import fetchProblemSaga from './fetchProblem';

export {
  createProblemSaga,
  editProblemSaga,
  fetchProblemSaga,
  sendProblemCsvSaga,
};

export default function* allProblemSagas() {
  yield all([
    createProblemSaga(),
    editProblemSaga(),
    fetchProblemSaga(),
    sendProblemCsvSaga(),
  ]);
}
