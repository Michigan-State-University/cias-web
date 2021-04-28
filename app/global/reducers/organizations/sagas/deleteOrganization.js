import { put, takeLatest, call, select } from 'redux-saga/effects';
import axios from 'axios';
import { push } from 'connected-react-router';

import { DELETE_ORGANIZATION_REQUEST } from '../constants';
import {
  deleteOrganizationFailure,
  deleteOrganizationSuccess,
} from '../actions';
import { makeSelectOrganizations } from '../selectors';

export function* deleteOrganization({ payload: { id } }) {
  const requestURL = `v1/organizations/${id}`;

  try {
    yield call(axios.delete, requestURL);

    yield put(deleteOrganizationSuccess(id));

    const organizations = yield select(makeSelectOrganizations());

    // Go to the newest Organization if exists
    if (organizations.length)
      yield put(push(`/organization/${organizations[0].id}`));
  } catch (error) {
    yield put(deleteOrganizationFailure(error));
  }
}

export default function* deleteOrganizationSaga() {
  yield takeLatest(DELETE_ORGANIZATION_REQUEST, deleteOrganization);
}
