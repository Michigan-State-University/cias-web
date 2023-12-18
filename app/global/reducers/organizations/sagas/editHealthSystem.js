import { put, takeLatest, call } from 'redux-saga/effects';
import axios from 'axios';
import { toast } from 'react-toastify';

import { jsonApiToObject } from 'utils/jsonApiMapper';
import objectKeysToSnakeCase from 'utils/objectToSnakeCase';
import { getObjectKeysWithoutIds } from 'utils/getObjectKeys';
import { formatApiErrorMessage } from 'utils/formatApiErrorMessage';

import { editHealthSystemFailure, editHealthSystemSuccess } from '../actions';
import { EDIT_HEALTH_SYSTEM_REQUEST } from '../constants';
import messages from '../messages';

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
    const objectKeys = getObjectKeysWithoutIds(healthSystem);
    yield call(
      toast.error,
      formatApiErrorMessage(error, messages.editEntityError, {
        properties: objectKeys.join(', '),
        propertiesCount: objectKeys.length,
      }),
    );
    yield put(editHealthSystemFailure(error));
  }
}

export default function* editHealthSystemSaga() {
  yield takeLatest(EDIT_HEALTH_SYSTEM_REQUEST, editHealthSystem);
}
