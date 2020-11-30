import { all } from 'redux-saga/effects';
import copyInterventionSaga from './copyIntervention';
import sendProblemCsvSaga from './sendProblemCsv';
import createProblemSaga from './createProblem';
import editProblemSaga from './editProblem';
import fetchProblemSaga from './fetchProblem';
import updateInterventionSettingsSaga from './updateInterventionSettings';
import reorderSessionsSaga from './reorderSessions';
import changeAccessSettingSaga from './changeAccessSetting';
import giveUserAccessSaga from './giveUserAccess';
import fetchUsersWithAccessSaga from './fetchUsersWithAccess';
import revokeUserAccessSaga from './revokeUserAccess';
import createInterventionSaga from './createIntervention';
import sendInterventionInviteSaga from './sendInterventionInvite';
import fetchInterventionEmailsSaga from './fetchInterventionEmails';
import resendInterventionInviteSaga from './resendInterventionInvite';

export {
  createProblemSaga,
  editProblemSaga,
  fetchProblemSaga,
  sendProblemCsvSaga,
  copyInterventionSaga,
  updateInterventionSettingsSaga,
  reorderSessionsSaga,
  changeAccessSettingSaga,
  giveUserAccessSaga,
  fetchUsersWithAccessSaga,
  revokeUserAccessSaga,
  createInterventionSaga,
  sendInterventionInviteSaga,
  fetchInterventionEmailsSaga,
  resendInterventionInviteSaga,
};

export default function* allProblemSagas() {
  yield all([
    createProblemSaga(),
    editProblemSaga(),
    fetchProblemSaga(),
    sendProblemCsvSaga(),
    copyInterventionSaga(),
    updateInterventionSettingsSaga(),
    reorderSessionsSaga(),
    changeAccessSettingSaga(),
    giveUserAccessSaga(),
    fetchUsersWithAccessSaga(),
    revokeUserAccessSaga(),
    createInterventionSaga(),
    sendInterventionInviteSaga(),
    fetchUsersWithAccessSaga(),
    fetchInterventionEmailsSaga(),
    resendInterventionInviteSaga(),
  ]);
}
