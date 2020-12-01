import { all } from 'redux-saga/effects';
import {
  copySessionSaga,
  editInterventionSaga,
  fetchInterventionSaga,
  updateSessionSettingsSaga,
  reorderSessionsSaga,
  createSessionSaga,
  sendSessionInviteSaga,
  resendSessionInviteSaga,
  fetchSessionEmailsSaga,
} from 'global/reducers/intervention/sagas';

export default function* interventionDetailsPageSagas() {
  yield all([
    createSessionSaga(),
    fetchInterventionSaga(),
    editInterventionSaga(),
    copySessionSaga(),
    updateSessionSettingsSaga(),
    reorderSessionsSaga(),
    sendSessionInviteSaga(),
    fetchSessionEmailsSaga(),
    resendSessionInviteSaga(),
  ]);
}
