import axios from 'axios';
import { takeLatest } from 'redux-saga/effects';
import * as matchers from 'redux-saga-test-plan/matchers';
import { throwError } from 'redux-saga-test-plan/providers';
import { expectSaga } from 'redux-saga-test-plan';

import { createProblem } from 'utils/reducerCreators';
import { defaultMapper } from 'utils/mapResponseObjects';

import {
  createInterventionSuccess,
  createInterventionError,
} from '../../actions';
import { CREATE_INTERVENTION_REQUEST } from '../../constants';
import { mockInterventionApiResponse } from './mockApiResponse';
import createInterventionSaga, {
  createIntervention,
} from '../createIntervention';

describe('createIntervention saga', () => {
  const mockProblem = createProblem();
  const payload = {
    id: mockProblem.id,
    lastPosition: mockProblem.interventions.length,
  };

  it('Check createIntervention generator success connection', () => {
    const apiResponse = { data: { mockInterventionApiResponse } };
    return expectSaga(createIntervention, { payload })
      .provide([[matchers.call.fn(axios.post), { data: apiResponse }]])
      .put(
        createInterventionSuccess(defaultMapper(mockInterventionApiResponse)),
      )
      .run();
  });
  it('Check createIntervention error connection', () => {
    const error = new Error('test');
    return expectSaga(createIntervention, { payload })
      .provide([[matchers.call.fn(axios.post), throwError(error)]])
      .put(createInterventionError(error))
      .run();
  });

  it('Check changeAccessSetting connection', () => {
    const sagaFunction = createInterventionSaga();
    const takeLatestDescriptor = sagaFunction.next().value;
    expect(takeLatestDescriptor).toEqual(
      takeLatest(CREATE_INTERVENTION_REQUEST, createIntervention),
    );
  });
});
