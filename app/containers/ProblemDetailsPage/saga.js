import { all } from 'redux-saga/effects';
import {
  copyInterventionSaga,
  editProblemSaga,
  fetchProblemSaga,
  updateInterventionSettingsSaga,
  reorderSessionsSaga,
  createInterventionSaga,
  sendInterventionInviteSaga,
} from 'global/reducers/problem/sagas';

export default function* problemDetailsPageSagas() {
  yield all([
    createInterventionSaga(),
    fetchProblemSaga(),
    editProblemSaga(),
    copyInterventionSaga(),
    updateInterventionSettingsSaga(),
    reorderSessionsSaga(),
    sendInterventionInviteSaga(),
  ]);
}
