import { takeLatest, put, call } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import axios from 'axios';

import { formatMessage } from 'utils/intlOutsideReact';
import objectToSnakeCase from 'utils/objectToSnakeCase';

import messages from './messages';
import {
  deleteUserFromTeamSuccess,
  deleteUserFromTeamFailure,
} from '../actions';
import { DELETE_USER_FROM_TEAM_REQUEST } from '../constants';

function* deleteUserFromTeam({ payload: { userId, teamId } }) {
  const requestUrl = `/v1/teams/${teamId}/remove_team_member`;
  try {
    yield axios.delete(requestUrl, { data: objectToSnakeCase({ userId }) });
    yield put(deleteUserFromTeamSuccess());

    yield call(
      toast.success,
      formatMessage(messages.deleteUserFromTeamSuccess),
    );
  } catch (error) {
    yield put(deleteUserFromTeamFailure());
    yield call(toast.error, formatMessage(messages.deleteUserFromTeamFailure));
  }
}

export default function* deleteUserFromTeamSaga() {
  yield takeLatest(DELETE_USER_FROM_TEAM_REQUEST, deleteUserFromTeam);
}
