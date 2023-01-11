import { all } from 'redux-saga/effects';
import copySessionSaga from 'global/reducers/intervention/sagas/copySession';
import createSessionSaga from 'global/reducers/intervention/sagas/createSession';
import fetchSessionEmailsSaga from 'global/reducers/intervention/sagas/fetchSessionEmails';
import resendSessionInviteSaga from 'global/reducers/intervention/sagas/resendSessionInvite';
import sendSessionInviteSaga from 'global/reducers/intervention/sagas/sendSessionInvite';
import updateSessionSettingsSaga from 'global/reducers/intervention/sagas/updateSessionSettings';
import createInterventionSaga from 'global/reducers/intervention/sagas/createIntervention';
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
import sendInterventionInviteSaga from './sendInterventionInvite';
import resendInterventionInviteSaga from './resendInterventionInvite';
import fetchInterventionInvitesSaga from './fetchInterventionInvites';
import generateConversationsTranscriptSaga from './generateConversationsTranscript';
import exportInterventionSaga from './exportIntervention';

export {
  createInterventionSaga,
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
  sendSessionInviteSaga,
  fetchSessionEmailsSaga,
  resendSessionInviteSaga,
  deleteSessionSaga,
  externalCopySessionSaga,
  interventionLogoSaga,
  translateInterventionSaga,
  addInterventionAttachmentsSaga,
  sendInterventionInviteSaga,
  resendInterventionInviteSaga,
  deleteInterventionAttachmentSaga,
  fetchInterventionInvitesSaga,
  generateConversationsTranscriptSaga,
  exportInterventionSaga,
};

export default function* allInterventionSagas() {
  yield all([
    createInterventionSaga(),
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
    sendSessionInviteSaga(),
    fetchUsersWithAccessSaga(),
    fetchSessionEmailsSaga(),
    resendSessionInviteSaga(),
    deleteSessionSaga(),
    externalCopySessionSaga(),
    translateInterventionSaga(),
    sendInterventionInviteSaga(),
    resendInterventionInviteSaga(),
    fetchInterventionInvitesSaga(),
    generateConversationsTranscriptSaga(),
    exportInterventionSaga(),
  ]);
}

export const withInterventionLogoSaga = {
  key: 'interventionLogo',
  saga: interventionLogoSaga,
};
