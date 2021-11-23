import axios from 'axios';
import { toast } from 'react-toastify';
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
  const payload = { interventionId: '0', accessId: '0' };

  it('Check revokeUserAccess generator success connection', () =>
    expectSaga(revokeUserAccess, { payload })
      .provide([[matchers.call.fn(axios.delete), {}]])
      .put(revokeUserAccessSuccess(payload.accessId))
      .run());

  it('Check revokeUserAccess error connection', () => {
    const error = new Error('test');
    return expectSaga(revokeUserAccess, { payload })
      .provide([[matchers.call.fn(axios.delete), throwError(error)]])
      .call(toast.error, formatMessage(messages.revokeAccessError), {
        toastId: REVOKE_USER_ACCESS_ERROR,
      })
      .put(revokeUserAccessFailure(payload.accessId, error))
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
