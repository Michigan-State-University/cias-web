import { actionBuilder } from 'utils/actionBuilder';
import {
  LOG_IN_USER,
  LOG_OUT,
  EDIT_USER_REQUEST,
  EDIT_USER_SUCCESS,
  EDIT_USER_ERROR,
  CHANGE_PASSWORD_REQUEST,
  CHANGE_PASSWORD_SUCCESS,
  CHANGE_PASSWORD_ERROR,
  CHANGE_ERROR_STATUS,
  CHANGE_EMAIL_REQUEST,
  CHANGE_EMAIL_SUCCESS,
  CHANGE_EMAIL_ERROR,
  ADD_AVATAR_REQUEST,
  ADD_AVATAR_SUCCESS,
  ADD_AVATAR_ERROR,
  DELETE_AVATAR_REQUEST,
  DELETE_AVATAR_SUCCESS,
  DELETE_AVATAR_ERROR,
  CHANGE_PHONE_NUMBER_REQUEST,
  CHANGE_PHONE_NUMBER_SUCCESS,
  CHANGE_PHONE_NUMBER_ERROR,
  CHANGE_NOTIFICATIONS_SETTINGS_REQUEST,
  CHANGE_NOTIFICATIONS_SETTINGS_SUCCESS,
  CHANGE_NOTIFICATIONS_SETTINGS_ERROR,
  CONFIRM_PHONE_NUMBER_REQUEST,
  CONFIRM_PHONE_NUMBER_SUCCESS,
  CONFIRM_PHONE_NUMBER_ERROR,
  SEND_SMS_TOKEN_REQUEST,
  SEND_SMS_TOKEN_SUCCESS,
  SEND_SMS_TOKEN_ERROR,
  LOG_IN_GUEST,
} from './constants';

export const logIn = user => actionBuilder(LOG_IN_USER, { user });
export const logInGuestRequest = () => actionBuilder(LOG_IN_GUEST);

export const logOut = () => actionBuilder(LOG_OUT, {});

export const editUserRequest = user =>
  actionBuilder(EDIT_USER_REQUEST, { user });
export const editUserSuccess = user =>
  actionBuilder(EDIT_USER_SUCCESS, { user });
export const editUserError = error => actionBuilder(EDIT_USER_ERROR, { error });

export const changePasswordRequest = data =>
  actionBuilder(CHANGE_PASSWORD_REQUEST, data);
export const changePasswordSuccess = () =>
  actionBuilder(CHANGE_PASSWORD_SUCCESS, {});
export const changePasswordError = error =>
  actionBuilder(CHANGE_PASSWORD_ERROR, { error });

export const changeEmailRequest = data =>
  actionBuilder(CHANGE_EMAIL_REQUEST, data);
export const changeEmailSuccess = user =>
  actionBuilder(CHANGE_EMAIL_SUCCESS, { user });
export const changeEmailError = error =>
  actionBuilder(CHANGE_EMAIL_ERROR, { error });

export const addAvatarRequest = data => actionBuilder(ADD_AVATAR_REQUEST, data);
export const addAvatarSuccess = user =>
  actionBuilder(ADD_AVATAR_SUCCESS, { user });
export const addAvatarError = () => actionBuilder(ADD_AVATAR_ERROR, {});

export const deleteAvatarRequest = () =>
  actionBuilder(DELETE_AVATAR_REQUEST, {});
export const deleteAvatarSuccess = user =>
  actionBuilder(DELETE_AVATAR_SUCCESS, { user });
export const deleteAvatarError = () => actionBuilder(DELETE_AVATAR_ERROR, {});

export const changePhoneNumberRequest = data =>
  actionBuilder(CHANGE_PHONE_NUMBER_REQUEST, { data });
export const changePhoneNumberSuccess = ({ phoneNumber }) =>
  actionBuilder(CHANGE_PHONE_NUMBER_SUCCESS, { phoneNumber });
export const changePhoneNumberError = error =>
  actionBuilder(CHANGE_PHONE_NUMBER_ERROR, { error });

export const confirmPhoneNumberRequest = (smsToken, onSuccess) =>
  actionBuilder(CONFIRM_PHONE_NUMBER_REQUEST, { smsToken, onSuccess });
export const confirmPhoneNumberSuccess = () =>
  actionBuilder(CONFIRM_PHONE_NUMBER_SUCCESS, {});
export const confirmPhoneNumberError = error =>
  actionBuilder(CONFIRM_PHONE_NUMBER_ERROR, { error });

export const sendSmsTokenRequest = () =>
  actionBuilder(SEND_SMS_TOKEN_REQUEST, {});
export const sendSmsTokenSuccess = () =>
  actionBuilder(SEND_SMS_TOKEN_SUCCESS, {});
export const sendSmsTokenError = error =>
  actionBuilder(SEND_SMS_TOKEN_ERROR, { error });

export const changeNotificationsSettingsRequest = notificationsSettings =>
  actionBuilder(CHANGE_NOTIFICATIONS_SETTINGS_REQUEST, {
    notificationsSettings,
  });
export const changeNotificationsSettingsSuccess = () =>
  actionBuilder(CHANGE_NOTIFICATIONS_SETTINGS_SUCCESS, {});
export const changeNotificationsSettingsError = () =>
  actionBuilder(CHANGE_NOTIFICATIONS_SETTINGS_ERROR, {});

export const changeErrorStatus = (error, value) =>
  actionBuilder(CHANGE_ERROR_STATUS, { error, value });
