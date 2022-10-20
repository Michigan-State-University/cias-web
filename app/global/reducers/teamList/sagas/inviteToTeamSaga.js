import { takeLatest, put, call } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import axios from 'axios';

import { formatMessage } from 'utils/intlOutsideReact';

import { inviteToTeamSuccess, inviteToTeamFailure } from '../actions';
import { INVITE_TO_TEAM_REQUEST } from '../constants';

import messages from './messages';

function* inviteToTeam({ payload: { email, teamId, roles } }) {
  const requestUrl = `/v1/teams/${teamId}/invitations`;
  try {
    yield axios.post(requestUrl, { email, roles });

    yield put(inviteToTeamSuccess());
    yield call(toast.info, formatMessage(messages.inviteToTeamSuccess));
  } catch (error) {
    yield put(inviteToTeamFailure(error));
    yield call(toast.error, formatMessage(messages.inviteToTeamFailure));
  }
}

export default function* inviteToTeamSaga() {
  yield takeLatest(INVITE_TO_TEAM_REQUEST, inviteToTeam);
}
