import { takeLatest, put, select } from 'redux-saga/effects';

import { TeamBuilder } from 'models/Teams/TeamBuilder';
import axios from 'axios';
import { mapCurrentUser } from 'utils/mapResponseObjects';
import objectToSnakeCase from 'utils/objectToSnakeCase';
import { objectDifference } from 'utils/objectDifference';
import { EDIT_SINGLE_TEAM_REQUEST } from '../constants';
import { editSingleTeamSuccess, editSingleTeamFailure } from '../actions';
import { makeSelectSingleTeam } from '../selectors';

function* editSingleTeam({ payload: { id, name, user: teamAdmin } }) {
  const requestUrl = `/v1/teams/${id}`;

  const currentTeamState = yield select(makeSelectSingleTeam(id));
  if (currentTeamState) {
    const oldTeam = {
      name: currentTeamState.name,
      userId: currentTeamState.teamAdmin?.id,
    };
    const newTeam = { name, userId: teamAdmin?.id };
    const patchDifference = objectDifference(oldTeam, newTeam);

    try {
      const {
        data: { data, included },
      } = yield axios.patch(requestUrl, {
        team: objectToSnakeCase(patchDifference),
      });

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

      yield put(editSingleTeamSuccess(mappedData));
    } catch (error) {
      yield put(editSingleTeamFailure(error));
    }
  } else yield put(editSingleTeamFailure());
}

export default function* editSingleTeamSaga() {
  yield takeLatest(EDIT_SINGLE_TEAM_REQUEST, editSingleTeam);
}
