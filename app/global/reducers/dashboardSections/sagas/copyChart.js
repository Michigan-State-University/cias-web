import { put, takeLatest, call } from 'redux-saga/effects';
import axios from 'axios';
import { toast } from 'react-toastify';

import { jsonApiToObject } from 'utils/jsonApiMapper';
import { formatMessage } from 'utils/intlOutsideReact';

import {
  COPY_CHART_REQUEST,
  COPY_CHART_ERROR,
  COPY_CHART_SUCCESS,
} from '../constants';
import { copyChartSuccess } from '../actions';
import messages from '../messages';

export function* copyChart({ payload: { chartId } }) {
  const requestURL = `v1/charts/${chartId}/clone`;

  try {
    const { data } = yield call(axios.post, requestURL);
    const chart = jsonApiToObject(data, 'chart');

    yield call(
      toast.success,
      formatMessage(messages.cloneSuccess, {
        toastId: COPY_CHART_SUCCESS,
      }),
    );

    yield put(copyChartSuccess(chart));
  } catch (error) {
    yield call(
      toast.error,
      formatMessage(messages.cloneError, {
        toastId: COPY_CHART_ERROR,
      }),
    );
  }
}

export default function* copyChartSaga() {
  yield takeLatest(COPY_CHART_REQUEST, copyChart);
}
