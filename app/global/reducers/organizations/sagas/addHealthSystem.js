import { put, takeLatest, call, select } from 'redux-saga/effects';
import axios from 'axios';

import { jsonApiToObject } from 'utils/jsonApiMapper';
import objectKeysToSnakeCase from 'utils/objectToSnakeCase';

import { ADD_HEALTH_SYSTEM_REQUEST, EntityType } from '../constants';
import {
  addHealthSystemFailure,
  addHealthSystemSuccess,
  selectEntityAction,
} from '../actions';
import { makeSelectOrganizationHealthSystemsSize } from '../selectors';

export function* addHealthSystem({ payload: { name, organizationId } }) {
  const requestURL = `v1/health_systems`;
  const healthSystemsSize = yield select(
    makeSelectOrganizationHealthSystemsSize(),
  );

  try {
    const { data } = yield call(
      axios.post,
      requestURL,
      objectKeysToSnakeCase({
        healthSystem: {
          name: name ?? `New Health System ${healthSystemsSize + 1}`,
          organizationId,
        },
      }),
    );

    const healthSystem = jsonApiToObject(data, 'healthSystem');

    yield put(addHealthSystemSuccess(healthSystem));

    // select newly created Health System
    yield put(selectEntityAction(healthSystem.id, EntityType.healthSystem));
  } catch (error) {
    yield put(addHealthSystemFailure(error));
  }
}

export default function* addHealthSystemSaga() {
  yield takeLatest(ADD_HEALTH_SYSTEM_REQUEST, addHealthSystem);
}
