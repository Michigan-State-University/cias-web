import { put, takeLatest, call } from 'redux-saga/effects';
import axios from 'axios';

import { jsonApiToObject } from 'utils/jsonApiMapper';
import { FETCH_CLINIC_REQUEST } from '../constants';
import { fetchClinicFailure, fetchClinicSuccess } from '../actions';

export function* fetchClinic({ payload: { id } }) {
  const requestURL = `v1/health_clinics/${id}`;

  try {
    const { data } = yield call(axios.get, requestURL);
    const clinic = jsonApiToObject(data, 'healthClinic');

    yield put(fetchClinicSuccess(clinic));
  } catch (error) {
    yield put(fetchClinicFailure(error));
  }
}

export default function* fetchClinicSaga() {
  yield takeLatest(FETCH_CLINIC_REQUEST, fetchClinic);
}
