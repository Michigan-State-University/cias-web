import { put, takeLatest, call } from 'redux-saga/effects';
import axios from 'axios';

import { jsonApiToArray } from 'utils/jsonApiMapper';
import objectToCamelCase from 'utils/objectToCamelCase';
import { FETCH_SECTIONS_REQUEST } from '../constants';
import {
  fetchDashboardSectionsError,
  fetchDashboardSectionsSuccess,
  setChartsData,
} from '../actions';

export function* fetchDashboardSections({
  payload: { organizationId, fromDashboardView },
}) {
  const suffix = fromDashboardView ? `?published=true` : '';
  const requestURL = `v1/organizations/${organizationId}/dashboard_sections${suffix}`;

  try {
    const { data } = yield call(axios.get, requestURL);
    const dashboardSections = jsonApiToArray(data, 'dashboardSection');

    yield put(fetchDashboardSectionsSuccess(dashboardSections));

    let chartDataSuffix = `?statuses[]=published`;
    if (!fromDashboardView) {
      chartDataSuffix += `&statuses[]=data_collection`;
    }
    const chartDataUrl = `v1/organizations/${organizationId}/charts_data/generate${chartDataSuffix}`;
    const { data: chartsData } = yield call(axios.get, chartDataUrl);
    const parsedData = objectToCamelCase(chartsData.data_for_charts);
    yield put(setChartsData(parsedData));
  } catch (error) {
    yield put(fetchDashboardSectionsError(error));
  }
}

export default function* fetchDashboardSectionsSaga() {
  yield takeLatest(FETCH_SECTIONS_REQUEST, fetchDashboardSections);
}
