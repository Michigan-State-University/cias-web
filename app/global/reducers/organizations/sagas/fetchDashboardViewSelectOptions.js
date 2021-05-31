import { put, takeLatest, call, select } from 'redux-saga/effects';
import axios from 'axios';

import { jsonApiToArray } from 'utils/jsonApiMapper';
import { makeSelectUserRoles } from 'global/reducers/auth';
import {
  FETCH_DASHBOARD_VIEW_SELECT_OPTIONS_REQUEST,
  mapRoleToFetchEndpoint,
  mapRoleToDashboardViewJsonKey,
} from '../constants';
import {
  fetchDashboardViewSelectOptionsFailure,
  fetchDashboardViewSelectOptionsSuccess,
} from '../actions';

export function* fetchDashboardViewSelectOptions({
  payload: { organizableId },
}) {
  const userRoles = yield select(makeSelectUserRoles());
  const mainRole = userRoles[0];
  const requestURL = mapRoleToFetchEndpoint(mainRole, organizableId);
  const roleJsonApiKey = mapRoleToDashboardViewJsonKey(mainRole);

  try {
    const { data } = yield call(axios.get, requestURL);
    const mappedData = jsonApiToArray(data, roleJsonApiKey);
    yield put(fetchDashboardViewSelectOptionsSuccess(mappedData));
  } catch (error) {
    yield put(fetchDashboardViewSelectOptionsFailure(error));
  }
}

export default function* fetchDashboardViewSelectOptionsSaga() {
  yield takeLatest(
    FETCH_DASHBOARD_VIEW_SELECT_OPTIONS_REQUEST,
    fetchDashboardViewSelectOptions,
  );
}
