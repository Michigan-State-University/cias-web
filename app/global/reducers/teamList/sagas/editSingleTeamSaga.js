import { takeLatest, put, select, call } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import axios from 'axios';

import { jsonApiToObject } from 'utils/jsonApiMapper';
import objectToSnakeCase from 'utils/objectToSnakeCase';
import { formatMessage } from 'utils/intlOutsideReact';
import { objectDifference } from 'utils/objectDifference';

import { EDIT_SINGLE_TEAM_REQUEST } from '../constants';
import { editSingleTeamSuccess, editSingleTeamFailure } from '../actions';
import { makeSelectSingleTeam } from '../selectors';
import messages from './messages';

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
      const { data } = yield axios.patch(requestUrl, {
        team: objectToSnakeCase(patchDifference),
      });

      const mappedData = jsonApiToObject(data, 'team');

      yield put(editSingleTeamSuccess(mappedData));
    } catch (error) {
      yield put(editSingleTeamFailure(error));
      yield call(
        toast.error,
        error.response?.data?.message ||
          formatMessage(messages.editTeamFailure),
      );
    }
  } else yield put(editSingleTeamFailure());
}

export default function* editSingleTeamSaga() {
  yield takeLatest(EDIT_SINGLE_TEAM_REQUEST, editSingleTeam);
}
