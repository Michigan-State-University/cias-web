import { takeLatest, put, call } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import axios from 'axios';

import { formatMessage } from 'utils/intlOutsideReact';

import { deleteTeamSuccess, deleteTeamFailure } from '../actions';
import { DELETE_TEAM_REQUEST } from '../constants';

import messages from './messages';

function* deleteTeam({ payload: { id } }) {
  const requestUrl = `/v1/teams/${id}`;
  try {
    yield axios.delete(requestUrl);
    yield put(deleteTeamSuccess());

    yield call(toast.info, formatMessage(messages.deleteTeamSuccess));
  } catch (error) {
    yield put(deleteTeamFailure());
    yield call(toast.error, formatMessage(messages.deleteTeamFailure));
  }
}

export default function* deleteTeamSaga() {
  yield takeLatest(DELETE_TEAM_REQUEST, deleteTeam);
}
