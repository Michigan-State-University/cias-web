import axios from 'axios';
import { takeLatest } from 'redux-saga/effects';
import * as matchers from 'redux-saga-test-plan/matchers';
import { throwError } from 'redux-saga-test-plan/providers';
import { expectSaga } from 'redux-saga-test-plan';

import { createIntervention } from 'utils/reducerCreators';
import { defaultMapper } from 'utils/mapResponseObjects';
import { initialState } from 'global/reducers/intervention/reducer';
import { fetchInterventionRequest } from 'global/reducers/intervention';
import { apiSessionResponse } from 'utils/apiResponseCreators';

import { getSession } from 'global/reducers/session/sagas/getSession';
import { getSessionSuccess, getSessionError } from '../../actions';
import { GET_SESSION_REQUEST } from '../../constants';
import { getSessionSaga } from '../index';

describe('getSession saga', () => {
  const mockIntervention = createIntervention();
  const mockState = {
    intervention: { ...initialState, intervention: mockIntervention },
  };
  const payload = {
    sessionId: mockIntervention.sessions[0].id,
    interventionId: mockIntervention.id,
  };

  it('Check getSession generator success connection', () => {
    const apiResponse = apiSessionResponse();
    return expectSaga(getSession, { payload })
      .withState(mockState)
      .provide([[matchers.call.fn(axios.get), { data: apiResponse }]])
      .put(getSessionSuccess(defaultMapper(apiResponse.data)))
      .run();
  });

  it('Check getSession generator success connection with empty state', () => {
    const apiResponse = apiSessionResponse();
    return expectSaga(getSession, { payload })
      .withState({ intervention: {} })
      .provide([[matchers.call.fn(axios.get), { data: apiResponse }]])
      .put(fetchInterventionRequest(payload.interventionId))
      .put(getSessionSuccess(defaultMapper(apiResponse.data)))
      .run();
  });
  it('Check getSession error connection', () => {
    const error = new Error('test');
    return expectSaga(getSession, { payload })
      .withState(mockState)
      .provide([[matchers.call.fn(axios.get), throwError(error)]])
      .put(getSessionError(error))
      .run();
  });

  it('Check getSession connection', () => {
    const sagaFunction = getSessionSaga();
    const takeLatestDescriptor = sagaFunction.next().value;
    expect(takeLatestDescriptor).toEqual(
      takeLatest(GET_SESSION_REQUEST, getSession),
    );
  });
});
