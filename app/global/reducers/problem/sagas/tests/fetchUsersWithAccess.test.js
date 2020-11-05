import axios from 'axios';
import { takeLatest } from 'redux-saga/effects';
import * as matchers from 'redux-saga-test-plan/matchers';
import { throwError } from 'redux-saga-test-plan/providers';
import { expectSaga } from 'redux-saga-test-plan';

import { createProblem } from 'utils/reducerCreators';
import { mapAccessToStateObject } from 'utils/mapResponseObjects';

import {
  fetchUsersWithAccessSuccess,
  fetchUsersWithAccessFailure,
} from '../../actions';
import { initialState } from '../../reducer';
import { FETCH_INTERVENTION_EMAILS_REQUEST } from '../../constants';
import fetchInterventionEmailsSaga, {
  fetchInterventionEmails,
} from '../fetchInterventionEmails';
import { fetchUsersWithAccess } from '../fetchUsersWithAccess';

describe('fetchUsersWithAccess saga', () => {
  const mockProblem = createProblem();
  const mockState = {
    problem: { ...initialState, problem: mockProblem },
  };
  const apiResponse = {
    user_interventions: [
      { user_id: '0', email: 'user0@mail.com' },
      { user_id: '1', email: 'user1@mail.com' },
    ],
  };
  const payload = { id: mockProblem.id };

  it('Check fetchUsersWithAccess generator success connection', () =>
    expectSaga(fetchUsersWithAccess, { payload })
      .withState(mockState)
      .provide([[matchers.call.fn(axios.get), { data: apiResponse }]])
      .put(
        fetchUsersWithAccessSuccess(
          apiResponse.user_interventions.map(mapAccessToStateObject),
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

  it('Check fetchUsersWithAccess connection', () => {
    const sagaFunction = fetchInterventionEmailsSaga();
    const takeLatestDescriptor = sagaFunction.next().value;
    expect(takeLatestDescriptor).toEqual(
      takeLatest([FETCH_INTERVENTION_EMAILS_REQUEST], fetchInterventionEmails),
    );
  });
});
