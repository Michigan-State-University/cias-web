import axios from 'axios';
import { takeLatest } from 'redux-saga/effects';
import * as matchers from 'redux-saga-test-plan/matchers';
import { throwError } from 'redux-saga-test-plan/providers';
import { expectSaga } from 'redux-saga-test-plan';

import { createProblem } from 'utils/reducerCreators';
import { defaultMapper } from 'utils/mapResponseObjects';
import { apiInterventionResponse } from 'utils/apiResponseCreators';

import createSessionSaga, {
  createSession,
} from 'global/reducers/intervention/sagas/createSession';
import { createSessionSuccess, createSessionError } from '../../actions';
import { CREATE_SESSION_REQUEST } from '../../constants';

describe('createSession saga', () => {
  const mockProblem = createProblem();
  const payload = {
    id: mockProblem.id,
    lastPosition: mockProblem.sessions.length,
  };

  const mockApiResponse = apiInterventionResponse();

  it('Check createSession generator success connection', () => {
    const apiResponse = { data: { mockApiResponse } };
    return expectSaga(createSession, { payload })
      .provide([[matchers.call.fn(axios.post), { data: apiResponse }]])
      .put(createSessionSuccess(defaultMapper(mockApiResponse)))
      .run();
  });
  it('Check createSession error connection', () => {
    const error = new Error('test');
    return expectSaga(createSession, { payload })
      .provide([[matchers.call.fn(axios.post), throwError(error)]])
      .put(createSessionError(error))
      .run();
  });

  it('Check changeAccessSetting connection', () => {
    const sagaFunction = createSessionSaga();
    const takeLatestDescriptor = sagaFunction.next().value;
    expect(takeLatestDescriptor).toEqual(
      takeLatest(CREATE_SESSION_REQUEST, createSession),
    );
  });
});
