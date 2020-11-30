import axios from 'axios';
import { takeLatest } from 'redux-saga/effects';
import * as matchers from 'redux-saga-test-plan/matchers';
import { throwError } from 'redux-saga-test-plan/providers';
import { expectSaga } from 'redux-saga-test-plan';

import { toast } from 'react-toastify';
import { formatMessage } from 'utils/intlOutsideReact';
import { createProblem } from 'utils/reducerCreators';

import sendSessionInviteSaga, {
  sendSessionInvite,
} from 'global/reducers/intervention/sagas/sendSessionInvite';
import {
  sendSessionInviteSuccess,
  fetchSessionEmailsSuccess,
  sendSessionInviteError,
} from '../../actions';
import {
  SEND_SESSION_INVITE_SUCCESS,
  SEND_SESSION_INVITE_ERROR,
  SEND_SESSION_INVITE_REQUEST,
} from '../../constants';
import messages from '../../messages';
import { initialState } from '../../reducer';

describe('sendInterventionInvite saga', () => {
  const index = 0;
  const mockState = { problem: { ...initialState, problem: createProblem() } };
  const apiResponse = {
    session_invitations: [
      { user_id: '0', email: 'user0@mail.com' },
      { user_id: '1', email: 'user1@mail.com' },
    ],
  };
  const payload = {
    sessionId: mockState.problem.problem.sessions[index].id,
    emails: ['user00@mail.com', 'user10@mail.com'],
  };

  it('Check sendInterventionInvite generator success connection', () =>
    expectSaga(sendSessionInvite, { payload })
      .withState(mockState)
      .provide([[matchers.call.fn(axios.post), { data: apiResponse }]])
      .put(sendSessionInviteSuccess())
      .put(fetchSessionEmailsSuccess(apiResponse.session_invitations, index))
      .call(toast.info, formatMessage(messages.sendInviteSuccess), {
        toastId: SEND_SESSION_INVITE_SUCCESS,
      })
      .run());

  it('Check sendInterventionInvite error connection', () => {
    const error = new Error('test');
    return expectSaga(sendSessionInvite, { payload })
      .withState(mockState)
      .provide([[matchers.call.fn(axios.post), throwError(error)]])
      .put(sendSessionInviteError())
      .call(toast.error, formatMessage(messages.sendInviteError), {
        toastId: SEND_SESSION_INVITE_ERROR,
      })
      .run();
  });

  it('Check sendInterventionInvite connection', () => {
    const sagaFunction = sendSessionInviteSaga();
    const takeLatestDescriptor = sagaFunction.next().value;
    expect(takeLatestDescriptor).toEqual(
      takeLatest([SEND_SESSION_INVITE_REQUEST], sendSessionInvite),
    );
  });
});
