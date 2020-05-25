import { actionBuilder } from 'utils/actionBuilder';
import { SET_AUTH_DATA, SET_TOKEN } from './constants';

export const setAuthData = authData =>
  actionBuilder(SET_AUTH_DATA, { ...authData });

export const setToken = token => actionBuilder(SET_TOKEN, token);
