import { put, takeLatest, call, select } from 'redux-saga/effects';
import axios from 'axios';
import { push } from 'connected-react-router';
import { toast } from 'react-toastify';

import { formatMessage } from 'utils/intlOutsideReact';

import {
  DELETE_ORGANIZATION_ERROR,
  DELETE_ORGANIZATION_REQUEST,
  DELETE_ORGANIZATION_SUCCESS,
} from '../constants';
import {
  deleteOrganizationFailure,
  deleteOrganizationSuccess,
} from '../actions';
import { makeSelectOrganizations } from '../selectors';
import messages from '../messages';

export function* deleteOrganization({ payload: { id } }) {
  const requestURL = `v1/organizations/${id}`;

  try {
    yield call(axios.delete, requestURL);

    yield put(deleteOrganizationSuccess(id));

    const organizations = yield select(makeSelectOrganizations());

    yield call(
      toast.success,
      formatMessage(messages.deleteOrganizationSuccess),
      {
        toastId: DELETE_ORGANIZATION_SUCCESS,
      },
    );

    // Go to the newest Organization if exists
    if (organizations.length)
      yield put(push(`/organization/${organizations[0].id}`));
  } catch (error) {
    yield put(deleteOrganizationFailure(error));

    yield call(toast.error, formatMessage(messages.deleteOrganizationError), {
      toastId: DELETE_ORGANIZATION_ERROR,
    });
  }
}

export default function* deleteOrganizationSaga() {
  yield takeLatest(DELETE_ORGANIZATION_REQUEST, deleteOrganization);
}
