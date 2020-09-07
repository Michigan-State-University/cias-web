import { all } from 'redux-saga/effects';
import {
  copyInterventionSaga,
  editProblemSaga,
  fetchProblemSaga,
  sendProblemCsvSaga,
  updateInterventionSettingsSaga,
  reorderSessionsSaga,
  createInterventionSaga,
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
    updateInterventionSettingsSaga(),
    reorderSessionsSaga(),
  ]);
}
