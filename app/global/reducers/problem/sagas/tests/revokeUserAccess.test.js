import axios from 'axios';
import { error as showError } from 'react-toastify-redux';
import { takeLatest } from 'redux-saga/effects';
import * as matchers from 'redux-saga-test-plan/matchers';
import { throwError } from 'redux-saga-test-plan/providers';
import { expectSaga } from 'redux-saga-test-plan';

import { formatMessage } from 'utils/intlOutsideReact';

import {
  revokeUserAccessFailure,
  revokeUserAccessSuccess,
} from '../../actions';
import {
  REVOKE_USER_ACCESS_ERROR,
  REVOKE_USER_ACCESS_REQUEST,
} from '../../constants';
import messages from '../../messages';
import { revokeUserAccessSaga } from '../index';
import { revokeUserAccess } from '../revokeUserAccess';

describe('revokeUserAccess saga', () => {
  const payload = { problemId: '0', userId: '0' };

  it('Check revokeUserAccess generator success connection', () =>
    expectSaga(revokeUserAccess, { payload })
      .provide([[matchers.call.fn(axios.delete), {}]])
      .put(revokeUserAccessSuccess(payload.userId))
      .run());

  it('Check revokeUserAccess error connection', () => {
    const error = new Error('test');
    return expectSaga(revokeUserAccess, { payload })
      .provide([[matchers.call.fn(axios.delete), throwError(error)]])
      .put(
        showError(formatMessage(messages.revokeAccessError), {
          id: REVOKE_USER_ACCESS_ERROR,
        }),
      )
      .put(revokeUserAccessFailure(payload.userId, error))
      .run();
  });

  it('Check revokeUserAccess connection', () => {
    const sagaFunction = revokeUserAccessSaga();
    const takeLatestDescriptor = sagaFunction.next().value;
    expect(takeLatestDescriptor).toEqual(
      takeLatest(REVOKE_USER_ACCESS_REQUEST, revokeUserAccess),
    );
  });
});
