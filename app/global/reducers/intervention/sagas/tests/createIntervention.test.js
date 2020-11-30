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
import {
  createInterventionSuccess,
  createInterventionError,
} from '../../actions';
import { CREATE_INTERVENTION_REQUEST } from '../../constants';

describe('createIntervention saga', () => {
  const mockProblem = createProblem();
  const payload = {
    id: mockProblem.id,
    lastPosition: mockProblem.interventions.length,
  };

  const mockApiResponse = apiInterventionResponse();

  it('Check createIntervention generator success connection', () => {
    const apiResponse = { data: { mockApiResponse } };
    return expectSaga(createSession, { payload })
      .provide([[matchers.call.fn(axios.post), { data: apiResponse }]])
      .put(createInterventionSuccess(defaultMapper(mockApiResponse)))
      .run();
  });
  it('Check createIntervention error connection', () => {
    const error = new Error('test');
    return expectSaga(createSession, { payload })
      .provide([[matchers.call.fn(axios.post), throwError(error)]])
      .put(createInterventionError(error))
      .run();
  });

  it('Check changeAccessSetting connection', () => {
    const sagaFunction = createSessionSaga();
    const takeLatestDescriptor = sagaFunction.next().value;
    expect(takeLatestDescriptor).toEqual(
      takeLatest(CREATE_INTERVENTION_REQUEST, createSession),
    );
  });
});
