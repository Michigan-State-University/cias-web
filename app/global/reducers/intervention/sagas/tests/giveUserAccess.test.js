import axios from 'axios';
import { takeLatest } from 'redux-saga/effects';
import * as matchers from 'redux-saga-test-plan/matchers';
import { throwError } from 'redux-saga-test-plan/providers';
import { expectSaga } from 'redux-saga-test-plan';

import { toast } from 'react-toastify';
import { formatMessage } from 'utils/intlOutsideReact';

import { jsonApiToArray } from 'utils/jsonApiMapper';
import {
  enableUserAccessSuccess,
  enableUserAccessFailure,
} from '../../actions';
import {
  ENABLE_USER_ACCESS_ERROR,
  ENABLE_USER_ACCESS_REQUEST,
} from '../../constants';
import enableUserAccessSaga, { enableUserAccess } from '../giveUserAccess';
import messages from '../../messages';

describe('fetchUsersWithAccess saga', () => {
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
  const payload = { id: '0', emails: ['user0@mail.com', 'user1@mail.com'] };

  it('Check giveUserAccess generator success connection', () =>
    expectSaga(enableUserAccess, { payload })
      .provide([[matchers.call.fn(axios.post), { data: apiResponse }]])
      .put(
        enableUserAccessSuccess(
          jsonApiToArray(apiResponse, 'interventionAccess'),
        ),
      )
      .run());
  it('Check giveUserAccess error connection', () => {
    const error = new Error('test');
    return expectSaga(enableUserAccess, { payload })
      .provide([[matchers.call.fn(axios.post), throwError(error)]])
      .call(toast.error, formatMessage(messages.giveUserAccessError), {
        toastId: ENABLE_USER_ACCESS_ERROR,
      })
      .put(enableUserAccessFailure(error))
      .run();
  });

  it('Check giveUserAccess connection', () => {
    const sagaFunction = enableUserAccessSaga();
    const takeLatestDescriptor = sagaFunction.next().value;
    expect(takeLatestDescriptor).toEqual(
      takeLatest(ENABLE_USER_ACCESS_REQUEST, enableUserAccess),
    );
  });
});
