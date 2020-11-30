import { sendProblemCsvSaga } from 'global/reducers/intervention';
import {
  archiveProblemSaga,
  copyProblemSaga,
} from 'global/reducers/interventions';
import { all } from 'redux-saga/effects';

export function* problemOptionsSaga() {
  yield all([sendProblemCsvSaga(), copyProblemSaga(), archiveProblemSaga()]);
}
