import { sendProblemCsvSaga } from 'global/reducers/problem';
import { archiveProblemSaga, copyProblemSaga } from 'global/reducers/problems';
import { all } from 'redux-saga/effects';

export function* problemOptionsSaga() {
  yield all([sendProblemCsvSaga(), copyProblemSaga(), archiveProblemSaga()]);
}
