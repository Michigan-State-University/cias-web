import { all } from 'redux-saga/effects';
import {
  copyInterventionSaga,
  editProblemSaga,
  fetchProblemSaga,
  updateInterventionSettingsSaga,
  reorderSessionsSaga,
  createInterventionSaga,
  sendInterventionInviteSaga,
  resendInterventionInviteSaga,
  fetchInterventionEmailsSaga,
} from 'global/reducers/intervention/sagas';

export default function* problemDetailsPageSagas() {
  yield all([
    createInterventionSaga(),
    fetchProblemSaga(),
    editProblemSaga(),
    copyInterventionSaga(),
    updateInterventionSettingsSaga(),
    reorderSessionsSaga(),
    sendInterventionInviteSaga(),
    fetchInterventionEmailsSaga(),
    resendInterventionInviteSaga(),
  ]);
}
