import axios from 'axios';
import cloneDeep from 'lodash/cloneDeep';
import { takeLatest } from 'redux-saga/effects';
import * as matchers from 'redux-saga-test-plan/matchers';
import { throwError } from 'redux-saga-test-plan/providers';
import { expectSaga } from 'redux-saga-test-plan';

import { Roles } from 'models/User/UserRoles';
import { createIntervention } from 'utils/reducerCreators';

import {
  fetchInterventionsSuccess,
  fetchInterventionsError,
} from '../../actions';
import fetchInterventionsSaga, {
  fetchInterventions,
} from '../fetchInterventions';
import { FETCH_INTERVENTIONS_REQUEST } from '../../constants';

describe('fetchInterventions saga', () => {
  const mockInterventions = [createIntervention(), createIntervention(1)];
  const payload = { role: Roles.admin };

  it('Check fetchInterventions generator success connection', () => {
    const apiResponse = { data: cloneDeep(mockInterventions) };

    return expectSaga(fetchInterventions, { payload })
      .provide([[matchers.call.fn(axios.get), { data: apiResponse }]])
      .put(fetchInterventionsSuccess(mockInterventions))
      .run();
  });
  it('Check fetchInterventions error connection', () => {
    const error = new Error('test');
    return expectSaga(fetchInterventions, { payload })
      .provide([[matchers.call.fn(axios.get), throwError(error)]])
      .put(fetchInterventionsError(error))
      .run();
  });

  it('Check fetchInterventions connection', () => {
    const sagaFunction = fetchInterventionsSaga();
    const takeLatestDescriptor = sagaFunction.next().value;
    expect(takeLatestDescriptor).toEqual(
      takeLatest(FETCH_INTERVENTIONS_REQUEST, fetchInterventions),
    );
  });
});
