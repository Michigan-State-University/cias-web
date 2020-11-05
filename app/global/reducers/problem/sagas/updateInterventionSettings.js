import { put, takeLatest, select, call } from 'redux-saga/effects';
import axios from 'axios';

import {
  updateInterventionSettingsSuccess,
  updateInterventionSettingsError,
} from '../actions';
import { UPDATE_INTERVENTION_SETTINGS_REQUEST } from '../constants';
import {
  makeSelectCurrentInterventionIndex,
  makeSelectProblem,
} from '../selectors';

export function* updateInterventionSettings() {
  const interventionIndex = yield select(makeSelectCurrentInterventionIndex());
  const problem = yield select(makeSelectProblem());
  const intervention = problem.interventions[interventionIndex];
  const requestURL = `v1/problems/${intervention.problem_id}/interventions/${
    intervention.id
  }`;

  try {
    yield call(axios.put, requestURL, { intervention });
    yield put(updateInterventionSettingsSuccess());
  } catch (error) {
    yield put(updateInterventionSettingsError());
  }
}

export default function* updateInterventionSettingsSaga() {
  yield takeLatest(
    UPDATE_INTERVENTION_SETTINGS_REQUEST,
    updateInterventionSettings,
  );
}
