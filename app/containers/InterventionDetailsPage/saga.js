import { all } from 'redux-saga/effects';
import {
  copySessionSaga,
  editInterventionSaga,
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
  changeInterventionNarratorSaga,
  editShortLinksSaga,
  addCollaboratorsSaga,
  fetchCollaboratorsSaga,
  changeCollaboratorSettingSaga,
  removeCollaboratorSaga,
} from 'global/reducers/intervention/sagas';

export default function* interventionDetailsPageSagas() {
  yield all([
    createSessionSaga(),
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
    changeInterventionNarratorSaga(),
    editShortLinksSaga(),
  ]);
}

function* allCollaboratorsSaga() {
  yield all([
    addCollaboratorsSaga(),
    fetchCollaboratorsSaga(),
    changeCollaboratorSettingSaga(),
    removeCollaboratorSaga(),
  ]);
}

export const withAllCollaboratorsSaga = {
  key: 'allCollaboratorsSaga',
  saga: allCollaboratorsSaga,
};
