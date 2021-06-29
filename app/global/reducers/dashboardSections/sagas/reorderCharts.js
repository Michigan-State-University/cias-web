import { put, takeLatest, call } from 'redux-saga/effects';
import axios from 'axios';

import { formatMessage } from 'utils/intlOutsideReact';
import { toast } from 'react-toastify';

import { REORDER_CHARTS_REQUEST, REORDER_CHARTS_FAILURE } from '../constants';
import { reorderChartsSuccess, reorderChartsFailure } from '../actions';
import messages from '../messages';

export function* reorderCharts({ payload: { dashboardSectionId, charts } }) {
  const requestURL = `/v1/dashboard_sections/${dashboardSectionId}/charts/position`;

  try {
    const positionData = charts.map(({ id, position }) => ({
      id,
      position,
    }));
    yield call(axios.patch, requestURL, {
      chart: { position: positionData },
    });

    yield put(reorderChartsSuccess());
  } catch (error) {
    yield call(toast.error, formatMessage(messages.chartReorderError), {
      toastId: REORDER_CHARTS_FAILURE,
    });
    yield put(reorderChartsFailure());
  }
}

export default function* reorderChartsSaga() {
  yield takeLatest(REORDER_CHARTS_REQUEST, reorderCharts);
}
