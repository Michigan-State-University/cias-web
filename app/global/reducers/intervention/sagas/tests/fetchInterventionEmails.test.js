import axios from 'axios';
import { takeLatest } from 'redux-saga/effects';
import * as matchers from 'redux-saga-test-plan/matchers';
import { throwError } from 'redux-saga-test-plan/providers';
import { expectSaga } from 'redux-saga-test-plan';

import { createIntervention } from 'utils/reducerCreators';

import fetchSessionEmailsSaga, {
  fetchSessionEmails,
} from 'global/reducers/intervention/sagas/fetchSessionEmails';
import { jsonApiToArray } from 'utils/jsonApiMapper';
import {
  fetchSessionEmailsSuccess,
  fetchSessionEmailsError,
} from '../../actions';
import { initialState } from '../../reducer';
import { FETCH_SESSION_EMAILS_REQUEST } from '../../constants';

describe('fetchInterventionEmails saga', () => {
  const mockIntervention = createIntervention();
  const mockState = {
    intervention: { ...initialState, intervention: mockIntervention },
  };
  const payload = { index: 0 };

  it('Check fetchInterventionEmails generator success connection', () => {
    const apiResponse = {
      data: {
        data: [
          {
            id: '0',
            type: 'invitation',
            attributes: { email: 'user0@mail.com' },
          },
          {
            id: '1',
            type: 'invitation',
            attributes: { email: 'user1@mail.com' },
          },
        ],
      },
    };

    return expectSaga(fetchSessionEmails, { payload })
      .withState(mockState)
      .provide([[matchers.call.fn(axios.get), apiResponse]])
      .put(
        fetchSessionEmailsSuccess(
          jsonApiToArray(apiResponse.data, 'invitation'),
          payload.index,
        ),
      )
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
