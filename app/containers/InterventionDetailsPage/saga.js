import { all } from 'redux-saga/effects';
import {
  copySessionSaga,
  editInterventionSaga,
  updateSessionSettingsSaga,
  reorderSessionsSaga,
  createSessionSaga,
  updateAllSessionsScheduleSaga,
  externalCopySessionSaga,
  sendInterventionInvitationsSaga,
  resendInterventionInvitationSaga,
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
  bulkCreatePredefinedParticipantsSaga,
} from 'global/reducers/intervention/sagas';
import unassignTagSaga from 'global/reducers/intervention/sagas/unassignTag';
import fulfillRaSessionSaga from 'global/reducers/intervention/sagas/fulfillRaSession';
import fetchRaSessionQuestionGroupsSaga from 'global/reducers/intervention/sagas/fetchRaSessionQuestionGroups';

export default function* interventionDetailsPageSagas() {
  yield all([
    createSessionSaga(),
    editInterventionSaga(),
    copySessionSaga(),
    updateSessionSettingsSaga(),
    updateAllSessionsScheduleSaga(),
    reorderSessionsSaga(),
    sendInterventionInvitationsSaga(),
    resendInterventionInvitationSaga(),
    externalCopySessionSaga(),
    fetchInterventionInvitations(),
    generateConversationsTranscriptSaga(),
    changeInterventionNarratorSaga(),
    editShortLinksSaga(),
    createPredefinedParticipantSaga(),
    fetchPredefinedParticipantsSaga(),
    updatePredefinedParticipantSaga(),
    deactivatePredefinedParticipantSaga(),
    activatePredefinedParticipantSaga(),
    sendPredefinedParticipantSmsInvitationSaga(),
    sendPredefinedParticipantEmailInvitationSaga(),
    bulkCreatePredefinedParticipantsSaga(),
    unassignTagSaga(),
    fulfillRaSessionSaga(),
    fetchRaSessionQuestionGroupsSaga(),
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
