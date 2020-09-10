import { all } from 'redux-saga/effects';

import { copyProblemSaga, archiveProblemSaga } from 'global/reducers/problems';

export default function* singleTileSagas() {
  yield all([copyProblemSaga(), archiveProblemSaga()]);
}
