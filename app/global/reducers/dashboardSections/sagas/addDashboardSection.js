import { put, takeLatest, call, select } from 'redux-saga/effects';
import axios from 'axios';

import { jsonApiToObject } from 'utils/jsonApiMapper';
import objectToSnakeCase from 'utils/objectToSnakeCase';

import { makeSelectDashboardSections } from '../selectors';
import { ADD_SECTION_REQUEST } from '../constants';
import {
  addDashboardSectionError,
  addDashboardSectionSuccess,
} from '../actions';

export function* addDashboardSection({ payload: { organizationId, name } }) {
  const requestURL = `v1/organizations/${organizationId}/dashboard_sections`;

  const dashboardSections = yield select(makeSelectDashboardSections());

  try {
    const { data } = yield call(
      axios.post,
      requestURL,
      objectToSnakeCase({
        dashboardSection: {
          name: name ?? `New Section ${dashboardSections.length}`,
        },
      }),
    );
    const dashboardSection = jsonApiToObject(data, 'dashboardSection');

    yield put(addDashboardSectionSuccess(dashboardSection));
  } catch (error) {
    yield put(addDashboardSectionError(error));
  }
}

export default function* addDashboardSectionSaga() {
  yield takeLatest(ADD_SECTION_REQUEST, addDashboardSection);
}
