import axios from 'axios';
import { toast } from 'react-toastify';
import { takeLatest } from 'redux-saga/effects';
import * as matchers from 'redux-saga-test-plan/matchers';
import { throwError } from 'redux-saga-test-plan/providers';
import { expectSaga } from 'redux-saga-test-plan';

import { formatMessage } from 'utils/intlOutsideReact';

import { editChartError, editChartSuccess } from '../../actions';
import { EDIT_CHART_ERROR, EDIT_CHART_REQUEST } from '../../constants';
import messages from '../../messages';
import editChartSaga, { editChart } from '../editChart';

describe('editChart saga', () => {
  const chart = {
    id: 'chart-1',
    dashboardSectionId: 'section-1',
    formula: {
      payload: 'S1.a+S1.b',
      patterns: [],
      minAnsweredVariables: 2,
      positiveDespiteMissingData: true,
    },
  };

  const apiResponse = {
    data: {
      data: {
        id: 'chart-1',
        type: 'chart',
        attributes: {
          dashboard_section_id: 'section-1',
          formula_variable_count: 2,
          formula: {
            payload: 'S1.a+S1.b',
            patterns: [],
            min_answered_variables: 2,
            positive_despite_missing_data: true,
          },
        },
      },
    },
  };

  it('Check editChart generator success connection', () =>
    expectSaga(editChart, { payload: { chart } })
      .provide([[matchers.call.fn(axios.patch), apiResponse]])
      .put(
        editChartSuccess({
          id: 'chart-1',
          dashboardSectionId: 'section-1',
          formulaVariableCount: 2,
          formula: {
            payload: 'S1.a+S1.b',
            patterns: [],
            minAnsweredVariables: 2,
            positiveDespiteMissingData: true,
          },
        }),
      )
      .run());

  it('Check editChart error toast and error action', () => {
    const error = new Error('test');

    return expectSaga(editChart, { payload: { chart } })
      .provide([[matchers.call.fn(axios.patch), throwError(error)]])
      .call(toast.error, formatMessage(messages.editChartError), {
        toastId: EDIT_CHART_ERROR,
      })
      .put(editChartError(error))
      .run();
  });

  it('Check editChart error toast prefers the API message', () => {
    const apiMessage = 'Min answered variables must be greater than 0';
    const error = { response: { data: { message: apiMessage } } };

    return expectSaga(editChart, { payload: { chart } })
      .provide([[matchers.call.fn(axios.patch), throwError(error)]])
      .call(toast.error, apiMessage, { toastId: EDIT_CHART_ERROR })
      .put(editChartError(error))
      .run();
  });

  it('Check editChart connection', () => {
    const sagaFunction = editChartSaga();
    const takeLatestDescriptor = sagaFunction.next().value;
    expect(takeLatestDescriptor).toEqual(
      takeLatest(EDIT_CHART_REQUEST, editChart),
    );
  });
});
