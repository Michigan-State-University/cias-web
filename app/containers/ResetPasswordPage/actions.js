import { actionBuilder } from 'utils/actionBuilder';
import {
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_ERROR,
} from './constants';

export const resetPasswordRequest = (email) =>
  actionBuilder(RESET_PASSWORD_REQUEST, { email });
export const resetPasswordSuccess = () =>
  actionBuilder(RESET_PASSWORD_SUCCESS, {});
export const resetPasswordError = (error) =>
  actionBuilder(RESET_PASSWORD_ERROR, { error });
