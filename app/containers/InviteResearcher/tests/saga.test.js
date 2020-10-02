import { success as showSuccess } from 'react-toastify-redux';
import { takeLatest, put } from 'redux-saga/effects';

import { Roles } from 'models/User/UserRoles';
import { addUserToList } from 'global/reducers/userList';
import { defaultTimeZone } from 'utils/timezones';

import messages from '../messages';
import {
  CANCEL_INVITATION_REQUEST,
  CANCEL_INVITATION_SUCCESS,
  GET_INVITATIONS_REQUEST,
  INVITE_RESEARCHER_REQUEST,
  INVITE_RESEARCHER_SUCCESS,
} from '../constants';
import { formatMessage } from '../../../utils/intlOutsideReact';
import {
  // cancelInvitationError,
  cancelInvitationSuccess,
  getInvitationsError,
  getInvitationsSuccess,
  inviteResearcherError,
  inviteResearcherSuccess,
} from '../actions';
import cancelInvitationSaga, {
  cancelInvitation,
} from '../sagas/cancelInvitation';
import inviteResearcherSaga, {
  inviteResearcher,
} from '../sagas/inviteResearcher';
import getInvitationsSaga, { getInvitations } from '../sagas/getInvitations';

const stepper = fn => mock => fn.next(mock).value;

describe('inviteResearcher saga', () => {
  it('Check inviteResearcher generator success connection', () => {
    const apiResponse = {
      data: {
        id: '12-a23mc-21',
        email: 'email@gmail.com',
      },
    };
    const mockUser = {
      id: '12-a23mc-21',
      firstName: '',
      lastName: '',
      fullName: '',
      email: 'email@gmail.com',
      roles: [Roles.researcher],
      avatar: null,
      timeZone: defaultTimeZone,
      active: true,
    };

    const email = 'email1';
    const step = stepper(inviteResearcher({ payload: { email } }));
    step();
    const successTrigger = step(apiResponse);
    expect(successTrigger).toEqual(put(inviteResearcherSuccess(mockUser)));
    const addToUserListTrigger = step();
    expect(addToUserListTrigger).toEqual(put(addUserToList(mockUser)));
    const toastTrigger = step();
    expect(toastTrigger).toEqual(
      put(
        showSuccess(formatMessage(messages.invitationSent), {
          id: INVITE_RESEARCHER_SUCCESS,
        }),
      ),
    );
    const lastResponse = step();
    expect(lastResponse).toEqual(undefined);
  });
  it('Check inviteResearcher error connection', () => {
    const error = "TypeError: Cannot read property 'data' of undefined";
    const email = 'email1';
    const step = stepper(inviteResearcher({ payload: { email } }));
    step();
    const errorTrigger = step();
    expect(errorTrigger).toEqual(put(inviteResearcherError(error.toString())));
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
        invitations: [
          {
            id: 'asd-123as',
            email: 'email@gmail.com',
          },
          {
            id: 'a22sd-2123as',
            email: 'email2@gmail.com',
          },
        ],
      },
    };
    const step = stepper(getInvitations());
    step();
    const successTrigger = step(apiResponse);
    expect(successTrigger).toEqual(
      put(getInvitationsSuccess(apiResponse.data.invitations)),
    );
    const lastResponse = step();
    expect(lastResponse).toEqual(undefined);
  });
  it('Check getInvitations error connection', () => {
    const error = "TypeError: Cannot read property 'data' of undefined";
    const step = stepper(getInvitations());
    step();
    const errorTrigger = step();
    expect(errorTrigger).toEqual(put(getInvitationsError(error.toString())));
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
      put(
        showSuccess(formatMessage(messages.successCanceling), {
          id: CANCEL_INVITATION_SUCCESS,
        }),
      ),
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
