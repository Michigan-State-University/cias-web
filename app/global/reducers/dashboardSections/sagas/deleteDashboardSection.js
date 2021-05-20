import { put, takeLatest, call } from 'redux-saga/effects';
import axios from 'axios';

import { DELETE_SECTION_REQUEST } from '../constants';
import {
  deleteDashboardSectionError,
  deleteDashboardSectionSuccess,
} from '../actions';

export function* deleteDashboardSection({
  payload: { dashboardSectionId, organizationId },
}) {
  const requestURL = `v1/organizations/${organizationId}/dashboard_sections/${dashboardSectionId}`;

  try {
    yield call(axios.delete, requestURL);

    yield put(
      deleteDashboardSectionSuccess(dashboardSectionId, organizationId),
    );
  } catch (error) {
    yield put(deleteDashboardSectionError(error));
  }
}

export default function* deleteDashboardSectionSaga() {
  yield takeLatest(DELETE_SECTION_REQUEST, deleteDashboardSection);
}
