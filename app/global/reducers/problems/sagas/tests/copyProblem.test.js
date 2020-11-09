import axios from 'axios';
import { push } from 'connected-react-router';
import { toast } from 'react-toastify';
import { takeLatest } from 'redux-saga/effects';
import * as matchers from 'redux-saga-test-plan/matchers';
import { throwError } from 'redux-saga-test-plan/providers';
import { expectSaga } from 'redux-saga-test-plan';

import { defaultMapper } from 'utils/mapResponseObjects';
import { formatMessage } from 'utils/intlOutsideReact';
import { apiProblemResponse } from 'utils/apiResponseCreators';
import { createUser } from 'utils/reducerCreators';
import messages from 'global/reducers/problems/messages';

import { copyProblemSuccess } from '../../actions';
import {
  COPY_PROBLEM_SUCCESS,
  COPY_PROBLEM_ERROR,
  COPY_PROBLEM_REQUEST,
} from '../../constants';
import copyProblemSaga, { copyProblem } from '../copyProblem';

describe('copyProblem saga', () => {
  const createPayload = withParams => ({
    problemId: 'problem-test',
    users: withParams ? [createUser(), createUser(1)] : null,
    withoutRedirect: false,
  });

  it('Check copyProblem generator success connection', () => {
    const apiResponse = apiProblemResponse();
    const payload = createPayload(true);

    return expectSaga(copyProblem, { payload })
      .provide([[matchers.call.fn(axios.post), { data: apiResponse }]])
      .call(toast.success, formatMessage(messages.sendSuccess), {
        toastId: COPY_PROBLEM_SUCCESS,
      })
      .run();
  });

  it('Check copyProblem generator success connection without params', () => {
    const apiResponse = apiProblemResponse();
    const payload = createPayload(false);

    return expectSaga(copyProblem, { payload })
      .provide([[matchers.call.fn(axios.post), { data: apiResponse }]])
      .put(copyProblemSuccess(defaultMapper(apiResponse.data)))
      .put(push('/'))
      .run();
  });
  it('Check copyProblem error connection', () => {
    const error = new Error('test');
    const payload = createPayload(true);
    return expectSaga(copyProblem, { payload })
      .provide([[matchers.call.fn(axios.post), throwError(error)]])
      .call(toast.error, formatMessage(messages.copyError), {
        toastId: COPY_PROBLEM_ERROR,
      })
      .run();
  });

  it('Check copyProblem connection', () => {
    const sagaFunction = copyProblemSaga();
    const takeLatestDescriptor = sagaFunction.next().value;
    expect(takeLatestDescriptor).toEqual(
      takeLatest(COPY_PROBLEM_REQUEST, copyProblem),
    );
  });
});
