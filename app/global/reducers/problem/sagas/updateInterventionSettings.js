import { put, takeLatest, select, call } from 'redux-saga/effects';
import axios from 'axios';

import deepDiff from 'utils/libraries/deepDiff';
import {
  updateInterventionSettingsSuccess,
  updateInterventionSettingsError,
} from '../actions';
import { UPDATE_INTERVENTION_SETTINGS_REQUEST } from '../constants';
import {
  makeSelectCacheProblem,
  makeSelectCurrentInterventionIndex,
  makeSelectProblem,
} from '../selectors';

export function* updateInterventionSettings() {
  const interventionIndex = yield select(makeSelectCurrentInterventionIndex());
  const problem = yield select(makeSelectProblem());
  const cachedProblem = yield select(makeSelectCacheProblem());
  const intervention = problem.interventions[interventionIndex];
  const cacheIntervention = cachedProblem.interventions[interventionIndex];

  const requestURL = `v1/problems/${intervention.problem_id}/interventions/${
    intervention.id
  }`;

  const patchDifference = deepDiff(cacheIntervention, intervention);

  try {
    yield call(axios.put, requestURL, { intervention: patchDifference });
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
