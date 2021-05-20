import { put, takeLatest, call } from 'redux-saga/effects';
import axios from 'axios';

import { jsonApiToObject } from 'utils/jsonApiMapper';
import { FETCH_SECTION_REQUEST } from '../constants';
import {
  fetchDashboardSectionError,
  fetchDashboardSectionSuccess,
} from '../actions';

export function* fetchDashboardSection({
  payload: { organizationId, dashboardSectionId },
}) {
  const requestURL = `v1/organizations/${organizationId}/dashboard_sections/${dashboardSectionId}`;

  try {
    const { data } = yield call(axios.get, requestURL);
    const dashboardSection = jsonApiToObject(data, 'dashboardSection');

    yield put(fetchDashboardSectionSuccess(dashboardSection));
  } catch (error) {
    yield put(fetchDashboardSectionError(error));
  }
}

export default function* fetchDashboardSectionSaga() {
  yield takeLatest(FETCH_SECTION_REQUEST, fetchDashboardSection);
}
