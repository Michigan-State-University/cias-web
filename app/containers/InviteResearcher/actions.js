import { actionBuilder } from 'utils/actionBuilder';

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
} from './constants';

export const inviteResearcherRequest = email =>
  actionBuilder(INVITE_RESEARCHER_REQUEST, { email });
export const inviteResearcherSuccess = user =>
  actionBuilder(INVITE_RESEARCHER_SUCCESS, { user });
export const inviteResearcherError = error =>
  actionBuilder(INVITE_RESEARCHER_ERROR, { error });

export const getInvitationsRequest = () =>
  actionBuilder(GET_INVITATIONS_REQUEST, {});
export const getInvitationsSuccess = invitations =>
  actionBuilder(GET_INVITATIONS_SUCCESS, { invitations });
export const getInvitationsError = error =>
  actionBuilder(GET_INVITATIONS_ERROR, { error });

export const cancelInvitationRequest = id =>
  actionBuilder(CANCEL_INVITATION_REQUEST, { id });
export const cancelInvitationSuccess = id =>
  actionBuilder(CANCEL_INVITATION_SUCCESS, { id });
export const cancelInvitationError = error =>
  actionBuilder(CANCEL_INVITATION_ERROR, { error });

export const changeEmailInput = value =>
  actionBuilder(CHANGE_EMAIL_INPUT, { value });

export const changeErrorValue = (error, value) =>
  actionBuilder(CHANGE_ERROR_VALUE, { error, value });
