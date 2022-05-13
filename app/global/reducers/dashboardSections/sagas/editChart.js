import { put, takeLatest, call, select } from 'redux-saga/effects';
import axios from 'axios';

import { jsonApiToObject } from 'utils/jsonApiMapper';
import objectToSnakeCase from 'utils/objectToSnakeCase';

import objectToCamelCase from 'utils/objectToCamelCase';
import { makeSelectOrganization } from 'global/reducers/organizations';
import { ChartStatus, EDIT_CHART_REQUEST } from '../constants';
import { editChartError, editChartSuccess, setChartsData } from '../actions';

export function* editChart({ payload: { chart } }) {
  const requestURL = `v1/charts/${chart.id}`;

  try {
    const { data } = yield call(
      axios.patch,
      requestURL,
      objectToSnakeCase({
        chart,
      }),
    );
    const updatedChart = jsonApiToObject(data, 'chart');
    yield put(editChartSuccess(updatedChart));

    if (chart.status === ChartStatus.DATA_COLLECTION) {
      const organization = yield select(makeSelectOrganization());
      const chartDataUrl = `v1/organizations/${organization.id}/charts_data/${chart.id}/generate`;
      const { data: chartsData } = yield call(axios.get, chartDataUrl, {
        params: {
          statuses: [ChartStatus.DATA_COLLECTION, ChartStatus.PUBLISHED],
        },
      });
      const parsedData = objectToCamelCase(chartsData);
      yield put(setChartsData(parsedData));
    }
  } catch (error) {
    yield put(editChartError(error));
  }
}

export default function* editChartSaga() {
  yield takeLatest(EDIT_CHART_REQUEST, editChart);
}
