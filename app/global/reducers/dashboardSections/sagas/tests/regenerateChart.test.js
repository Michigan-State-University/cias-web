import axios from 'axios';
import { toast } from 'react-toastify';
import { takeEvery } from 'redux-saga/effects';
import * as matchers from 'redux-saga-test-plan/matchers';
import { dynamic, throwError } from 'redux-saga-test-plan/providers';
import { expectSaga } from 'redux-saga-test-plan';

import { formatMessage } from 'utils/intlOutsideReact';

import {
  fetchChartSuccess,
  regenerateChartError,
  regenerateChartPollFinished,
  regenerateChartSuccess,
} from '../../actions';
import {
  REGENERATE_CHART_ERROR,
  REGENERATE_CHART_POLL_MAX_ATTEMPTS,
  REGENERATE_CHART_REQUEST,
  REGENERATE_CHART_START_GRACE_ATTEMPTS,
  REGENERATE_CHART_SUCCESS,
} from '../../constants';
import messages from '../../messages';
import regenerateChartSaga, {
  regenerateChart,
  regenerateChartUrl,
} from '../regenerateChart';

// `delay(ms)` compiles to a call to redux-saga's `delayP`; short-circuiting it
// keeps the poll from spending real time in the test
const provideDelay = ({ fn }, next) => (fn.name === 'delayP' ? null : next());

describe('regenerateChart saga', () => {
  const chartId = 'chart-1';
  const payload = { chartId };

  const chartResponse = (regenerating) => ({
    data: {
      data: {
        id: chartId,
        type: 'chart',
        attributes: {
          dashboard_section_id: 'section-1',
          regenerating,
        },
      },
    },
  });

  const chart = (regenerating) => ({
    id: chartId,
    dashboardSectionId: 'section-1',
    regenerating,
  });

  const countingGet = (behaviour) => {
    const counter = { calls: 0 };
    return [
      counter,
      [
        matchers.call.fn(axios.get),
        dynamic(() => {
          const value = behaviour(counter.calls);
          counter.calls += 1;
          if (value === 'error') throw new Error('500');
          return chartResponse(value);
        }),
      ],
    ];
  };

  it('Check regenerateChart posts to the regenerate endpoint', () =>
    expectSaga(regenerateChart, { payload })
      .provide([
        { call: provideDelay },
        [matchers.call.fn(axios.post), {}],
        [matchers.call.fn(axios.get), chartResponse(false)],
      ])
      .call(axios.post, regenerateChartUrl(chartId))
      .put(regenerateChartSuccess(chartId))
      .run());

  it('Check regenerateChart toasts that the work started and an email follows', () =>
    expectSaga(regenerateChart, { payload })
      .provide([
        { call: provideDelay },
        [matchers.call.fn(axios.post), {}],
        [matchers.call.fn(axios.get), chartResponse(false)],
      ])
      .call(toast.success, formatMessage(messages.regenerateChartSuccess), {
        toastId: REGENERATE_CHART_SUCCESS,
      })
      .run());

  it('Check regenerateChart refetches the chart after the enqueue', () =>
    expectSaga(regenerateChart, { payload })
      .provide([
        { call: provideDelay },
        [matchers.call.fn(axios.post), {}],
        [matchers.call.fn(axios.get), chartResponse(false)],
      ])
      .put(fetchChartSuccess(chart(false)))
      .run());

  it('Check regenerateChart keeps polling until the chart stops regenerating', () => {
    let calls = 0;
    const responses = [
      chartResponse(true),
      chartResponse(true),
      chartResponse(false),
    ];

    return expectSaga(regenerateChart, { payload })
      .provide([
        { call: provideDelay },
        [matchers.call.fn(axios.post), {}],
        [
          matchers.call.fn(axios.get),
          dynamic(() => {
            const response = responses[calls] ?? chartResponse(false);
            calls += 1;
            return response;
          }),
        ],
      ])
      .put(fetchChartSuccess(chart(true)))
      .put(fetchChartSuccess(chart(false)))
      .put(regenerateChartPollFinished(chartId))
      .run()
      .then(() => {
        expect(calls).toBe(3);
      });
  });

  it('Check regenerateChart stops polling at the cap', () => {
    const [counter, getProvider] = countingGet(() => true);
    return expectSaga(regenerateChart, { payload })
      .provide([
        { call: provideDelay },
        [matchers.call.fn(axios.post), {}],
        getProvider,
      ])
      .run()
      .then(() =>
        expect(counter.calls).toBe(REGENERATE_CHART_POLL_MAX_ATTEMPTS + 1),
      );
  });

  it('Check regenerateChart keeps polling through the queue wait, then gives up after the grace window', () => {
    const [counter, getProvider] = countingGet(() => false);
    return expectSaga(regenerateChart, { payload })
      .provide([
        { call: provideDelay },
        [matchers.call.fn(axios.post), {}],
        getProvider,
      ])
      .put(regenerateChartPollFinished(chartId))
      .run()
      .then(() =>
        expect(counter.calls).toBe(REGENERATE_CHART_START_GRACE_ATTEMPTS + 1),
      );
  });

  it('Check regenerateChart does not end the poll on one transient refetch failure', () => {
    const [counter, getProvider] = countingGet((n) =>
      n === 2 ? 'error' : n <= 5,
    );
    return expectSaga(regenerateChart, { payload })
      .provide([
        { call: provideDelay },
        [matchers.call.fn(axios.post), {}],
        getProvider,
      ])
      .run()
      .then(() => expect(counter.calls).toBeGreaterThan(3));
  });

  it('Check regenerateChart surfaces the API refusal message', () => {
    const apiMessage = 'This chart is already being regenerated';
    const error = { response: { data: { message: apiMessage } } };

    return expectSaga(regenerateChart, { payload })
      .provide([
        { call: provideDelay },
        [matchers.call.fn(axios.post), throwError(error)],
      ])
      .call(toast.error, apiMessage, { toastId: REGENERATE_CHART_ERROR })
      .put(regenerateChartError(error))
      .not.put(regenerateChartSuccess(chartId))
      .run();
  });

  it('Check regenerateChart falls back to its own copy without an API message', () => {
    const error = new Error('test');

    return expectSaga(regenerateChart, { payload })
      .provide([
        { call: provideDelay },
        [matchers.call.fn(axios.post), throwError(error)],
      ])
      .call(toast.error, formatMessage(messages.regenerateChartError), {
        toastId: REGENERATE_CHART_ERROR,
      })
      .put(regenerateChartError(error))
      .run();
  });

  it('Check regenerateChart does not refetch after a refusal', () => {
    const error = new Error('test');

    return expectSaga(regenerateChart, { payload })
      .provide([
        { call: provideDelay },
        [matchers.call.fn(axios.post), throwError(error)],
        [matchers.call.fn(axios.get), chartResponse(false)],
      ])
      .not.call.fn(axios.get)
      .run();
  });

  it('Check regenerateChart connection', () => {
    const sagaFunction = regenerateChartSaga();
    const takeEveryDescriptor = sagaFunction.next().value;
    expect(takeEveryDescriptor).toEqual(
      takeEvery(REGENERATE_CHART_REQUEST, regenerateChart),
    );
  });
});
