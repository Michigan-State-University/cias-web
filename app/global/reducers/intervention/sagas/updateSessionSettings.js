import { put, takeLatest, select, call } from 'redux-saga/effects';
import axios from 'axios';

import pickFields from 'utils/pickFields';
import {
  updateInterventionSettingsSuccess,
  updateInterventionSettingsError,
} from '../actions';
import { UPDATE_INTERVENTION_SETTINGS_REQUEST } from '../constants';
import {
  makeSelectCurrentInterventionIndex,
  makeSelectProblem,
} from '../selectors';

export function* updateSessionSettings({ fields } = {}) {
  const interventionIndex = yield select(makeSelectCurrentInterventionIndex());
  const problem = yield select(makeSelectProblem());
  const intervention = problem.interventions[interventionIndex];

  const requestURL = `v1/interventions/${
    intervention.intervention_id
  }/sessions/${intervention.id}`;

  const patchDifference = pickFields(intervention, fields);

  try {
    yield call(axios.put, requestURL, { session: patchDifference });
    yield put(updateInterventionSettingsSuccess());
  } catch (error) {
    yield put(updateInterventionSettingsError());
  }
}

export default function* updateSessionSettingsSaga() {
  yield takeLatest(UPDATE_INTERVENTION_SETTINGS_REQUEST, updateSessionSettings);
}
