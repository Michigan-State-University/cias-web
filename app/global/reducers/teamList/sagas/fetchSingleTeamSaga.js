import { takeLatest, put } from 'redux-saga/effects';

import { TeamBuilder } from 'models/Teams/TeamBuilder';
import { mapCurrentUser } from 'utils/mapResponseObjects';
import axios from 'axios';
import { FETCH_SINGLE_TEAM_REQUEST } from '../constants';
import { fetchSingleTeamSuccess, fetchSingleTeamFailure } from '../actions';

function* fetchSingleTeam({ payload: { id } }) {
  const requestUrl = `/v1/teams/${id}`;

  try {
    const {
      data: { data, included },
    } = yield axios.get(requestUrl);

    const mappedUsers = included.map(user => mapCurrentUser(user));
    const mappedData = new TeamBuilder()
      .fromJson(data)
      .withTeamAdmin(
        mappedUsers.find(
          ({ id: userId }) =>
            userId === data.relationships?.team_admin?.data?.id,
        ),
      )
      .build();
    yield put(fetchSingleTeamSuccess(mappedData));
  } catch (error) {
    yield put(fetchSingleTeamFailure(error));
  }
}

export default function* fetchSingleTeamSaga() {
  yield takeLatest(FETCH_SINGLE_TEAM_REQUEST, fetchSingleTeam);
}
