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
import changeAccessSettingSaga from './changeAccessSetting';
import giveUserAccessSaga from './giveUserAccess';
import fetchUsersWithAccessSaga from './fetchUsersWithAccess';
import revokeUserAccessSaga from './revokeUserAccess';
import deleteSessionSaga from './deleteSession';
import externalCopySessionSaga from './externalCopySession';

export {
  createInterventionSaga,
  editInterventionSaga,
  fetchInterventionSaga,
  sendInterventionCsvSaga,
  copySessionSaga,
  updateSessionSettingsSaga,
  reorderSessionsSaga,
  changeAccessSettingSaga,
  giveUserAccessSaga,
  fetchUsersWithAccessSaga,
  revokeUserAccessSaga,
  createSessionSaga,
  sendSessionInviteSaga,
  fetchSessionEmailsSaga,
  resendSessionInviteSaga,
  deleteSessionSaga,
  externalCopySessionSaga,
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
    changeAccessSettingSaga(),
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
  ]);
}
