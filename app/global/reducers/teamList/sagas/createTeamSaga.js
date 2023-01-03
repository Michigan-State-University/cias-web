import { takeLatest, put, call } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import axios from 'axios';

import { formatMessage } from 'utils/intlOutsideReact';
import objectToSnakeCase from 'utils/objectToSnakeCase';

import { mapCurrentUser } from 'utils/mapResponseObjects';
import { TeamBuilder } from 'models/Teams/TeamBuilder';
import { createTeamSuccess, createTeamFailure } from '../actions';
import { CREATE_TEAM_REQUEST } from '../constants';

import messages from './messages';

function* createTeam({ payload: { name, userId } }) {
  const requestUrl = `/v1/teams`;
  try {
    const {
      data: { data, included },
    } = yield axios.post(
      requestUrl,
      objectToSnakeCase({ team: { name, userId } }),
    );

    const mappedUsers = included.map((user) => mapCurrentUser(user));

    const mappedData = new TeamBuilder()
      .fromJson(data)
      .withTeamAdmin(
        mappedUsers.find(
          ({ id }) => id === data.relationships?.team_admin?.data?.id,
        ),
      )
      .build();

    yield put(createTeamSuccess(mappedData));
    yield call(toast.success, formatMessage(messages.createTeamSuccess));
  } catch (error) {
    yield put(createTeamFailure());
    yield call(
      toast.error,
      error.response?.data?.message ||
        formatMessage(messages.createTeamFailure),
    );
  }
}

export default function* createTeamSaga() {
  yield takeLatest(CREATE_TEAM_REQUEST, createTeam);
}
