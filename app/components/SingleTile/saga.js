import { all } from 'redux-saga/effects';

import { sendProblemCsvSaga } from 'global/reducers/problem';
import { copyProblemSaga, archiveProblemSaga } from 'global/reducers/problems';

export default function* singleTileSagas() {
  yield all([sendProblemCsvSaga(), copyProblemSaga(), archiveProblemSaga()]);
}
