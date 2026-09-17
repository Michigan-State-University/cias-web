import { put, takeEvery, call, delay } from 'redux-saga/effects';
import axios from 'axios';
import { toast } from 'react-toastify';

import { formatMessage } from 'utils/intlOutsideReact';
import { formatApiErrorMessage } from 'utils/formatApiErrorMessage';

import {
  isChartRegenerating,
  REGENERATE_CHART_ERROR,
  REGENERATE_CHART_POLL_FAST_ATTEMPTS,
  REGENERATE_CHART_POLL_FINISHED,
  REGENERATE_CHART_POLL_INTERVAL,
  REGENERATE_CHART_POLL_MAX_ATTEMPTS,
  REGENERATE_CHART_POLL_MAX_CONSECUTIVE_FAILURES,
  REGENERATE_CHART_POLL_SLOW_INTERVAL,
  REGENERATE_CHART_REQUEST,
  REGENERATE_CHART_START_GRACE_ATTEMPTS,
  REGENERATE_CHART_SUCCESS,
} from '../constants';
import {
  regenerateChartError,
  regenerateChartPollFinished,
  regenerateChartSuccess,
} from '../actions';
import messages from '../messages';
import { fetchChart } from './fetchChart';

export const regenerateChartUrl = (chartId) =>
  `v1/charts/${chartId}/regenerate`;

export function* regenerateChart({ payload: { chartId } }) {
  try {
    yield call(axios.post, regenerateChartUrl(chartId));
  } catch (error) {
    yield call(
      toast.error,
      formatApiErrorMessage(error, messages.regenerateChartError),
      { toastId: REGENERATE_CHART_ERROR },
    );
    yield put(regenerateChartError(error));

    return;
  }

  yield call(toast.success, formatMessage(messages.regenerateChartSuccess), {
    toastId: REGENERATE_CHART_SUCCESS,
  });
  yield put(regenerateChartSuccess(chartId));

  // Nothing pushes the lock's release, so poll. A `false` only ends the poll once the flag has been
  // seen `true` or the queue grace window has passed - see the constants for why it is ambiguous.
  let chart = yield call(fetchChart, { payload: { chartId } });
  let attempts = 0;
  let failures = 0;
  let observedRunning = false;

  while (attempts < REGENERATE_CHART_POLL_MAX_ATTEMPTS) {
    if (chart === null) {
      failures += 1;
      if (failures >= REGENERATE_CHART_POLL_MAX_CONSECUTIVE_FAILURES) break;
    } else {
      failures = 0;

      if (isChartRegenerating(chart)) {
        observedRunning = true;
      } else if (
        observedRunning ||
        attempts >= REGENERATE_CHART_START_GRACE_ATTEMPTS
      ) {
        break;
      }
    }

    yield delay(
      attempts < REGENERATE_CHART_POLL_FAST_ATTEMPTS
        ? REGENERATE_CHART_POLL_INTERVAL
        : REGENERATE_CHART_POLL_SLOW_INTERVAL,
    );

    chart = yield call(fetchChart, { payload: { chartId } });
    attempts += 1;
  }

  yield put(regenerateChartPollFinished(chartId));

  if (attempts >= REGENERATE_CHART_POLL_MAX_ATTEMPTS) {
    yield call(
      toast.info,
      formatMessage(messages.regenerateChartStillRunning),
      { toastId: REGENERATE_CHART_POLL_FINISHED },
    );
  }
}

// takeEvery, not takeLatest: this owns a poll per chart, and takeLatest would cancel the first
// chart's poll - leaving its button disabled - the moment a second chart is regenerated.
export default function* regenerateChartSaga() {
  yield takeEvery(REGENERATE_CHART_REQUEST, regenerateChart);
}
