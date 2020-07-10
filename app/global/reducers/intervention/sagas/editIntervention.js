import { put, takeLatest, select } from 'redux-saga/effects';
import axios from 'axios';

import { EDIT_INTERVENTION_REQUEST } from '../constants';

import { editInterventionSuccess, editInterventionError } from '../actions';

import { makeSelectIntervention } from '../selectors';

function* editIntervention() {
  const intervention = yield select(makeSelectIntervention());
  const requestURL = `v1/interventions/${intervention.id}`;

  try {
    const {
      data: { data },
    } = yield axios.put(requestURL, { intervention });

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
