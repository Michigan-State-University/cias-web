import axios from 'axios';
import * as matchers from 'redux-saga-test-plan/matchers';
import { throwError } from 'redux-saga-test-plan/providers';
import { expectSaga } from 'redux-saga-test-plan';

import { createIntervention } from 'utils/reducerCreators';

import { jsonApiToArray } from 'utils/jsonApiMapper';
import {
  fetchUsersWithAccessSuccess,
  fetchUsersWithAccessFailure,
} from '../../actions';
import { initialState } from '../../reducer';
import { fetchUsersWithAccess } from '../fetchUsersWithAccess';

describe('fetchUsersWithAccess saga', () => {
  const mockIntervention = createIntervention();
  const mockState = {
    intervention: { ...initialState, intervention: mockIntervention },
  };
  const apiResponse = {
    data: [
      {
        id: '0',
        type: 'intervention_access',
        attributes: { email: 'user0@mail.com' },
      },
      {
        id: '1',
        type: 'intervention_access',
        attributes: { email: 'user1@mail.com' },
      },
    ],
  };
  const payload = { id: mockIntervention.id };
  it('Check fetchUsersWithAccess generator success connection', () =>
    expectSaga(fetchUsersWithAccess, { payload })
      .withState(mockState)
      .provide([[matchers.call.fn(axios.get), { data: apiResponse }]])
      .put(
        fetchUsersWithAccessSuccess(
          jsonApiToArray(apiResponse, 'interventionAccess'),
        ),
      )
      .run());
  it('Check fetchUsersWithAccess error connection', () => {
    const error = new Error('test');
    return expectSaga(fetchUsersWithAccess, { payload })
      .withState(mockState)
      .provide([[matchers.call.fn(axios.get), throwError(error)]])
      .put(fetchUsersWithAccessFailure(error))
      .run();
  });
});
