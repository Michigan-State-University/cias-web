import axios from 'axios';
import { takeLatest } from 'redux-saga/effects';
import * as matchers from 'redux-saga-test-plan/matchers';
import { throwError } from 'redux-saga-test-plan/providers';
import { expectSaga } from 'redux-saga-test-plan';

import { createProblem, createUser } from 'utils/reducerCreators';
import { apiProblemResponse } from 'utils/apiResponseCreators';

import {
  fetchInterventionEmailsSuccess,
  fetchInterventionEmailsError,
} from '../../actions';
import { initialState } from '../../reducer';
import { FETCH_INTERVENTION_EMAILS_REQUEST } from '../../constants';
import fetchInterventionEmailsSaga, {
  fetchInterventionEmails,
} from '../fetchInterventionEmails';

describe('fetchInterventionEmails saga', () => {
  const users = [createUser(), createUser()];
  const mockProblem = createProblem();
  const mockState = {
    problem: { ...initialState, problem: mockProblem },
  };
  const payload = { index: 0 };

  it('Check fetchInterventionEmails generator success connection', () => {
    const apiResponse = apiProblemResponse();
    apiResponse.session_invitations = users;

    return expectSaga(fetchInterventionEmails, { payload })
      .withState(mockState)
      .provide([[matchers.call.fn(axios.get), { data: apiResponse }]])
      .put(fetchInterventionEmailsSuccess(users, payload.index))
      .run();
  });
  it('Check fetchInterventionEmails error connection', () => {
    const error = new Error('test');
    return expectSaga(fetchInterventionEmails, { payload })
      .withState(mockState)
      .provide([[matchers.call.fn(axios.get), throwError(error)]])
      .put(fetchInterventionEmailsError(error))
      .run();
  });

  it('Check fetchInterventionEmails connection', () => {
    const sagaFunction = fetchInterventionEmailsSaga();
    const takeLatestDescriptor = sagaFunction.next().value;
    expect(takeLatestDescriptor).toEqual(
      takeLatest([FETCH_INTERVENTION_EMAILS_REQUEST], fetchInterventionEmails),
    );
  });
});
