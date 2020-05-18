/*
 *
 * LoginPage actions
 *
 */

import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_ERROR } from './constants';
import { actionBuilder } from '../../utils/actionBuilder';

const loginRequest = (username, password) =>
  actionBuilder(LOGIN_REQUEST, { username, password });

const loginSuccess = token => actionBuilder(LOGIN_SUCCESS, { token });

const loginError = error => actionBuilder(LOGIN_ERROR, { error });

export { loginRequest, loginSuccess, loginError };
