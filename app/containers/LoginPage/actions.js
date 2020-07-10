/*
 *
 * LoginPage actions
 *
 */

import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_ERROR } from './constants';
import { actionBuilder } from '../../utils/actionBuilder';

const loginRequest = (email, password) =>
  actionBuilder(LOGIN_REQUEST, { email, password });

const loginSuccess = () => actionBuilder(LOGIN_SUCCESS);

const loginError = error => actionBuilder(LOGIN_ERROR, { error });

export { loginRequest, loginSuccess, loginError };
