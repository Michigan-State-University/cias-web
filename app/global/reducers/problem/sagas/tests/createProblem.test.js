import axios from 'axios';
import { error as showError } from 'react-toastify-redux';
import { takeLatest } from 'redux-saga/effects';
import * as matchers from 'redux-saga-test-plan/matchers';
import { throwError } from 'redux-saga-test-plan/providers';
import { expectSaga } from 'redux-saga-test-plan';
import { push } from 'connected-react-router';

import { defaultMapper } from 'utils/mapResponseObjects';
import { formatMessage } from 'utils/intlOutsideReact';
import globalMessages from 'global/i18n/globalMessages';

import { createProblemSuccess } from '../../actions';
import { CREATE_PROBLEM_ERROR, CREATE_PROBLEM_REQUEST } from '../../constants';
import { mockProblemApiResponse } from './mockApiResponse';
import createProblemSaga, { createProblem } from '../createProblem';

describe('createProblem saga', () => {
  it('Check createProblem generator success connection', () => {
    const apiResponse = { data: { mockProblemApiResponse } };
    return expectSaga(createProblem)
      .provide([[matchers.call.fn(axios.post), { data: apiResponse }]])
      .put(createProblemSuccess(defaultMapper(apiResponse.data)))
      .put(push(`/interventions/${apiResponse.data.id}`))
      .run();
  });
  it('Check createProblem error connection', () => {
    const error = new Error('test');
    return expectSaga(createProblem)
      .provide([[matchers.call.fn(axios.post), throwError(error)]])
      .put(
        showError(formatMessage(globalMessages.createProblemError), {
          id: CREATE_PROBLEM_ERROR,
        }),
      )
      .run();
  });

  it('Check createProblem connection', () => {
    const sagaFunction = createProblemSaga();
    const takeLatestDescriptor = sagaFunction.next().value;
    expect(takeLatestDescriptor).toEqual(
      takeLatest(CREATE_PROBLEM_REQUEST, createProblem),
    );
  });
});
