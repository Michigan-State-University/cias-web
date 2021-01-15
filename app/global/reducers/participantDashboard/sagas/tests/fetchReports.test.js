import { takeLatest } from 'redux-saga/effects';
import { expectSaga } from 'redux-saga-test-plan';

import { fetchReportsSuccess } from '../../actions';
import fetchReportsSaga, { fetchReports, FETCH_DATA } from '../fetchReports';
import { FETCH_REPORTS_REQUEST } from '../../constants';

describe('fetchReports saga', () => {
  expectSaga.DEFAULT_TIMEOUT = 3000;

  it('Check fetchReports generator success connection', () =>
    // const apiResponse = { data: cloneDeep(mockReports) }; uncomment when api will be ready

    expectSaga(fetchReports, { payload: { page: 1 } })
      // .provide([[matchers.call.fn(axios.get), { data: apiResponse }]])
      .put(fetchReportsSuccess(FETCH_DATA.slice(0, 10), FETCH_DATA.length))
      .run());
  // it('Check fetchReports error connection', () => {
  //   const error = new Error('test');
  //   return expectSaga(fetchReports)
  //     .provide([[call, throwError(error)]])
  //     .put(fetchReportsError(error))
  //     .run();
  // });

  it('Check fetchReports connection', () => {
    const sagaFunction = fetchReportsSaga();
    const takeLatestDescriptor = sagaFunction.next().value;
    expect(takeLatestDescriptor).toEqual(
      takeLatest(FETCH_REPORTS_REQUEST, fetchReports),
    );
  });
});
