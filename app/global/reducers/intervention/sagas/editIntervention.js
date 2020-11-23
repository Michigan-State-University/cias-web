import { put, takeLatest, select, call } from 'redux-saga/effects';
import axios from 'axios';

import pickFields from 'utils/pickFields';
import { EDIT_INTERVENTION_REQUEST } from '../constants';

import { editInterventionSuccess, editInterventionError } from '../actions';

import { makeSelectIntervention } from '../selectors';

export function* editIntervention({ fields } = {}) {
  const intervention = yield select(makeSelectIntervention());
  const requestURL = `v1/problems/${intervention.problem_id}/interventions/${
    intervention.id
  }`;

  const patchDifference = pickFields(intervention, fields);

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
