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
  CHANGE_NOTIFICATIONS_SETTINGS_REQUEST,
  CHANGE_NOTIFICATIONS_SETTINGS_SUCCESS,
  CHANGE_NOTIFICATIONS_SETTINGS_ERROR,
  SEND_SMS_TOKEN_REQUEST,
  SEND_SMS_TOKEN_SUCCESS,
  SEND_SMS_TOKEN_ERROR,
  CONFIRM_PHONE_NUMBER_REQUEST,
  CONFIRM_PHONE_NUMBER_SUCCESS,
  CONFIRM_PHONE_NUMBER_ERROR,
} from './constants';

export const initialState = {
  user: null,
  errors: {
    changePasswordError: null,
    changeEmailError: null,
    changePhoneNumberError: null,
  },
  loaders: {
    changePasswordLoading: false,
    changeEmailLoading: false,
    changePhoneNumberLoading: false,
    smsTokenLoading: false,
    confirmPhoneNumberLoading: false,
  },
  cache: {
    user: null,
  },
};

/* eslint-disable default-case, no-param-reassign */
export const authReducer = (state = initialState, { type, payload }) =>
  produce(state, draft => {
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
        draft.user.phone.confirmed = true;
        break;
      case SEND_SMS_TOKEN_ERROR:
        draft.loaders.smsTokenLoading = false;
        break;

      case CONFIRM_PHONE_NUMBER_REQUEST:
        draft.loaders.confirmPhoneNumberLoading = true;
        break;
      case CONFIRM_PHONE_NUMBER_SUCCESS:
        draft.loaders.confirmPhoneNumberLoading = false;
        break;
      case CONFIRM_PHONE_NUMBER_ERROR:
        draft.loaders.confirmPhoneNumberLoading = false;
        break;

      case CHANGE_NOTIFICATIONS_SETTINGS_REQUEST:
        draft.cache.user = state.user;
        draft.user.notificationsSettings = payload.notificationsSettings;
        break;
      case CHANGE_NOTIFICATIONS_SETTINGS_SUCCESS:
        draft.cache.user = null;
        break;
      case CHANGE_NOTIFICATIONS_SETTINGS_ERROR:
        draft.user = state.cache.user;
        break;
    }
  });
