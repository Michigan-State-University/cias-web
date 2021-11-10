/*
 *
 * UserList actions
 *
 */

import { actionBuilder } from 'utils/actionBuilder';
import {
  FETCH_USER_REQUEST,
  FETCH_USER_FAILURE,
  FETCH_USER_SUCCESS,
  EDIT_OTHER_USER_REQUEST,
  EDIT_OTHER_USER_SUCCESS,
  EDIT_OTHER_USER_ERROR,
  ADD_OTHER_USER_AVATAR_REQUEST,
  ADD_OTHER_USER_AVATAR_SUCCESS,
  ADD_OTHER_USER_AVATAR_ERROR,
  DELETE_OTHER_USER_AVATAR_REQUEST,
  DELETE_OTHER_USER_AVATAR_SUCCESS,
  DELETE_OTHER_USER_AVATAR_ERROR,
  CHANGE_ACTIVATE_STATUS_REQUEST,
  CHANGE_ACTIVATE_STATUS_SUCCESS,
  CHANGE_ACTIVATE_STATUS_ERROR,
  RESEND_INVITATION_LINK_REQUEST,
  RESEND_INVITATION_LINK_SUCCESS,
  RESEND_INVITATION_LINK_ERROR,
} from './constants';

export const fetchUserRequest = id => actionBuilder(FETCH_USER_REQUEST, { id });
export const fetchUserSuccess = user => actionBuilder(FETCH_USER_SUCCESS, user);
export const fetchUserFailure = error =>
  actionBuilder(FETCH_USER_FAILURE, error);

export const editOtherUserRequest = userData =>
  actionBuilder(EDIT_OTHER_USER_REQUEST, userData);
export const editOtherUserSuccess = user =>
  actionBuilder(EDIT_OTHER_USER_SUCCESS, { user });
export const editOtherUserError = error =>
  actionBuilder(EDIT_OTHER_USER_ERROR, error);

export const addOtherUserAvatarRequest = userData =>
  actionBuilder(ADD_OTHER_USER_AVATAR_REQUEST, userData);
export const addOtherUserAvatarSuccess = user =>
  actionBuilder(ADD_OTHER_USER_AVATAR_SUCCESS, { user });
export const addOtherUserAvatarError = error =>
  actionBuilder(ADD_OTHER_USER_AVATAR_ERROR, error);

export const deleteOtherUserAvatarRequest = userId =>
  actionBuilder(DELETE_OTHER_USER_AVATAR_REQUEST, { userId });
export const deleteOtherUserAvatarSuccess = user =>
  actionBuilder(DELETE_OTHER_USER_AVATAR_SUCCESS, { user });
export const deleteOtherUserAvatarError = error =>
  actionBuilder(DELETE_OTHER_USER_AVATAR_ERROR, error);

export const changeActivateStatusRequest = (userId, active) =>
  actionBuilder(CHANGE_ACTIVATE_STATUS_REQUEST, { userId, active });
export const changeActivateStatusSuccess = user =>
  actionBuilder(CHANGE_ACTIVATE_STATUS_SUCCESS, { user });
export const changeActivateStatusError = error =>
  actionBuilder(CHANGE_ACTIVATE_STATUS_ERROR, error);

export const resendInvitationLinkRequest = userId =>
  actionBuilder(RESEND_INVITATION_LINK_REQUEST, { userId });
export const resendInvitationLinkSuccess = () =>
  actionBuilder(RESEND_INVITATION_LINK_SUCCESS, {});
export const resendInvitationLinkError = error =>
  actionBuilder(RESEND_INVITATION_LINK_ERROR, { error });
