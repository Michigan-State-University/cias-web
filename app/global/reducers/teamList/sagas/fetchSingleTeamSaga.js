import { takeLatest, put } from 'redux-saga/effects';
import axios from 'axios';

import { jsonApiToObject } from 'utils/jsonApiMapper';

import { FETCH_SINGLE_TEAM_REQUEST } from '../constants';
import { fetchSingleTeamSuccess, fetchSingleTeamFailure } from '../actions';

function* fetchSingleTeam({ payload: { id } }) {
  const requestUrl = `/v1/teams/${id}`;

  try {
    const { data } = yield axios.get(requestUrl);

    const mappedData = jsonApiToObject(data, 'team');

    yield put(fetchSingleTeamSuccess(mappedData));
  } catch (error) {
    yield put(fetchSingleTeamFailure(error));
  }
}

export default function* fetchSingleTeamSaga() {
  yield takeLatest(FETCH_SINGLE_TEAM_REQUEST, fetchSingleTeam);
}
