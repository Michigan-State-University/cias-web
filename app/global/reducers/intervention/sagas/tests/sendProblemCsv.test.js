import axios from 'axios';
import get from 'lodash/get';
import { toast } from 'react-toastify';
import { takeLatest } from 'redux-saga/effects';
import * as matchers from 'redux-saga-test-plan/matchers';
import { throwError } from 'redux-saga-test-plan/providers';
import { expectSaga } from 'redux-saga-test-plan';

import { formatMessage } from 'utils/intlOutsideReact';

import { sendInterventionCsv } from 'global/reducers/intervention/sagas/sendInterventionCsv';
import {
  sendInterventionCsvSuccess,
  sendInterventionCsvError,
} from '../../actions';
import { SEND_PROBLEM_CSV_REQUEST } from '../../constants';
import messages from '../../messages';
import { sendInterventionCsvSaga } from '../index';

describe('sendInterventionCsv saga', () => {
  const payload = { id: '0' };

  it('Check sendInterventionCsv generator success connection', () => {
    const apiResponse = { message: 'test' };
    return expectSaga(sendInterventionCsv, { payload })
      .provide([[matchers.call.fn(axios.get), { data: apiResponse }]])
      .put(sendInterventionCsvSuccess(apiResponse.message))
      .call(toast.info, apiResponse.message)
      .run();
  });

  it('Check sendInterventionCsv error connection', () => {
    const error = new Error('test');
    return expectSaga(sendInterventionCsv, { payload })
      .provide([[matchers.call.fn(axios.get), throwError(error)]])
      .put(sendInterventionCsvError(error))
      .call(
        toast.error,
        get(error, 'data.message', formatMessage(messages.csvError)),
      )
      .run();
  });

  it('Check sendInterventionCsv connection', () => {
    const sagaFunction = sendInterventionCsvSaga();
    const takeLatestDescriptor = sagaFunction.next().value;
    expect(takeLatestDescriptor).toEqual(
      takeLatest(SEND_PROBLEM_CSV_REQUEST, sendInterventionCsv),
    );
  });
});
