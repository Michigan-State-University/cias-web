import { all } from 'redux-saga/effects';
import fetchUsersSaga from './fetchUsersSaga';
import changeActivateStatusSaga from './changeActivateStatusSaga';
import deleteUserFromTeamSaga from './deleteUserFromTeamSaga';

export default function* userListSaga() {
  yield all([
    fetchUsersSaga(),
    changeActivateStatusSaga(),
    deleteUserFromTeamSaga(),
  ]);
}
