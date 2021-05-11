import { put, takeLatest, call } from 'redux-saga/effects';
import axios from 'axios';

import { jsonApiToObject } from 'utils/jsonApiMapper';
import objectKeysToSnakeCase from 'utils/objectToSnakeCase';
import { EDIT_HEALTH_SYSTEM_REQUEST } from '../constants';
import { editHealthSystemFailure, editHealthSystemSuccess } from '../actions';

export function* editHealthSystem({ payload: { healthSystem } }) {
  const requestURL = `v1/health_systems/${healthSystem.id}`;

  try {
    const { data } = yield call(
      axios.patch,
      requestURL,
      objectKeysToSnakeCase({ healthSystem }),
    );

    const updatedHealthSystem = jsonApiToObject(data, 'healthSystem');

    yield put(editHealthSystemSuccess(updatedHealthSystem));
  } catch (error) {
    yield put(editHealthSystemFailure(error));
  }
}

export default function* editHealthSystemSaga() {
  yield takeLatest(EDIT_HEALTH_SYSTEM_REQUEST, editHealthSystem);
}
