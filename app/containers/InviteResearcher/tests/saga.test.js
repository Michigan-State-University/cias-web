import { toast } from 'react-toastify';
import { takeLatest, put, call } from 'redux-saga/effects';
import { expectSaga } from 'redux-saga-test-plan';

import { Roles } from 'models/User/RolesManager';
import { addUserToList } from 'global/reducers/userList';
import { defaultTimeZone } from 'utils/timezones';
import { formatMessage } from 'utils/intlOutsideReact';

import * as matchers from 'redux-saga-test-plan/matchers';
import axios from 'axios';
import { jsonApiToArray } from 'utils/jsonApiMapper';
import messages from '../messages';
import {
  CANCEL_INVITATION_REQUEST,
  CANCEL_INVITATION_SUCCESS,
  GET_INVITATIONS_REQUEST,
  INVITE_RESEARCHER_REQUEST,
  INVITE_RESEARCHER_SUCCESS,
} from '../constants';
import {
  cancelInvitationSuccess,
  getInvitationsSuccess,
  inviteResearcherSuccess,
} from '../actions';
import cancelInvitationSaga, {
  cancelInvitation,
} from '../sagas/cancelInvitation';
import inviteResearcherSaga, {
  inviteResearcher,
} from '../sagas/inviteResearcher';
import getInvitationsSaga, { getInvitations } from '../sagas/getInvitations';

const stepper = (fn) => (mock) => fn.next(mock).value;

describe('inviteResearcher saga', () => {
  it('Check inviteResearcher generator success connection', () => {
    const email = 'email1';

    const apiResponse = {
      data: {
        id: '12-a23mc-21',
        type: 'user',
        attributes: {
          firstName: '',
          lastName: '',
          fullName: '',
          email: 'email@gmail.com',
          roles: [Roles.Researcher],
          avatar: null,
          timeZone: defaultTimeZone,
          active: true,
        },
      },
    };
    const mockUser = {
      id: '12-a23mc-21',
      firstName: '',
      lastName: '',
      fullName: '',
      email: 'email@gmail.com',
      roles: [Roles.Researcher],
      avatar: null,
      timeZone: defaultTimeZone,
      active: true,
    };

    return expectSaga(inviteResearcher, { payload: { email } })
      .provide([[matchers.call.fn(axios.post), { data: apiResponse }]])
      .put(inviteResearcherSuccess(mockUser))
      .put(addUserToList(mockUser))
      .call(toast.success, formatMessage(messages.invitationSent), {
        toastId: INVITE_RESEARCHER_SUCCESS,
      })
      .run();
  });
  it('Check inviteResearcherSaga connection', () => {
    const sagaFunction = inviteResearcherSaga();
    const takeLatestDescriptor = sagaFunction.next().value;
    expect(takeLatestDescriptor).toEqual(
      takeLatest(INVITE_RESEARCHER_REQUEST, inviteResearcher),
    );
  });
});

describe('getInvitations saga', () => {
  it('Check getInvitations generator success connection', () => {
    const apiResponse = {
      data: {
        data: [
          { id: 17, type: 'user', attributes: { email: 'test@test.pl' } },
          {
            id: 18,
            type: 'user',
            attributes: { email: 'tetS2@twst.pl' },
          },
        ],
      },
    };
    const step = stepper(getInvitations());
    step();
    const successTrigger = step(apiResponse);
    expect(successTrigger).toEqual(
      put(getInvitationsSuccess(jsonApiToArray(apiResponse.data, 'user'))),
    );
    const lastResponse = step();
    expect(lastResponse).toEqual(undefined);
  });
  it('Check getInvitations connection', () => {
    const sagaFunction = getInvitationsSaga();
    const takeLatestDescriptor = sagaFunction.next().value;
    expect(takeLatestDescriptor).toEqual(
      takeLatest(GET_INVITATIONS_REQUEST, getInvitations),
    );
  });
});

describe('cancelInvitation saga', () => {
  it('Check cancelInvitation generator success connection', () => {
    const id = '1203-samn213-sa1';
    const step = stepper(cancelInvitation({ payload: { id } }));
    step();
    const successTrigger = step();
    expect(successTrigger).toEqual(put(cancelInvitationSuccess(id)));
    const toastTrigger = step();
    expect(toastTrigger).toEqual(
      call(toast.success, formatMessage(messages.successCanceling), {
        toastId: CANCEL_INVITATION_SUCCESS,
      }),
    );
    const lastResponse = step();
    expect(lastResponse).toEqual(undefined);
  });
  it('Check inviteResearcherSaga connection', () => {
    const sagaFunction = cancelInvitationSaga();
    const takeLatestDescriptor = sagaFunction.next().value;
    expect(takeLatestDescriptor).toEqual(
      takeLatest(CANCEL_INVITATION_REQUEST, cancelInvitation),
    );
  });
});
