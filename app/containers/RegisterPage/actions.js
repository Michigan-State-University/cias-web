/*
 *
 * RegisterPage actions
 *
 */

import {
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
} from './constants';
import { actionBuilder } from '../../utils/actionBuilder';

export const register = payload => actionBuilder(REGISTER_REQUEST, payload);

export const registerSuccess = () => actionBuilder(REGISTER_SUCCESS, {});

export const registerFailure = payload =>
  actionBuilder(REGISTER_FAILURE, payload);
