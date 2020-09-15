import { actionBuilder } from 'utils/actionBuilder';
import {
  SET_NEW_PASSWORD_ERROR,
  SET_NEW_PASSWORD_REQUEST,
  SET_NEW_PASSWORD_SUCCESS,
} from './constants';

export const setNewPasswordRequest = data =>
  actionBuilder(SET_NEW_PASSWORD_REQUEST, data);
export const setNewPasswordSuccess = () =>
  actionBuilder(SET_NEW_PASSWORD_SUCCESS, {});
export const setNewPasswordError = error =>
  actionBuilder(SET_NEW_PASSWORD_ERROR, { error });
