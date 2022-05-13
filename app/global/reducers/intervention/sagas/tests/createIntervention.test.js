import axios from 'axios';
import { takeLatest } from 'redux-saga/effects';
import * as matchers from 'redux-saga-test-plan/matchers';
import { throwError } from 'redux-saga-test-plan/providers';
import { expectSaga } from 'redux-saga-test-plan';

import { createIntervention } from 'utils/reducerCreators';
import { defaultMapper } from 'utils/mapResponseObjects';
import { apiSessionResponse } from 'utils/apiResponseCreators';

import createSessionSaga, {
  createSession,
} from 'global/reducers/intervention/sagas/createSession';
import { createSessionSuccess, createSessionError } from '../../actions';
import { CREATE_SESSION_REQUEST } from '../../constants';

describe('createSession saga', () => {
  const mockIntervention = createIntervention();
  const payload = {
    id: mockIntervention.id,
    lastPosition: mockIntervention.attributes.sessions.length,
  };

  const mockApiResponse = apiSessionResponse();

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
