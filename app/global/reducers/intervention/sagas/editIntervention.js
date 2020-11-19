import { put, takeLatest, select, call } from 'redux-saga/effects';
import axios from 'axios';
import deepDiff from 'utils/libraries/deepDiff';

import { EDIT_INTERVENTION_REQUEST } from '../constants';

import { editInterventionSuccess, editInterventionError } from '../actions';

import {
  makeSelectCacheIntervention,
  makeSelectIntervention,
} from '../selectors';

export function* editIntervention() {
  const intervention = yield select(makeSelectIntervention());
  const cacheIntervention = yield select(makeSelectCacheIntervention());
  const requestURL = `v1/problems/${intervention.problem_id}/interventions/${
    intervention.id
  }`;

  const patchDifference = deepDiff(cacheIntervention, intervention);

  try {
    const {
      data: { data },
    } = yield call(axios.put, requestURL, { intervention: patchDifference });

    yield put(
      editInterventionSuccess({
        ...data.attributes,
        id: data.id,
      }),
    );
  } catch (error) {
    yield put(editInterventionError(error));
  }
}

export default function* editInterventionSaga() {
  yield takeLatest(EDIT_INTERVENTION_REQUEST, editIntervention);
}
