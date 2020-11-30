import { put, takeLatest, select, call } from 'redux-saga/effects';
import axios from 'axios';

import pickFields from 'utils/pickFields';
import { EDIT_INTERVENTION_REQUEST } from '../constants';

import { editInterventionSuccess, editInterventionError } from '../actions';

import { makeSelectSession } from '../selectors';

export function* editSession({ fields } = {}) {
  const intervention = yield select(makeSelectSession());
  const requestURL = `v1/interventions/${
    intervention.intervention_id
  }/sessions/${intervention.id}`;

  const patchDifference = pickFields(intervention, fields);

  try {
    const {
      data: { data },
    } = yield call(axios.put, requestURL, { session: patchDifference });

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

export default function* editSessionSaga() {
  yield takeLatest(EDIT_INTERVENTION_REQUEST, editSession);
}
