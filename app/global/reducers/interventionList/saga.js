import axios from 'axios';
import { put, takeLatest, all } from 'redux-saga/effects';

import { mapInterventionToStateObject } from 'utils/mapResponseObjects';
import { FETCH_INTERVENTIONS_REQUEST } from './constants';

import { fetchInterventionsSuccess, fetchInterventionsError } from './actions';

function* fetchInterventions() {
  const requestURL = `v1/interventions`;

  try {
    const {
      data: { data },
    } = yield axios.get(requestURL);
    const mappedData = data.map(mapInterventionToStateObject);
    yield put(fetchInterventionsSuccess(mappedData));
  } catch (error) {
    yield put(fetchInterventionsError(error));
  }
}

export function* interventionListSaga() {
  yield all([
    yield takeLatest(FETCH_INTERVENTIONS_REQUEST, fetchInterventions),
  ]);
}
