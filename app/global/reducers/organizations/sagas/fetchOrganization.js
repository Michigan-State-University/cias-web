import { put, takeLatest, call } from 'redux-saga/effects';
import axios from 'axios';

import { jsonApiToObject } from 'utils/jsonApiMapper';
import { FETCH_ORGANIZATION_REQUEST } from '../constants';
import { fetchOrganizationFailure, fetchOrganizationSuccess } from '../actions';

export function* fetchOrganization({ payload: { id } }) {
  const requestURL = `v1/organizations/${id}`;

  try {
    const { data } = yield call(axios.get, requestURL);
    const organization = jsonApiToObject(data, 'organization');

    yield put(fetchOrganizationSuccess(organization));
  } catch (error) {
    yield put(fetchOrganizationFailure(error));
  }
}

export default function* fetchOrganizationSaga() {
  yield takeLatest(FETCH_ORGANIZATION_REQUEST, fetchOrganization);
}
