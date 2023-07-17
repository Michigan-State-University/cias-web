/*
 *
 * RegisterPage actions
 *
 */

import { actionBuilder } from 'utils/actionBuilder';

import {
  REGISTER_PARTICIPANT_REQUEST,
  REGISTER_PARTICIPANT_SUCCESS,
  REGISTER_PARTICIPANT_ERROR,
  REGISTER_FROM_INVITATION_REQUEST,
  REGISTER_FROM_INVITATION_SUCCESS,
  REGISTER_FROM_INVITATION_ERROR,
  CLEAR_ERRORS,
} from './constants';

export const registerParticipantRequest = (payload) =>
  actionBuilder(REGISTER_PARTICIPANT_REQUEST, payload);

export const registerParticipantSuccess = () =>
  actionBuilder(REGISTER_PARTICIPANT_SUCCESS, {});

export const registerParticipantError = (error) =>
  actionBuilder(REGISTER_PARTICIPANT_ERROR, { error });

export const registerFromInvitationRequest = (payload) =>
  actionBuilder(REGISTER_FROM_INVITATION_REQUEST, payload);

export const registerFromInvitationSuccess = () =>
  actionBuilder(REGISTER_FROM_INVITATION_SUCCESS, {});

export const registerFromInvitationError = (error) =>
  actionBuilder(REGISTER_FROM_INVITATION_ERROR, { error });

export const clearErrors = () => actionBuilder(CLEAR_ERRORS, {});
