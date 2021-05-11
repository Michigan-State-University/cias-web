import { put, takeLatest, call } from 'redux-saga/effects';
import axios from 'axios';
import { toast } from 'react-toastify';

import { formatMessage } from 'utils/intlOutsideReact';

import {
  DELETE_CLINIC_ERROR,
  DELETE_CLINIC_REQUEST,
  DELETE_CLINIC_SUCCESS,
  EntityType,
} from '../constants';
import {
  deleteClinicFailure,
  deleteClinicSuccess,
  selectEntityAction,
} from '../actions';
import messages from '../messages';

export function* deleteClinic({ payload: { id, healthSystemId } }) {
  const requestURL = `v1/health_clinics/${id}`;

  try {
    yield call(axios.delete, requestURL);

    yield put(deleteClinicSuccess(id, healthSystemId));

    yield call(toast.success, formatMessage(messages.deleteClinicSuccess), {
      toastId: DELETE_CLINIC_SUCCESS,
    });

    // Go to the parent Health System
    yield put(selectEntityAction(healthSystemId, EntityType.healthSystem));
  } catch (error) {
    yield put(deleteClinicFailure(error));

    yield call(toast.error, formatMessage(messages.deleteClinicError), {
      toastId: DELETE_CLINIC_ERROR,
    });
  }
}

export default function* deleteClinicSaga() {
  yield takeLatest(DELETE_CLINIC_REQUEST, deleteClinic);
}
