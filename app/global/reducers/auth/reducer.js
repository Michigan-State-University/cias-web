/*
 *
 * auth reducer
 *
 */
import produce from 'immer';

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
  SEND_SMS_TOKEN_REQUEST,
  SEND_SMS_TOKEN_SUCCESS,
  SEND_SMS_TOKEN_ERROR,
  CONFIRM_PHONE_NUMBER_REQUEST,
  CONFIRM_PHONE_NUMBER_SUCCESS,
  CONFIRM_PHONE_NUMBER_ERROR,
  EDIT_PHONE_NUMBER_PREVIEW_REQUEST,
  EDIT_PHONE_NUMBER_PREVIEW_SUCCESS,
  EDIT_PHONE_NUMBER_PREVIEW_ERROR,
  RESET_PHONE_NUMBER_PREVIEW,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  VERIFICATION_CODE_NEEDED,
  VERIFICATION_CODE_REQUEST,
  VERIFICATION_CODE_SUCCESS,
  VERIFICATION_CODE_ERROR,
  TERMS_NOT_ACCEPTED,
  TERMS_ACCEPT_REQUEST,
  TERMS_ACCEPT_SUCCESS,
  TERMS_ACCEPT_ERROR,
} from './constants';

export const initialState = {
  user: null,
  phoneNumberPreview: null,
  verificationCodeNeeded: false,
  termsNotAccepted: false,
  termsNotAcceptedExtraFields: null,
  verificationCodeSuccess: false,
  loginFormData: {
    email: '',
    password: '',
  },
  errors: {
    loginError: null,
    verificationCodeError: null,
    changePasswordError: null,
    changeEmailError: null,
    changePhoneNumberError: null,
    termsAcceptError: null,
  },
  loaders: {
    loginLoading: false,
    verificationCodeLoading: false,
    changePasswordLoading: false,
    changeEmailLoading: false,
    changePhoneNumberLoading: false,
    smsTokenLoading: false,
    confirmPhoneNumberLoading: false,
    termsAcceptLoading: false,
  },
  cache: {
    user: null,
    phoneNumberPreview: null,
  },
};

/* eslint-disable default-case, no-param-reassign */
export const authReducer = (state = initialState, { type, payload }) =>
  produce(state, (draft) => {
    switch (type) {
      case LOG_IN_USER:
        draft.user = payload.user;
        draft.cache.user = state.user;
        break;

      case LOG_OUT:
        draft.user = null;
        draft.cache.user = null;
        break;

      case EDIT_USER_REQUEST:
        draft.cache.user = state.user;
        draft.user = {
          ...state.user,
          ...payload.user,
        };
        break;

      case EDIT_USER_SUCCESS:
        draft.user = payload.user;
        draft.cache.user = payload.user;
        break;

      case EDIT_USER_ERROR:
        draft.user = state.cache.user;
        break;

      case CHANGE_PASSWORD_REQUEST:
        draft.errors.changePasswordError = null;
        draft.loaders.changePasswordLoading = true;
        break;

      case CHANGE_PASSWORD_SUCCESS:
        draft.loaders.changePasswordLoading = false;
        draft.errors.changePasswordError = null;
        break;

      case CHANGE_PASSWORD_ERROR:
        draft.loaders.changePasswordLoading = false;
        draft.errors.changePasswordError = payload.error;
        break;

      case CHANGE_EMAIL_REQUEST:
        draft.errors.changeEmailError = null;
        draft.loaders.changeEmailLoading = true;
        break;

      case CHANGE_EMAIL_SUCCESS:
        draft.loaders.changeEmailLoading = false;
        draft.errors.changeEmailError = null;
        draft.user.email = payload.user.email;
        break;

      case CHANGE_EMAIL_ERROR:
        draft.loaders.changeEmailLoading = false;
        draft.errors.changeEmailError = payload.error;
        break;

      case ADD_AVATAR_REQUEST:
        draft.cache.user = state.user;
        draft.user.avatar = payload.imageUrl;
        break;

      case ADD_AVATAR_SUCCESS:
        draft.user = payload.user;
        draft.cache.user = state.user;
        break;

      case ADD_AVATAR_ERROR:
        draft.user = state.cache.user;
        break;

      case DELETE_AVATAR_REQUEST:
        draft.user.avatar = null;
        break;

      case DELETE_AVATAR_SUCCESS:
        draft.user = payload.user;
        draft.cache.user = state.user;
        break;

      case DELETE_AVATAR_ERROR:
        draft.user = draft.cache.user;
        break;

      case CHANGE_ERROR_STATUS:
        draft.errors[payload.error] = payload.value;
        break;

      case CHANGE_PHONE_NUMBER_REQUEST:
        draft.errors.changePhoneNumberError = null;
        draft.loaders.changePhoneNumberLoading = true;
        draft.cache.user = state.user;
        break;

      case CHANGE_PHONE_NUMBER_SUCCESS:
        draft.loaders.changePhoneNumberLoading = false;
        draft.errors.changePhoneNumberError = null;
        draft.cache.user = null;
        draft.user.phoneNumber = payload.phoneNumber;
        break;

      case CHANGE_PHONE_NUMBER_ERROR:
        draft.loaders.changePhoneNumberLoading = false;
        draft.user = state.cache.user;
        draft.errors.changePhoneNumberError = payload.error;
        break;

      case SEND_SMS_TOKEN_REQUEST:
        draft.loaders.smsTokenLoading = true;
        break;

      case SEND_SMS_TOKEN_SUCCESS:
        draft.loaders.smsTokenLoading = false;
        break;

      case SEND_SMS_TOKEN_ERROR:
        draft.loaders.smsTokenLoading = false;
        break;

      case CONFIRM_PHONE_NUMBER_REQUEST:
        draft.loaders.confirmPhoneNumberLoading = true;
        break;

      case CONFIRM_PHONE_NUMBER_SUCCESS:
        draft.loaders.confirmPhoneNumberLoading = false;
        if (state.phoneNumberPreview) draft.phoneNumberPreview.confirmed = true;
        else draft.user.phone.confirmed = true;
        break;

      case CONFIRM_PHONE_NUMBER_ERROR:
        draft.loaders.confirmPhoneNumberLoading = false;
        break;

      case EDIT_PHONE_NUMBER_PREVIEW_REQUEST:
        break;

      case EDIT_PHONE_NUMBER_PREVIEW_SUCCESS:
        const { phoneNumber, isPreview } = payload;
        if (isPreview) {
          draft.phoneNumberPreview = phoneNumber;
          draft.cache.phoneNumberPreview = phoneNumber;
        } else if (!state.user) draft.user = { phone: phoneNumber };
        else draft.user.phone = phoneNumber;
        draft.cache.user = state.user;
        break;

      case EDIT_PHONE_NUMBER_PREVIEW_ERROR:
        if (payload.isPreview) {
          draft.phoneNumberPreview = state.cache.phoneNumberPreview;
        } else {
          draft.user = state.cache.user;
        }
        break;

      case RESET_PHONE_NUMBER_PREVIEW:
        draft.phoneNumberPreview = null;
        break;

      case LOGIN_REQUEST:
        draft.loginFormData = {
          email: payload.email,
          password: payload.password,
        };
        draft.verificationCodeNeeded = false;
        draft.verificationCodeSuccess = false;
        draft.errors.loginError = '';
        draft.loaders.loginLoading = true;
        draft.termsNotAccepted = false;
        draft.termsNotAcceptedExtraFields = null;
        break;

      case LOGIN_SUCCESS:
        draft.loginFormData = {
          email: '',
          password: '',
        };
        draft.errors.loginError = '';
        draft.loaders.loginLoading = false;
        break;

      case LOGIN_ERROR:
        draft.loaders.loginLoading = false;
        draft.errors.loginError = payload.error;
        break;

      case VERIFICATION_CODE_NEEDED:
        draft.verificationCodeNeeded = true;
        break;

      case VERIFICATION_CODE_REQUEST:
        draft.verificationCodeSuccess = false;
        draft.loaders.verificationCodeLoading = true;
        draft.errors.verificationCodeError = null;
        break;

      case VERIFICATION_CODE_SUCCESS:
        draft.verificationCodeSuccess = true;
        draft.loaders.verificationCodeLoading = false;
        draft.errors.verificationCodeError = null;
        break;

      case VERIFICATION_CODE_ERROR:
        draft.loaders.verificationCodeLoading = false;
        draft.errors.verificationCodeError = payload.error;
        break;

      case TERMS_NOT_ACCEPTED:
        draft.termsNotAccepted = true;
        draft.termsNotAcceptedExtraFields = payload.fields;
        break;

      case TERMS_ACCEPT_REQUEST:
        draft.errors.termsAcceptError = null;
        draft.loaders.termsAcceptLoading = true;
        break;

      case TERMS_ACCEPT_SUCCESS:
        draft.loaders.termsAcceptLoading = false;
        break;

      case TERMS_ACCEPT_ERROR:
        draft.loaders.termsAcceptLoading = false;
        draft.errors.termsAcceptError = payload.error;
        break;
    }
  });
