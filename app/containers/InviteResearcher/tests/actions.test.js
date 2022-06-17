import { Roles } from 'models/User/RolesManager';
import { defaultTimeZone } from 'utils/timezones';

import {
  inviteResearcherRequest,
  inviteResearcherSuccess,
  inviteResearcherError,
  getInvitationsRequest,
  getInvitationsSuccess,
  getInvitationsError,
  cancelInvitationRequest,
  cancelInvitationSuccess,
  cancelInvitationError,
  changeEmailInput,
  changeErrorValue,
} from '../actions';
import {
  INVITE_RESEARCHER_REQUEST,
  INVITE_RESEARCHER_SUCCESS,
  INVITE_RESEARCHER_ERROR,
  GET_INVITATIONS_REQUEST,
  GET_INVITATIONS_SUCCESS,
  GET_INVITATIONS_ERROR,
  CANCEL_INVITATION_REQUEST,
  CANCEL_INVITATION_SUCCESS,
  CANCEL_INVITATION_ERROR,
  CHANGE_EMAIL_INPUT,
  CHANGE_ERROR_VALUE,
} from '../constants';

describe('Invite researcher actions', () => {
  it('has a type of INVITE_RESEARCHER_REQUEST', () => {
    const email = 'email1';
    const expectedResult = {
      payload: {
        email,
      },
      type: INVITE_RESEARCHER_REQUEST,
    };
    expect(inviteResearcherRequest(email)).toEqual(expectedResult);
  });
  it('has a type of INVITE_RESEARCHER_SUCCESS', () => {
    const user = {
      id: 'asd-123as',
      firstName: '',
      lastName: '',
      fullName: '',
      email: 'email@gmail.com',
      roles: [Roles.researcher],
      avatar: null,
      timeZone: defaultTimeZone,
      active: true,
    };
    const expectedResult = {
      payload: {
        user,
      },
      type: INVITE_RESEARCHER_SUCCESS,
    };
    expect(inviteResearcherSuccess(user)).toEqual(expectedResult);
  });
  it('has a type of INVITE_RESEARCHER_ERROR', () => {
    const error = 'Error!';
    const expectedResult = {
      payload: {
        error,
      },
      type: INVITE_RESEARCHER_ERROR,
    };
    expect(inviteResearcherError(error)).toEqual(expectedResult);
  });
});

describe('Get invitations actions', () => {
  it('has a type of GET_INVITATIONS_REQUEST', () => {
    const expectedResult = {
      payload: {},
      type: GET_INVITATIONS_REQUEST,
    };
    expect(getInvitationsRequest()).toEqual(expectedResult);
  });
  it('has a type of GET_INVITATIONS_SUCCESS', () => {
    const invitations = [
      {
        id: 'asd-123as',
        email: 'email@gmail.com',
      },
      {
        id: 'a22sd-2123as',
        email: 'email2@gmail.com',
      },
    ];
    const expectedResult = {
      payload: {
        invitations,
      },
      type: GET_INVITATIONS_SUCCESS,
    };
    expect(getInvitationsSuccess(invitations)).toEqual(expectedResult);
  });
  it('has a type of GET_INVITATIONS_ERROR', () => {
    const error = 'Error!';
    const expectedResult = {
      payload: {
        error,
      },
      type: GET_INVITATIONS_ERROR,
    };
    expect(getInvitationsError(error)).toEqual(expectedResult);
  });
});

describe('Cancel invitation actions', () => {
  it('has a type of CANCEL_INVITATION_REQUEST', () => {
    const id = 'asd-213das';
    const expectedResult = {
      payload: { id },
      type: CANCEL_INVITATION_REQUEST,
    };
    expect(cancelInvitationRequest(id)).toEqual(expectedResult);
  });
  it('has a type of CANCEL_INVITATION_SUCCESS', () => {
    const id = 'asd-213das';
    const expectedResult = {
      payload: {
        id,
      },
      type: CANCEL_INVITATION_SUCCESS,
    };
    expect(cancelInvitationSuccess(id)).toEqual(expectedResult);
  });
  it('has a type of CANCEL_INVITATION_ERROR', () => {
    const error = 'Error!';
    const expectedResult = {
      payload: {
        error,
      },
      type: CANCEL_INVITATION_ERROR,
    };
    expect(cancelInvitationError(error)).toEqual(expectedResult);
  });
});

describe('Other actions', () => {
  it('has a type of CHANGE_EMAIL_INPUT', () => {
    const inputValue = 'Test';
    const expectedResult = {
      payload: {
        value: inputValue,
      },
      type: CHANGE_EMAIL_INPUT,
    };
    expect(changeEmailInput(inputValue)).toEqual(expectedResult);
  });
  it('has a type of CHANGE_ERROR_VALUE', () => {
    const errorType = 'invite';
    const newError = 'Error!';
    const expectedResult = {
      payload: {
        error: errorType,
        value: newError,
      },
      type: CHANGE_ERROR_VALUE,
    };
    expect(changeErrorValue(errorType, newError)).toEqual(expectedResult);
  });
});
