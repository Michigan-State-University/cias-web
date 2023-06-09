import { put, takeLatest, call } from 'redux-saga/effects';
import axios from 'axios';
import { toast } from 'react-toastify';

import { jsonApiToArray } from 'utils/jsonApiMapper';
import objectToCamelCase from 'utils/objectToCamelCase';
import { formatMessage } from 'utils/intlOutsideReact';

import {
  ChartStatus,
  FETCH_SECTIONS_REQUEST,
  FETCH_SECTIONS_ERROR,
} from '../constants';
import {
  fetchDashboardSectionsError,
  fetchDashboardSectionsSuccess,
  setChartsData,
} from '../actions';
import messages from '../messages';

export function* fetchDashboardSections({
  payload: { organizationId, fromDashboardView },
}) {
  const suffix = fromDashboardView ? `?published=true` : '';
  const requestURL = `v1/organizations/${organizationId}/dashboard_sections${suffix}`;

  try {
    const { data } = yield call(axios.get, requestURL);
    const dashboardSections = jsonApiToArray(data, 'dashboardSection');

    yield put(fetchDashboardSectionsSuccess(dashboardSections));

    const availableChartStatuses = [ChartStatus.PUBLISHED];
    if (!fromDashboardView) {
      availableChartStatuses.push(ChartStatus.DATA_COLLECTION);
    }
    const chartDataUrl = `v1/organizations/${organizationId}/charts_data/generate`;
    const { data: chartsData } = yield call(axios.get, chartDataUrl, {
      params: { statuses: availableChartStatuses },
    });
    const parsedData = objectToCamelCase(chartsData.data_for_charts);
    yield put(setChartsData(parsedData));
  } catch (error) {
    yield call(
      toast.error,
      formatMessage(messages.filterChartDataError, {
        toastId: FETCH_SECTIONS_ERROR,
      }),
    );
    yield put(fetchDashboardSectionsError(error));
  }
}

export default function* fetchDashboardSectionsSaga() {
  yield takeLatest(FETCH_SECTIONS_REQUEST, fetchDashboardSections);
}
