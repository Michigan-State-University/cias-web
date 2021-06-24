import { put, takeLatest, call, select } from 'redux-saga/effects';
import axios from 'axios';

import { jsonApiToObject } from 'utils/jsonApiMapper';
import objectKeysToSnakeCase from 'utils/objectToSnakeCase';

import { ADD_CLINIC_REQUEST, EntityType } from '../constants';
import {
  addClinicFailure,
  addClinicSuccess,
  selectEntityAction,
} from '../actions';
import { makeSelectHealthSystem } from '../selectors';

export function* addClinic({ payload: { healthSystemId, name } }) {
  const requestURL = `v1/health_clinics`;
  const healthSystem = yield select(makeSelectHealthSystem(healthSystemId));

  try {
    const { data } = yield call(
      axios.post,
      requestURL,
      objectKeysToSnakeCase({
        healthClinic: {
          name: name ?? `New Clinic ${healthSystem.healthClinics.length + 1}`,
          healthSystemId,
        },
      }),
    );

    const clinic = jsonApiToObject(data, 'healthClinic');

    yield put(addClinicSuccess(clinic));

    // select newly created Clinic
    yield put(selectEntityAction(clinic.id, EntityType.clinic, healthSystemId));
  } catch (error) {
    yield put(addClinicFailure(error));
  }
}

export default function* addClinicSaga() {
  yield takeLatest(ADD_CLINIC_REQUEST, addClinic);
}
