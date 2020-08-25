import { all } from 'redux-saga/effects';
import { createInterventionSaga } from 'global/reducers/intervention/sagas';
import {
  copyInterventionSaga,
  editProblemSaga,
  fetchProblemSaga,
  sendProblemCsvSaga,
} from 'global/reducers/problem/sagas';
import { copyProblemSaga } from 'global/reducers/problems/sagas';

export default function* problemDetailsPageSagas() {
  yield all([
    createInterventionSaga(),
    fetchProblemSaga(),
    editProblemSaga(),
    sendProblemCsvSaga(),
    copyInterventionSaga(),
    copyProblemSaga(),
  ]);
}
