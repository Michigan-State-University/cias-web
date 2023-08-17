import { takeLatest, put } from 'redux-saga/effects';
import axios from 'axios';

import { jsonApiToArray } from 'utils/jsonApiMapper';

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
    const { data } = yield axios.get(requestUrl.concat(params));

    const mappedData = jsonApiToArray(data, 'team');

    yield put(fetchTeamsSuccess(mappedData, data.meta.teams_size));
  } catch (error) {
    yield put(fetchTeamsFailure(error));
  }
}

export default function* fetchTeamsSaga() {
  yield takeLatest(FETCH_TEAMS_REQUEST, fetchTeams);
}
