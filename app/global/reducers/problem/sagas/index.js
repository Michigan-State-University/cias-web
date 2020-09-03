import { all } from 'redux-saga/effects';
import copyInterventionSaga from './copyIntervention';
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
  copyInterventionSaga,
  reorderSessionsSaga,
  changeAccessSettingSaga,
  giveUserAccessSaga,
  fetchUsersWithAccessSaga,
  revokeUserAccessSaga,
};

export default function* allProblemSagas() {
  yield all([
    createProblemSaga(),
    editProblemSaga(),
    fetchProblemSaga(),
    sendProblemCsvSaga(),
    copyInterventionSaga(),
    reorderSessionsSaga(),
    changeAccessSettingSaga(),
    giveUserAccessSaga(),
    fetchUsersWithAccessSaga(),
    revokeUserAccessSaga(),
  ]);
}
