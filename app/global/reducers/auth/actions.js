import { actionBuilder } from 'utils/actionBuilder';
import { SET_IS_LOGGED_IN, LOG_OUT } from './constants';

export const setIsLoggedIn = isLoggedIn =>
  actionBuilder(SET_IS_LOGGED_IN, { isLoggedIn });

export const logOut = () => actionBuilder(LOG_OUT);
