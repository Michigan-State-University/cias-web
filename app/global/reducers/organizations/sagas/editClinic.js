import { put, takeLatest, call } from 'redux-saga/effects';
import axios from 'axios';
import { toast } from 'react-toastify';

import { jsonApiToObject } from 'utils/jsonApiMapper';
import objectKeysToSnakeCase from 'utils/objectToSnakeCase';
import { formatMessage } from 'utils/intlOutsideReact';
import { getObjectKeysWithoutIds } from 'utils/getObjectKeys';

import { EDIT_CLINIC_REQUEST } from '../constants';
import { editClinicFailure, editClinicSuccess } from '../actions';
import messages from '../messages';

export function* editClinic({ payload: { clinic } }) {
  const requestURL = `v1/health_clinics/${clinic.id}`;

  try {
    const { data } = yield call(
      axios.patch,
      requestURL,
      objectKeysToSnakeCase({
        healthClinic: clinic,
      }),
    );

    const updatedClinic = jsonApiToObject(data, 'healthClinic');

    yield put(editClinicSuccess(updatedClinic));
  } catch (error) {
    yield call(
      toast.error,
      formatMessage(messages.editEntityError, {
        properties: JSON.stringify(getObjectKeysWithoutIds(clinic)),
      }),
    );
    yield put(editClinicFailure(error));
  }
}

export default function* editClinicSaga() {
  yield takeLatest(EDIT_CLINIC_REQUEST, editClinic);
}
