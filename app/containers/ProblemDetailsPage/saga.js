import { all } from 'redux-saga/effects';
import {
  copySessionSaga,
  editProblemSaga,
  fetchProblemSaga,
  updateSessionSettingsSaga,
  reorderSessionsSaga,
  createSessionSaga,
  sendSessionInviteSaga,
  resendSessionInviteSaga,
  fetchSessionEmailsSaga,
} from 'global/reducers/intervention/sagas';

export default function* problemDetailsPageSagas() {
  yield all([
    createSessionSaga(),
    fetchProblemSaga(),
    editProblemSaga(),
    copySessionSaga(),
    updateSessionSettingsSaga(),
    reorderSessionsSaga(),
    sendSessionInviteSaga(),
    fetchSessionEmailsSaga(),
    resendSessionInviteSaga(),
  ]);
}
