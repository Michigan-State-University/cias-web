import { actionBuilder } from 'utils/actionBuilder';
import {
  LOG_IN_USER,
  LOG_OUT,
  EDIT_USER_REQUEST,
  EDIT_USER_SUCCESS,
  EDIT_USER_ERROR,
} from './constants';

export const logIn = user => actionBuilder(LOG_IN_USER, { user });

export const logOut = () => actionBuilder(LOG_OUT, {});

export const editUserRequest = user => actionBuilder(EDIT_USER_REQUEST, user);

export const editUserSuccess = user =>
  actionBuilder(EDIT_USER_SUCCESS, { user });

export const editUserError = () => actionBuilder(EDIT_USER_ERROR, {});
