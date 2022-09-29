import { takeLatest, put, call } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import axios from 'axios';

import { formatMessage } from 'utils/intlOutsideReact';
import objectToSnakeCase from 'utils/objectToSnakeCase';
import { jsonApiToObject } from 'utils/jsonApiMapper';

import { createTeamSuccess, createTeamFailure } from '../actions';
import { CREATE_TEAM_REQUEST } from '../constants';

import messages from './messages';

function* createTeam({ payload: { name, userId } }) {
  const requestUrl = `/v1/teams`;
  try {
    const { data } = yield axios.post(
      requestUrl,
      objectToSnakeCase({ team: { name, userId } }),
    );

    const mappedData = jsonApiToObject(data, 'team');

    yield put(createTeamSuccess(mappedData));
    yield call(toast.success, formatMessage(messages.createTeamSuccess));
  } catch (error) {
    yield put(createTeamFailure());
    yield call(toast.error, formatMessage(messages.createTeamFailure));
  }
}

export default function* createTeamSaga() {
  yield takeLatest(CREATE_TEAM_REQUEST, createTeam);
}
