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
  CONFIRM_PHONE_NUMBER_REQUEST,
  CONFIRM_PHONE_NUMBER_SUCCESS,
  CONFIRM_PHONE_NUMBER_ERROR,
  SEND_SMS_TOKEN_REQUEST,
  SEND_SMS_TOKEN_SUCCESS,
  SEND_SMS_TOKEN_ERROR,
  LOG_IN_GUEST,
  EDIT_PHONE_NUMBER_PREVIEW_REQUEST,
  EDIT_PHONE_NUMBER_PREVIEW_SUCCESS,
  EDIT_PHONE_NUMBER_PREVIEW_ERROR,
  RESET_PHONE_NUMBER_PREVIEW,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  VERIFICATION_CODE_REQUEST,
  VERIFICATION_CODE_SUCCESS,
  VERIFICATION_CODE_ERROR,
  VERIFICATION_CODE_NEEDED,
  RESET_REDUCER,
  FETCH_SELF_DETAILS_REQUEST,
  FETCH_SELF_DETAILS_SUCCESS,
  UPDATE_USERS_TIMEZONE,
  TERMS_NOT_ACCEPTED,
  TERMS_ACCEPT_REQUEST,
  TERMS_ACCEPT_SUCCESS,
  TERMS_ACCEPT_ERROR,
} from './constants';

export const logIn = (user) => actionBuilder(LOG_IN_USER, { user });
export const logInGuestRequest = () => actionBuilder(LOG_IN_GUEST);

export const logOut = (redirectTo) => actionBuilder(LOG_OUT, { redirectTo });

export const resetReducer = () => actionBuilder(RESET_REDUCER, {});

export const editUserRequest = (user) =>
  actionBuilder(EDIT_USER_REQUEST, { user });
export const editUserSuccess = (user) =>
  actionBuilder(EDIT_USER_SUCCESS, { user });
export const editUserError = (error) =>
  actionBuilder(EDIT_USER_ERROR, { error });

export const editPhoneNumberPreviewRequest = (phoneNumber, isPreview) =>
  actionBuilder(EDIT_PHONE_NUMBER_PREVIEW_REQUEST, { phoneNumber, isPreview });
export const editPhoneNumberPreviewSuccess = (phoneNumber, isPreview) =>
  actionBuilder(EDIT_PHONE_NUMBER_PREVIEW_SUCCESS, { phoneNumber, isPreview });
export const editPhoneNumberPreviewError = (error) =>
  actionBuilder(EDIT_PHONE_NUMBER_PREVIEW_ERROR, { error });
export const resetPhoneNumberPreview = () =>
  actionBuilder(RESET_PHONE_NUMBER_PREVIEW, {});

export const changePasswordRequest = (data) =>
  actionBuilder(CHANGE_PASSWORD_REQUEST, data);
export const changePasswordSuccess = () =>
  actionBuilder(CHANGE_PASSWORD_SUCCESS, {});
export const changePasswordError = (error) =>
  actionBuilder(CHANGE_PASSWORD_ERROR, { error });

export const changeEmailRequest = (data) =>
  actionBuilder(CHANGE_EMAIL_REQUEST, data);
export const changeEmailSuccess = (user) =>
  actionBuilder(CHANGE_EMAIL_SUCCESS, { user });
export const changeEmailError = (error) =>
  actionBuilder(CHANGE_EMAIL_ERROR, { error });

export const addAvatarRequest = (data) =>
  actionBuilder(ADD_AVATAR_REQUEST, data);
export const addAvatarSuccess = (user) =>
  actionBuilder(ADD_AVATAR_SUCCESS, { user });
export const addAvatarError = () => actionBuilder(ADD_AVATAR_ERROR, {});

export const deleteAvatarRequest = () =>
  actionBuilder(DELETE_AVATAR_REQUEST, {});
export const deleteAvatarSuccess = (user) =>
  actionBuilder(DELETE_AVATAR_SUCCESS, { user });
export const deleteAvatarError = () => actionBuilder(DELETE_AVATAR_ERROR, {});

export const changePhoneNumberRequest = (data) =>
  actionBuilder(CHANGE_PHONE_NUMBER_REQUEST, { data });
export const changePhoneNumberSuccess = ({ phoneNumber }) =>
  actionBuilder(CHANGE_PHONE_NUMBER_SUCCESS, { phoneNumber });
export const changePhoneNumberError = (error) =>
  actionBuilder(CHANGE_PHONE_NUMBER_ERROR, { error });

export const confirmPhoneNumberRequest = (smsToken, onSuccess) =>
  actionBuilder(CONFIRM_PHONE_NUMBER_REQUEST, { smsToken, onSuccess });
export const confirmPhoneNumberSuccess = () =>
  actionBuilder(CONFIRM_PHONE_NUMBER_SUCCESS, {});
export const confirmPhoneNumberError = (error) =>
  actionBuilder(CONFIRM_PHONE_NUMBER_ERROR, { error });

export const sendSmsTokenRequest = () =>
  actionBuilder(SEND_SMS_TOKEN_REQUEST, {});
export const sendSmsTokenSuccess = () =>
  actionBuilder(SEND_SMS_TOKEN_SUCCESS, {});
export const sendSmsTokenError = (error) =>
  actionBuilder(SEND_SMS_TOKEN_ERROR, { error });

export const changeErrorStatus = (error, value) =>
  actionBuilder(CHANGE_ERROR_STATUS, { error, value });

export const loginRequest = (email, password) =>
  actionBuilder(LOGIN_REQUEST, { email, password });

export const loginSuccess = () => actionBuilder(LOGIN_SUCCESS);

export const loginError = (error) => actionBuilder(LOGIN_ERROR, { error });

export const verificationCodeNeeded = () =>
  actionBuilder(VERIFICATION_CODE_NEEDED, {});

export const termsNotAccepted = (fields, password) =>
  actionBuilder(TERMS_NOT_ACCEPTED, { fields, password });

export const verificationCodeRequest = (verificationCode) =>
  actionBuilder(VERIFICATION_CODE_REQUEST, { verificationCode });

export const verificationCodeSuccess = () =>
  actionBuilder(VERIFICATION_CODE_SUCCESS);

export const verificationCodeError = (error) =>
  actionBuilder(VERIFICATION_CODE_ERROR, { error });

export const fetchSelfDetailsRequest = () =>
  actionBuilder(FETCH_SELF_DETAILS_REQUEST, {});
export const fetchSelfDetailsSuccess = (user) =>
  actionBuilder(FETCH_SELF_DETAILS_SUCCESS, { user });

export const updateUsersTimezone = (timezone) =>
  actionBuilder(UPDATE_USERS_TIMEZONE, { timezone });

export const termsAcceptRequest = (fields, onSuccess) =>
  actionBuilder(TERMS_ACCEPT_REQUEST, { fields, onSuccess });
export const termsAcceptSuccess = () => actionBuilder(TERMS_ACCEPT_SUCCESS, {});
export const termsAcceptError = (error) =>
  actionBuilder(TERMS_ACCEPT_ERROR, { error });
