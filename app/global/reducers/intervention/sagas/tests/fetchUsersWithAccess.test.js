import axios from 'axios';
import { takeLatest } from 'redux-saga/effects';
import * as matchers from 'redux-saga-test-plan/matchers';
import { throwError } from 'redux-saga-test-plan/providers';
import { expectSaga } from 'redux-saga-test-plan';

import { createIntervention } from 'utils/reducerCreators';
import { mapAccessToStateObject } from 'utils/mapResponseObjects';

import fetchSessionEmailsSaga, {
  fetchSessionEmails,
} from 'global/reducers/intervention/sagas/fetchSessionEmails';
import {
  fetchUsersWithAccessSuccess,
  fetchUsersWithAccessFailure,
} from '../../actions';
import { initialState } from '../../reducer';
import { FETCH_SESSION_EMAILS_REQUEST } from '../../constants';
import { fetchUsersWithAccess } from '../fetchUsersWithAccess';

describe('fetchUsersWithAccess saga', () => {
  const mockIntervention = createIntervention();
  const mockState = {
    intervention: { ...initialState, intervention: mockIntervention },
  };
  const apiResponse = {
    user_sessions: [
      { user_id: '0', email: 'user0@mail.com' },
      { user_id: '1', email: 'user1@mail.com' },
    ],
  };
  const payload = { id: mockIntervention.id };

  it('Check fetchUsersWithAccess generator success connection', () =>
    expectSaga(fetchUsersWithAccess, { payload })
      .withState(mockState)
      .provide([[matchers.call.fn(axios.get), { data: apiResponse }]])
      .put(
        fetchUsersWithAccessSuccess(
          apiResponse.user_sessions.map(mapAccessToStateObject),
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
    const sagaFunction = fetchSessionEmailsSaga();
    const takeLatestDescriptor = sagaFunction.next().value;
    expect(takeLatestDescriptor).toEqual(
      takeLatest([FETCH_SESSION_EMAILS_REQUEST], fetchSessionEmails),
    );
  });
});
