import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

import { defaultMapper } from 'utils/mapResponseObjects';

import { FETCH_INTERVENTIONS_REQUEST } from '../constants';
import { fetchInterventionsSuccess, fetchInterventionsError } from '../actions';

function* fetchInterventions() {
  const requestURL = `v1/interventions`;

  try {
    const {
      data: { data },
    } = yield axios.get(requestURL);
    const mappedData = data.map(defaultMapper);
    yield put(fetchInterventionsSuccess(mappedData));
  } catch (error) {
    yield put(fetchInterventionsError(error));
  }
}

export default function* fetchInterventionsSaga() {
  yield takeLatest(FETCH_INTERVENTIONS_REQUEST, fetchInterventions);
}
