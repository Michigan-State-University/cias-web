import { put, takeLatest, call } from 'redux-saga/effects';
import axios from 'axios';

import { jsonApiToArray } from 'utils/jsonApiMapper';

import { FETCH_ORGANIZATIONS_REQUEST } from '../constants';
import {
  fetchOrganizationsFailure,
  fetchOrganizationsSuccess,
} from '../actions';

export function* fetchOrganizations() {
  const requestURL = `v1/organizations`;

  try {
    const { data } = yield call(axios.get, requestURL);

    const organizations = jsonApiToArray(data, 'organization');
    yield put(fetchOrganizationsSuccess(organizations || []));
  } catch (error) {
    yield put(fetchOrganizationsFailure(error));
  }
}

export default function* fetchOrganizationsSaga() {
  yield takeLatest(FETCH_ORGANIZATIONS_REQUEST, fetchOrganizations);
}
