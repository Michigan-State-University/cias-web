import axios from 'axios';
import { takeLatest } from 'redux-saga/effects';
import * as matchers from 'redux-saga-test-plan/matchers';
import { throwError } from 'redux-saga-test-plan/providers';
import { expectSaga } from 'redux-saga-test-plan';

import { toast } from 'react-toastify';
import { formatMessage } from 'utils/intlOutsideReact';
import { createProblem } from 'utils/reducerCreators';

import {
  sendInterventionInviteSuccess,
  fetchInterventionEmailsSuccess,
  sendInterventionInviteError,
} from '../../actions';
import {
  SEND_INTERVENTION_INVITE_SUCCESS,
  SEND_INTERVENTION_INVITE_ERROR,
  SEND_INTERVENTION_INVITE_REQUEST,
} from '../../constants';
import messages from '../../messages';
import { initialState } from '../../reducer';
import sendInterventionInviteSaga, {
  sendInterventionInvite,
} from '../sendInterventionInvite';

describe('sendInterventionInvite saga', () => {
  const index = 0;
  const mockState = { problem: { ...initialState, problem: createProblem() } };
  const apiResponse = {
    intervention_invitations: [
      { user_id: '0', email: 'user0@mail.com' },
      { user_id: '1', email: 'user1@mail.com' },
    ],
  };
  const payload = {
    interventionId: mockState.problem.problem.interventions[index].id,
    emails: ['user00@mail.com', 'user10@mail.com'],
  };

  it('Check sendInterventionInvite generator success connection', () =>
    expectSaga(sendInterventionInvite, { payload })
      .withState(mockState)
      .provide([[matchers.call.fn(axios.post), { data: apiResponse }]])
      .put(sendInterventionInviteSuccess())
      .put(
        fetchInterventionEmailsSuccess(
          apiResponse.intervention_invitations,
          index,
        ),
      )
      .call(toast.info, formatMessage(messages.sendInviteSuccess), {
        toastId: SEND_INTERVENTION_INVITE_SUCCESS,
      })
      .run());

  it('Check sendInterventionInvite error connection', () => {
    const error = new Error('test');
    return expectSaga(sendInterventionInvite, { payload })
      .withState(mockState)
      .provide([[matchers.call.fn(axios.post), throwError(error)]])
      .put(sendInterventionInviteError())
      .call(toast.error, formatMessage(messages.sendInviteError), {
        toastId: SEND_INTERVENTION_INVITE_ERROR,
      })
      .run();
  });

  it('Check sendInterventionInvite connection', () => {
    const sagaFunction = sendInterventionInviteSaga();
    const takeLatestDescriptor = sagaFunction.next().value;
    expect(takeLatestDescriptor).toEqual(
      takeLatest([SEND_INTERVENTION_INVITE_REQUEST], sendInterventionInvite),
    );
  });
});