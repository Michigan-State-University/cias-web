import { put, takeLatest, call } from 'redux-saga/effects';
import axios from 'axios';

import { jsonApiToArray } from 'utils/jsonApiMapper';
import { FETCH_SECTIONS_REQUEST } from '../constants';
import {
  fetchDashboardSectionsError,
  fetchDashboardSectionsSuccess,
} from '../actions';

export function* fetchDashboardSections({ payload: { organizationId } }) {
  const requestURL = `v1/organizations/${organizationId}/dashboard_sections`;

  try {
    const { data } = yield call(axios.get, requestURL);
    const dashboardSections = jsonApiToArray(data, 'dashboardSection');

    yield put(fetchDashboardSectionsSuccess(dashboardSections));
  } catch (error) {
    yield put(fetchDashboardSectionsError(error));
  }
}

export default function* fetchDashboardSectionsSaga() {
  yield takeLatest(FETCH_SECTIONS_REQUEST, fetchDashboardSections);
}
