import { put, takeLatest, call } from 'redux-saga/effects';
import axios from 'axios';

import { jsonApiToObject } from 'utils/jsonApiMapper';
import objectToSnakeCase from 'utils/objectToSnakeCase';

import { EDIT_SECTION_REQUEST } from '../constants';
import {
  editDashboardSectionError,
  editDashboardSectionSuccess,
} from '../actions';

export function* editDashboardSection({ payload: { dashboardSection } }) {
  const requestURL = `v1/organizations/${
    dashboardSection.organizationId
  }/dashboard_sections`;

  try {
    const { data } = yield call(
      axios.patch,
      requestURL,
      objectToSnakeCase({ dashboardSection }),
    );
    const updatedDashboardSection = jsonApiToObject(data, 'dashboardSection');

    yield put(editDashboardSectionSuccess(updatedDashboardSection));
  } catch (error) {
    yield put(editDashboardSectionError(error));
  }
}

export default function* editDashboardSectionSaga() {
  yield takeLatest(EDIT_SECTION_REQUEST, editDashboardSection);
}
