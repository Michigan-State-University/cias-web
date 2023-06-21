import { put, takeLatest, select, call } from 'redux-saga/effects';
import axios from 'axios';

import pickFields from 'utils/pickFields';
import objectToSnakeCase from 'utils/objectToSnakeCase';

import {
  updateSessionSettingsSuccess,
  updateSessionSettingsError,
} from '../actions';
import { UPDATE_SESSION_SETTINGS_REQUEST } from '../constants';
import {
  makeSelectCurrentSessionIndex,
  makeSelectIntervention,
} from '../selectors';

export function* updateSessionSettings({ fields } = {}) {
  const sessionIndex = yield select(makeSelectCurrentSessionIndex());
  const intervention = yield select(makeSelectIntervention());
  const session = intervention.sessions[sessionIndex];

  const requestURL = `v1/interventions/${
    session?.interventionId ?? session?.intervention_id
  }/sessions/${session.id}`;

  const changes = pickFields(session, fields);

  try {
    yield call(axios.put, requestURL, {
      session: objectToSnakeCase(changes),
    });
    yield put(updateSessionSettingsSuccess());
  } catch (error) {
    yield put(updateSessionSettingsError());
  }
}

export default function* updateSessionSettingsSaga() {
  yield takeLatest(UPDATE_SESSION_SETTINGS_REQUEST, updateSessionSettings);
}
