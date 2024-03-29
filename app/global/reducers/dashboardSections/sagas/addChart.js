import { put, takeLatest, call } from 'redux-saga/effects';
import axios from 'axios';

import { ChartIntervalType } from 'models/Chart';

import { jsonApiToObject } from 'utils/jsonApiMapper';
import objectToSnakeCase from 'utils/objectToSnakeCase';
import { colors } from 'theme';

import { ADD_CHART_REQUEST } from '../constants';
import { addChartError, addChartSuccess, selectChartAction } from '../actions';

export function* addChart({
  payload: { name, description, dashboardSectionId, chartType },
}) {
  const requestURL = `v1/charts`;

  try {
    const { data } = yield call(
      axios.post,
      requestURL,
      objectToSnakeCase({
        chart: {
          name: name ?? `New Chart`,
          description,
          dashboardSectionId,
          chartType,
          formula: {
            payload: '',
            patterns: [
              {
                match: '=',
                label: 'Matched',
                color: colors.heliotrope2,
              },
            ],
            defaultPattern: {
              label: 'NotMatched',
              color: colors.mauve,
            },
          },
          intervalType: ChartIntervalType.MONTHLY,
        },
      }),
    );
    const chart = jsonApiToObject(data, 'chart');

    yield put(addChartSuccess(chart));

    // Select newly added Chart
    yield put(selectChartAction(chart.dashboardSectionId, chart.id));
  } catch (error) {
    yield put(addChartError(error));
  }
}

export default function* addChartSaga() {
  yield takeLatest(ADD_CHART_REQUEST, addChart);
}
