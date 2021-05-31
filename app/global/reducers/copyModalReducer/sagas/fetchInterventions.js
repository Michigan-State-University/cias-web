import axios from 'axios';
import { put, call, takeLatest } from 'redux-saga/effects';

import { FETCH_INTERVENTIONS_REQUEST } from '../constants';
import { fetchInterventionsError, fetchInterventionsSuccess } from '../actions';

export function* fetchInterventions({ payload: { organizationId } }) {
  const interventionsRequestURL = `v1/${
    organizationId ? `organizations/${organizationId}/` : ''
  }interventions`;

  try {
    const {
      data: { interventions },
    } = yield call(axios.get, interventionsRequestURL);

    yield put(fetchInterventionsSuccess(interventions));
  } catch (error) {
    yield put(fetchInterventionsError(error));
  }
}

export default function* fetchInterventionsSaga() {
  yield takeLatest(FETCH_INTERVENTIONS_REQUEST, fetchInterventions);
}
