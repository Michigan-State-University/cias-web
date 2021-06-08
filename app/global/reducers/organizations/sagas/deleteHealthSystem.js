import { put, takeLatest, call, select } from 'redux-saga/effects';
import axios from 'axios';
import { toast } from 'react-toastify';

import { formatMessage } from 'utils/intlOutsideReact';

import {
  DELETE_HEALTH_SYSTEM_ERROR,
  DELETE_HEALTH_SYSTEM_REQUEST,
  DELETE_HEALTH_SYSTEM_SUCCESS,
  EntityType,
} from '../constants';
import {
  deleteHealthSystemFailure,
  deleteHealthSystemSuccess,
  selectEntityAction,
} from '../actions';
import messages from '../messages';
import { makeSelectOrganization } from '../selectors';

export function* deleteHealthSystem({ payload: { id } }) {
  const requestURL = `v1/health_systems/${id}`;

  try {
    yield call(axios.delete, requestURL);

    yield put(deleteHealthSystemSuccess(id));

    yield call(
      toast.success,
      formatMessage(messages.deleteHealthSystemSuccess),
      {
        toastId: DELETE_HEALTH_SYSTEM_SUCCESS,
      },
    );

    const organization = yield select(makeSelectOrganization());

    // Go to the parent Organization
    yield put(selectEntityAction(organization.id, EntityType.organization));
  } catch (error) {
    yield put(deleteHealthSystemFailure(error));

    yield call(toast.error, formatMessage(messages.deleteHealthSystemError), {
      toastId: DELETE_HEALTH_SYSTEM_ERROR,
    });
  }
}

export default function* deleteHealthSystemSaga() {
  yield takeLatest(DELETE_HEALTH_SYSTEM_REQUEST, deleteHealthSystem);
}
