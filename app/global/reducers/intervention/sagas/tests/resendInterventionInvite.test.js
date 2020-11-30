import axios from 'axios';
import { toast } from 'react-toastify';
import { takeLatest } from 'redux-saga/effects';
import * as matchers from 'redux-saga-test-plan/matchers';
import { throwError } from 'redux-saga-test-plan/providers';
import { expectSaga } from 'redux-saga-test-plan';

import { formatMessage } from 'utils/intlOutsideReact';

import { resendSessionInvite } from 'global/reducers/intervention/sagas/resendSessionInvite';
import {
  sendInterventionInviteSuccess,
  sendInterventionInviteError,
} from '../../actions';
import { RESEND_INTERVENTION_INVITE_REQUEST } from '../../constants';
import messages from '../../messages';
import { resendSessionInviteSaga } from '../index';

describe('reorderSessions saga', () => {
  const payload = { interventionId: '0', id: '0' };

  it('Check resendInterventionInvite generator success connection', () =>
    expectSaga(resendSessionInvite, { payload })
      .provide([[matchers.call.fn(axios.get), {}]])
      .put(sendInterventionInviteSuccess())
      .call(toast.info, formatMessage(messages.resendInviteSuccess))
      .run());

  it('Check resendInterventionInvite error connection', () => {
    const error = new Error('test');
    return expectSaga(resendSessionInvite, { payload })
      .provide([[matchers.call.fn(axios.get), throwError(error)]])
      .put(sendInterventionInviteError())
      .call(toast.error, formatMessage(messages.resendInviteError))
      .run();
  });

  it('Check resendInterventionInvite connection', () => {
    const sagaFunction = resendSessionInviteSaga();
    const takeLatestDescriptor = sagaFunction.next().value;
    expect(takeLatestDescriptor).toEqual(
      takeLatest([RESEND_INTERVENTION_INVITE_REQUEST], resendSessionInvite),
    );
  });
});
