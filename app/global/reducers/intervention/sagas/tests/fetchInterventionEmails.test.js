import axios from 'axios';
import { takeLatest } from 'redux-saga/effects';
import * as matchers from 'redux-saga-test-plan/matchers';
import { throwError } from 'redux-saga-test-plan/providers';
import { expectSaga } from 'redux-saga-test-plan';

import { createIntervention, createUser } from 'utils/reducerCreators';
import { apiInterventionResponse } from 'utils/apiResponseCreators';

import fetchSessionEmailsSaga, {
  fetchSessionEmails,
} from 'global/reducers/intervention/sagas/fetchSessionEmails';
import {
  fetchSessionEmailsSuccess,
  fetchSessionEmailsError,
} from '../../actions';
import { initialState } from '../../reducer';
import { FETCH_SESSION_EMAILS_REQUEST } from '../../constants';

describe('fetchInterventionEmails saga', () => {
  const users = [createUser(), createUser()];
  const mockIntervention = createIntervention();
  const mockState = {
    intervention: { ...initialState, intervention: mockIntervention },
  };
  const payload = { index: 0 };

  it('Check fetchInterventionEmails generator success connection', () => {
    const apiResponse = apiInterventionResponse();
    apiResponse.invitations = users;

    return expectSaga(fetchSessionEmails, { payload })
      .withState(mockState)
      .provide([[matchers.call.fn(axios.get), { data: apiResponse }]])
      .put(fetchSessionEmailsSuccess(users, payload.index))
      .run();
  });
  it('Check fetchInterventionEmails error connection', () => {
    const error = new Error('test');
    return expectSaga(fetchSessionEmails, { payload })
      .withState(mockState)
      .provide([[matchers.call.fn(axios.get), throwError(error)]])
      .put(fetchSessionEmailsError(error))
      .run();
  });

  it('Check fetchInterventionEmails connection', () => {
    const sagaFunction = fetchSessionEmailsSaga();
    const takeLatestDescriptor = sagaFunction.next().value;
    expect(takeLatestDescriptor).toEqual(
      takeLatest([FETCH_SESSION_EMAILS_REQUEST], fetchSessionEmails),
    );
  });
});
