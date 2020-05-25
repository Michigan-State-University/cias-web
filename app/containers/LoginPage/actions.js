/*
 *
 * LoginPage actions
 *
 */

import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_ERROR } from './constants';
import { actionBuilder } from '../../utils/actionBuilder';

const loginRequest = (username, password) =>
  actionBuilder(LOGIN_REQUEST, { username, password });

const loginSuccess = authData => actionBuilder(LOGIN_SUCCESS, authData);

const loginError = error => actionBuilder(LOGIN_ERROR, { error });

export { loginRequest, loginSuccess, loginError };
