import axios from 'axios';
import { put, call, takeLatest } from 'redux-saga/effects';

import { jsonApiToArray } from 'utils/jsonApiMapper';

import { FETCH_INTERVENTIONS_REQUEST } from '../constants';
import { fetchInterventionsError, fetchInterventionsSuccess } from '../actions';

export function* fetchInterventions({ payload: { organizationId } }) {
  const interventionsRequestURL = `v1/${
    organizationId ? `organizations/${organizationId}/` : ''
  }interventions`;

  try {
    const { data } = yield call(axios.get, interventionsRequestURL);

    const interventions = jsonApiToArray(data, 'intervention');

    yield put(fetchInterventionsSuccess(interventions));
  } catch (error) {
    yield put(fetchInterventionsError(error));
  }
}

export default function* fetchInterventionsSaga() {
  yield takeLatest(FETCH_INTERVENTIONS_REQUEST, fetchInterventions);
}
