import { actionBuilder } from 'utils/actionBuilder';
import { LOG_IN_USER, LOG_OUT } from './constants';

export const logIn = user => actionBuilder(LOG_IN_USER, { user });

export const logOut = () => actionBuilder(LOG_OUT, {});
