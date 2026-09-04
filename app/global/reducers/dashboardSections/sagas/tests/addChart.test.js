import axios from 'axios';
import { takeLatest } from 'redux-saga/effects';
import { expectSaga } from 'redux-saga-test-plan';

import { ADD_CHART_REQUEST } from '../../constants';
import addChartSaga, { addChart } from '../addChart';

describe('addChart saga', () => {
  const payload = {
    name: 'New Chart',
    description: null,
    dashboardSectionId: 'section-1',
    chartType: 'pie_chart',
  };

  const apiResponse = {
    data: {
      data: {
        id: 'chart-1',
        type: 'chart',
        attributes: { dashboard_section_id: 'section-1' },
      },
    },
  };

  it('Sends both chart validity keys in the creation formula', async () => {
    let requestBody = null;

    await expectSaga(addChart, { payload })
      .provide([
        {
          call({ fn, args }, next) {
            if (fn !== axios.post) return next();

            [, requestBody] = args;
            return apiResponse;
          },
        },
      ])
      .run();

    expect(requestBody.chart.formula).toMatchObject({
      min_answered_variables: 0,
      positive_despite_missing_data: false,
    });
  });

  it('Check addChart connection', () => {
    const sagaFunction = addChartSaga();
    const takeLatestDescriptor = sagaFunction.next().value;
    expect(takeLatestDescriptor).toEqual(
      takeLatest(ADD_CHART_REQUEST, addChart),
    );
  });
});
