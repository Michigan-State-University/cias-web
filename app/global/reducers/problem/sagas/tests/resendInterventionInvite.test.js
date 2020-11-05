import axios from 'axios';
import { error as showError, info as showInfo } from 'react-toastify-redux';
import { takeLatest } from 'redux-saga/effects';
import * as matchers from 'redux-saga-test-plan/matchers';
import { throwError } from 'redux-saga-test-plan/providers';
import { expectSaga } from 'redux-saga-test-plan';

import { formatMessage } from 'utils/intlOutsideReact';

import {
  sendInterventionInviteSuccess,
  sendInterventionInviteError,
} from '../../actions';
import { RESEND_INTERVENTION_INVITE_REQUEST } from '../../constants';
import messages from '../../messages';
import { resendInterventionInviteSaga } from '../index';
import { resendInterventionInvite } from '../resendInterventionInvite';

describe('reorderSessions saga', () => {
  const payload = { problemId: '0', id: '0' };

  it('Check resendInterventionInvite generator success connection', () =>
    expectSaga(resendInterventionInvite, { payload })
      .provide([[matchers.call.fn(axios.get), {}]])
      .put(sendInterventionInviteSuccess())
      .put(
        showInfo(formatMessage(messages.resendInviteSuccess), { id: 'toast1' }),
      )
      .run());

  it('Check resendInterventionInvite error connection', () => {
    const error = new Error('test');
    return expectSaga(resendInterventionInvite, { payload })
      .provide([[matchers.call.fn(axios.get), throwError(error)]])
      .put(sendInterventionInviteError())
      .put(
        showError(formatMessage(messages.resendInviteError), { id: 'toast2' }),
      )
      .run();
  });

  it('Check resendInterventionInvite connection', () => {
    const sagaFunction = resendInterventionInviteSaga();
    const takeLatestDescriptor = sagaFunction.next().value;
    expect(takeLatestDescriptor).toEqual(
      takeLatest(
        [RESEND_INTERVENTION_INVITE_REQUEST],
        resendInterventionInvite,
      ),
    );
  });
});
