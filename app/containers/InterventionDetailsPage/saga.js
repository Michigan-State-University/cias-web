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
  externalCopySessionSaga,
  sendInterventionInviteSaga,
  resendInterventionInviteSaga,
  fetchInterventionInvitesSaga,
  generateConversationsTranscriptSaga,
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
    sendInterventionInviteSaga(),
    resendInterventionInviteSaga(),
    externalCopySessionSaga(),
    fetchInterventionInvitesSaga(),
    generateConversationsTranscriptSaga(),
  ]);
}
