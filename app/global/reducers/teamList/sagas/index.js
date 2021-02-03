import { all } from 'redux-saga/effects';
import fetchSingleTeamSaga from './fetchSingleTeamSaga';
import editSingleTeamSaga from './editSingleTeamSaga';
import fetchTeamsSaga from './fetchTeamsSaga';
import createTeamSaga from './createTeamSaga';
import deleteTeamSaga from './deleteTeamSaga';

export default function* teamListSaga() {
  yield all([
    fetchTeamsSaga(),
    createTeamSaga(),
    deleteTeamSaga(),
    fetchSingleTeamSaga(),
    editSingleTeamSaga(),
  ]);
}
