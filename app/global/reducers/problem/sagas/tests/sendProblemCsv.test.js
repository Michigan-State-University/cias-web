import axios from 'axios';
import get from 'lodash/get';
import { error as showError, info as showInfo } from 'react-toastify-redux';
import { takeLatest } from 'redux-saga/effects';
import * as matchers from 'redux-saga-test-plan/matchers';
import { throwError } from 'redux-saga-test-plan/providers';
import { expectSaga } from 'redux-saga-test-plan';

import { formatMessage } from 'utils/intlOutsideReact';

import { sendProblemCsvSuccess, sendProblemCsvError } from '../../actions';
import { SEND_PROBLEM_CSV_REQUEST } from '../../constants';
import messages from '../../messages';
import { sendProblemCsvSaga } from '../index';
import { sendProblemCsv } from '../sendProblemCsv';

describe('sendProblemCsv saga', () => {
  const payload = { id: '0' };

  it('Check sendProblemCsv generator success connection', () => {
    const apiResponse = { message: 'test' };
    return expectSaga(sendProblemCsv, { payload })
      .provide([[matchers.call.fn(axios.get), { data: apiResponse }]])
      .put(sendProblemCsvSuccess(apiResponse.message))
      .put(showInfo(apiResponse.message, { id: 'toast1' }))
      .run();
  });

  it('Check sendProblemCsv error connection', () => {
    const error = new Error('test');
    return expectSaga(sendProblemCsv, { payload })
      .provide([[matchers.call.fn(axios.get), throwError(error)]])
      .put(sendProblemCsvError(error))
      .put(
        showError(
          get(error, 'data.message', formatMessage(messages.csvError)),
          { id: 'toast2' },
        ),
      )
      .run();
  });

  it('Check sendProblemCsv connection', () => {
    const sagaFunction = sendProblemCsvSaga();
    const takeLatestDescriptor = sagaFunction.next().value;
    expect(takeLatestDescriptor).toEqual(
      takeLatest(SEND_PROBLEM_CSV_REQUEST, sendProblemCsv),
    );
  });
});
