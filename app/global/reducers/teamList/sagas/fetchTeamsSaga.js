import { takeLatest, put } from 'redux-saga/effects';
import axios from 'axios';

import { TeamBuilder } from 'models/Teams/TeamBuilder';
import { mapCurrentUser } from 'utils/mapResponseObjects';
import { FETCH_TEAMS_REQUEST, PER_PAGE } from '../constants';
import { fetchTeamsSuccess, fetchTeamsFailure } from '../actions';

function* fetchTeams({ payload: { name, page } }) {
  const requestUrl = `/v1/teams?`;
  let params = '';
  if (name) {
    params += `name=${name}&`;
  }
  if (page) {
    params += `page=${page}&per_page=${PER_PAGE}&`;
  }

  try {
    const {
      data: {
        data,
        included,
        meta: { teams_size: teamsSize },
      },
    } = yield axios.get(requestUrl.concat(params));

    const mappedUsers = included.map(user => mapCurrentUser(user));

    const mappedData = data.map(team =>
      new TeamBuilder()
        .fromJson(team)
        .withTeamAdmin(
          mappedUsers.find(
            ({ id }) => id === team.relationships?.team_admin?.data?.id,
          ),
        )
        .build(),
    );
    yield put(fetchTeamsSuccess(mappedData, teamsSize));
  } catch (error) {
    yield put(fetchTeamsFailure(error));
  }
}

export default function* fetchTeamsSaga() {
  yield takeLatest(FETCH_TEAMS_REQUEST, fetchTeams);
}
