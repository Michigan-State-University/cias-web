import { all } from 'redux-saga/effects';
import {
  copyInterventionSaga,
  editProblemSaga,
  fetchProblemSaga,
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
    copyInterventionSaga(),
    copyProblemSaga(),
    updateInterventionSettingsSaga(),
    reorderSessionsSaga(),
  ]);
}
