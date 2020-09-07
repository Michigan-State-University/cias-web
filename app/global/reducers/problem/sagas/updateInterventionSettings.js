import { put, takeLatest, select } from 'redux-saga/effects';
import axios from 'axios';

import { editProblemError } from '../actions';
import { UPDATE_INTERVENTION_SETTINGS } from '../constants';
import {
  makeSelectCurrentInterventionIndex,
  makeSelectProblem,
} from '../selectors';

function* updateInterventionSettings() {
  const interventionIndex = yield select(makeSelectCurrentInterventionIndex());
  const problem = yield select(makeSelectProblem());
  const intervention = problem.interventions[interventionIndex];
  const requestURL = `v1/problems/${intervention.problem_id}/interventions/${
    intervention.id
  }`;

  try {
    yield axios.put(requestURL, { intervention });
  } catch (error) {
    yield put(editProblemError(error));
  }
}

export default function* updateInterventionSettingsSaga() {
  yield takeLatest(UPDATE_INTERVENTION_SETTINGS, updateInterventionSettings);
}
