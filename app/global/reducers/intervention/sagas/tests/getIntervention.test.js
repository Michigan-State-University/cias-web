import axios from 'axios';
import cloneDeep from 'lodash/cloneDeep';
import { takeLatest } from 'redux-saga/effects';
import * as matchers from 'redux-saga-test-plan/matchers';
import { throwError } from 'redux-saga-test-plan/providers';
import { expectSaga } from 'redux-saga-test-plan';

import { createProblem } from 'utils/reducerCreators';
import { defaultMapper } from 'utils/mapResponseObjects';
import { initialState } from 'global/reducers/problem/reducer';
import { fetchProblemRequest } from 'global/reducers/problem';

import { getInterventionSuccess, getInterventionError } from '../../actions';
import { mockApiResponse } from './mockApiResponse';
import { GET_INTERVENTION_REQUEST } from '../../constants';
import { getIntervention } from '../getIntervention';
import { getInterventionSaga } from '../index';

describe('getIntervention saga', () => {
  const mockProblem = createProblem();
  const mockState = {
    problem: { ...initialState, problem: mockProblem },
  };
  const payload = {
    interventionId: mockProblem.interventions[0].id,
    problemId: mockProblem.id,
  };

  it('Check getIntervention generator success connection', () => {
    const apiResponse = cloneDeep(mockApiResponse);
    return expectSaga(getIntervention, { payload })
      .withState(mockState)
      .provide([[matchers.call.fn(axios.get), { data: apiResponse }]])
      .put(getInterventionSuccess(defaultMapper(apiResponse.data)))
      .run();
  });

  it('Check getIntervention generator success connection with empty state', () => {
    const apiResponse = cloneDeep(mockApiResponse);
    return expectSaga(getIntervention, { payload })
      .withState({ problem: {} })
      .provide([[matchers.call.fn(axios.get), { data: apiResponse }]])
      .put(fetchProblemRequest(payload.problemId))
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