import { all } from 'redux-saga/effects';
import copySessionSaga from 'global/reducers/intervention/sagas/copySession';
import createSessionSaga from 'global/reducers/intervention/sagas/createSession';
import fetchSessionEmailsSaga from 'global/reducers/intervention/sagas/fetchSessionEmails';
import resendSessionInviteSaga from 'global/reducers/intervention/sagas/resendSessionInvite';
import sendSessionInviteSaga from 'global/reducers/intervention/sagas/sendSessionInvite';
import updateSessionSettingsSaga from 'global/reducers/intervention/sagas/updateSessionSettings';
import sendProblemCsvSaga from './sendProblemCsv';
import createProblemSaga from './createProblem';
import editProblemSaga from './editProblem';
import fetchProblemSaga from './fetchProblem';
import reorderSessionsSaga from './reorderSessions';
import changeAccessSettingSaga from './changeAccessSetting';
import giveUserAccessSaga from './giveUserAccess';
import fetchUsersWithAccessSaga from './fetchUsersWithAccess';
import revokeUserAccessSaga from './revokeUserAccess';

export {
  createProblemSaga,
  editProblemSaga,
  fetchProblemSaga,
  sendProblemCsvSaga,
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
};

export default function* allProblemSagas() {
  yield all([
    createProblemSaga(),
    editProblemSaga(),
    fetchProblemSaga(),
    sendProblemCsvSaga(),
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
  ]);
}
