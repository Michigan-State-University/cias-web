import axios from 'axios';
import { takeLatest } from 'redux-saga/effects';
import * as matchers from 'redux-saga-test-plan/matchers';
import { throwError } from 'redux-saga-test-plan/providers';
import { expectSaga } from 'redux-saga-test-plan';

import { createProblem } from 'utils/reducerCreators';
import { defaultMapper } from 'utils/mapResponseObjects';
import { initialState } from 'global/reducers/intervention/reducer';
import { fetchProblemRequest } from 'global/reducers/intervention';
import { apiInterventionResponse } from 'utils/apiResponseCreators';

import { getInterventionSuccess, getInterventionError } from '../../actions';
import { GET_INTERVENTION_REQUEST } from '../../constants';
import { getIntervention } from '../getIntervention';
import { getInterventionSaga } from '../index';

describe('getIntervention saga', () => {
  const mockProblem = createProblem();
  const mockState = {
    problem: { ...initialState, problem: mockProblem },
  };
  const payload = {
    sessionId: mockProblem.interventions[0].id,
    interventionId: mockProblem.id,
  };

  it('Check getIntervention generator success connection', () => {
    const apiResponse = apiInterventionResponse();
    return expectSaga(getIntervention, { payload })
      .withState(mockState)
      .provide([[matchers.call.fn(axios.get), { data: apiResponse }]])
      .put(getInterventionSuccess(defaultMapper(apiResponse.data)))
      .run();
  });

  it('Check getIntervention generator success connection with empty state', () => {
    const apiResponse = apiInterventionResponse();
    return expectSaga(getIntervention, { payload })
      .withState({ problem: {} })
      .provide([[matchers.call.fn(axios.get), { data: apiResponse }]])
      .put(fetchProblemRequest(payload.interventionId))
      .put(getInterventionSuccess(defaultMapper(apiResponse.data)))
      .run();
  });
  it('Check getIntervention error connection', () => {
    const error = new Error('test');
    return expectSaga(getIntervention, { payload })
      .withState(mockState)
      .provide([[matchers.call.fn(axios.get), throwError(error)]])
      .put(getInterventionError(error))
      .run();
  });

  it('Check getIntervention connection', () => {
    const sagaFunction = getInterventionSaga();
    const takeLatestDescriptor = sagaFunction.next().value;
    expect(takeLatestDescriptor).toEqual(
      takeLatest(GET_INTERVENTION_REQUEST, getIntervention),
    );
  });
});
