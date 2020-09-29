import { defaultTimeZone } from 'utils/timezones';

import {
  registerParticipantRequest,
  registerParticipantSuccess,
  registerParticipantError,
  registerResearcherRequest,
  registerResearcherSuccess,
  registerResearcherError,
} from '../actions';
import {
  REGISTER_PARTICIPANT_REQUEST,
  REGISTER_PARTICIPANT_SUCCESS,
  REGISTER_PARTICIPANT_ERROR,
  REGISTER_RESEARCHER_REQUEST,
  REGISTER_RESEARCHER_SUCCESS,
  REGISTER_RESEARCHER_ERROR,
} from '../constants';

describe('RegisterPage actions', () => {
  it('has a type of REGISTER_PARTICIPANT_REQUEST', () => {
    const payload = {
      email: 'email@gmail.com',
      firstName: 'First',
      lastName: 'Last',
      password: 'Password1!',
      passwordConfirmation: 'Password1!',
      timeZone: defaultTimeZone,
    };
    const expected = {
      type: REGISTER_PARTICIPANT_REQUEST,
      payload,
    };
    expect(registerParticipantRequest(payload)).toEqual(expected);
  });
  it('has a type of REGISTER_PARTICIPANT_SUCCESS', () => {
    const payload = {};
    const expected = {
      type: REGISTER_PARTICIPANT_SUCCESS,
      payload,
    };
    expect(registerParticipantSuccess()).toEqual(expected);
  });
  it('has a type of REGISTER_PARTICIPANT_ERROR', () => {
    const error = 'Error!';
    const payload = { error };
    const expected = {
      type: REGISTER_PARTICIPANT_ERROR,
      payload,
    };
    expect(registerParticipantError(error)).toEqual(expected);
  });
  it('has a type of REGISTER_RESEARCHER_REQUEST', () => {
    const payload = {
      firstName: 'First',
      lastName: 'Last',
      password: 'Password1!',
      passwordConfirmation: 'Password1!',
      timeZone: defaultTimeZone,
      invitationToken: 'ansiuu91ndmao12-kmcsa',
    };
    const expected = {
      type: REGISTER_RESEARCHER_REQUEST,
      payload,
    };
    expect(registerResearcherRequest(payload)).toEqual(expected);
  });
  it('has a type of REGISTER_RESEARCHER_SUCCESS', () => {
    const payload = {};
    const expected = {
      type: REGISTER_RESEARCHER_SUCCESS,
      payload,
    };
    expect(registerResearcherSuccess()).toEqual(expected);
  });
  it('has a type of REGISTER_RESEARCHER_ERROR', () => {
    const error = 'Error!';
    const payload = { error };
    const expected = {
      type: REGISTER_RESEARCHER_ERROR,
      payload,
    };
    expect(registerResearcherError(error)).toEqual(expected);
  });
});
