import { put, takeLatest, call, select } from 'redux-saga/effects';
import axios from 'axios';

import { jsonApiToArray } from 'utils/jsonApiMapper';
import { Roles } from 'models/User/UserRoles';
import { makeSelectUserRoles } from 'global/reducers/auth';
import { FETCH_ORGANIZATIONS_REQUEST } from '../constants';
import {
  fetchOrganizationsFailure,
  fetchOrganizationsSuccess,
} from '../actions';

export function* fetchOrganizations() {
  const requestURL = `v1/organizations`;

  try {
    const userRoles = yield select(makeSelectUserRoles());
    const { data } = yield call(axios.get, requestURL);
    const jsonApiKey = userRoles.includes(Roles.clinicAdmin)
      ? 'simpleOrganization'
      : 'organization';
    const organizations = jsonApiToArray(data, jsonApiKey);
    yield put(fetchOrganizationsSuccess(organizations || []));
  } catch (error) {
    yield put(fetchOrganizationsFailure(error));
  }
}

export default function* fetchOrganizationsSaga() {
  yield takeLatest(FETCH_ORGANIZATIONS_REQUEST, fetchOrganizations);
}
