import { all } from 'redux-saga/effects';
import copySessionSaga from 'global/reducers/intervention/sagas/copySession';
import createSessionSaga from 'global/reducers/intervention/sagas/createSession';
import updateSessionSettingsSaga from 'global/reducers/intervention/sagas/updateSessionSettings';
import sendInterventionCsvSaga from 'global/reducers/intervention/sagas/sendInterventionCsv';
import editInterventionSaga from 'global/reducers/intervention/sagas/editIntervention';
import fetchInterventionSaga from 'global/reducers/intervention/sagas/fetchIntervention';
import reorderSessionsSaga from './reorderSessions';
import giveUserAccessSaga from './giveUserAccess';
import fetchUsersWithAccessSaga from './fetchUsersWithAccess';
import revokeUserAccessSaga from './revokeUserAccess';
import deleteSessionSaga from './deleteSession';
import externalCopySessionSaga from './externalCopySession';
import interventionLogoSaga from './interventionLogo';
import translateInterventionSaga from './translateIntervention';
import addInterventionAttachmentsSaga from './addAttachments';
import deleteInterventionAttachmentSaga from './deleteAttachment';
import sendInterventionInvitationsSaga from './sendInterventionInvitations';
import resendInterventionInvitationSaga from './resendInterventionInvitation';
import fetchInterventionInvitations from './fetchInterventionInvitations';
import generateConversationsTranscriptSaga from './generateConversationsTranscript';
import changeInterventionNarratorSaga from './changeInterventionNarrator';
import editShortLinksSaga from './editShortLinks';
import addCollaboratorsSaga from './inviteCollaborator';
import fetchCollaboratorsSaga from './fetchCollaborators';
import changeCollaboratorSettingSaga from './changeCollaboratorSetting';
import removeCollaboratorSaga from './removeCollaborator';
import onCollaboratorRemovedReceiveSaga from './onCollaboratorRemovedReceive';
import refreshInterventionDataSaga from './refreshInterventionData';
import createPredefinedParticipantSaga from './createPredefinedParticipant';
import fetchPredefinedParticipantsSaga from './fetchPredefinedParticipants';
import updatePredefinedParticipantSaga from './updatePredefinedParticipant';
import deactivatePredefinedParticipantSaga from './deactivatePredefinedParticipant';
import activatePredefinedParticipantSaga from './activatePredefinedParticipant';
import sendPredefinedParticipantSmsInvitationSaga from './sendPredefinedParticipantSmsInvitation';
import sendPredefinedParticipantEmailInvitationSaga from './sendPredefinedParticipantEmailInvitation';

export * from './onCollaboratorRemovedReceive';
export * from './refreshInterventionData';
export * from './fetchCurrentUserCollaboratorData';
export * from './clearInterventionData';
export * from './createIntervention';
export * from './exportIntervention';

export {
  editInterventionSaga,
  fetchInterventionSaga,
  sendInterventionCsvSaga,
  copySessionSaga,
  updateSessionSettingsSaga,
  reorderSessionsSaga,
  giveUserAccessSaga,
  fetchUsersWithAccessSaga,
  revokeUserAccessSaga,
  createSessionSaga,
  deleteSessionSaga,
  externalCopySessionSaga,
  interventionLogoSaga,
  translateInterventionSaga,
  addInterventionAttachmentsSaga,
  sendInterventionInvitationsSaga,
  resendInterventionInvitationSaga,
  deleteInterventionAttachmentSaga,
  fetchInterventionInvitations,
  generateConversationsTranscriptSaga,
  changeInterventionNarratorSaga,
  editShortLinksSaga,
  addCollaboratorsSaga,
  fetchCollaboratorsSaga,
  changeCollaboratorSettingSaga,
  removeCollaboratorSaga,
  createPredefinedParticipantSaga,
  fetchPredefinedParticipantsSaga,
  updatePredefinedParticipantSaga,
  deactivatePredefinedParticipantSaga,
  activatePredefinedParticipantSaga,
  sendPredefinedParticipantSmsInvitationSaga,
  sendPredefinedParticipantEmailInvitationSaga,
};

export default function* allInterventionSagas() {
  yield all([
    editInterventionSaga(),
    fetchInterventionSaga(),
    sendInterventionCsvSaga(),
    copySessionSaga(),
    updateSessionSettingsSaga(),
    reorderSessionsSaga(),
    giveUserAccessSaga(),
    fetchUsersWithAccessSaga(),
    revokeUserAccessSaga(),
    createSessionSaga(),
    fetchUsersWithAccessSaga(),
    deleteSessionSaga(),
    externalCopySessionSaga(),
    translateInterventionSaga(),
    sendInterventionInvitationsSaga(),
    resendInterventionInvitationSaga(),
    fetchInterventionInvitations(),
    generateConversationsTranscriptSaga(),
    changeInterventionNarratorSaga(),
    editShortLinksSaga(),
    addCollaboratorsSaga(),
    fetchCollaboratorsSaga(),
    changeCollaboratorSettingSaga(),
    removeCollaboratorSaga(),
    onCollaboratorRemovedReceiveSaga(),
    refreshInterventionDataSaga(),
    createPredefinedParticipantSaga(),
    fetchPredefinedParticipantsSaga(),
    updatePredefinedParticipantSaga(),
    deactivatePredefinedParticipantSaga(),
    activatePredefinedParticipantSaga(),
    sendPredefinedParticipantSmsInvitationSaga(),
    sendPredefinedParticipantEmailInvitationSaga(),
  ]);
}

export const withInterventionLogoSaga = {
  key: 'interventionLogo',
  saga: interventionLogoSaga,
};
