import { SET_TOKEN } from './constants';
import { actionBuilder } from '../../../utils/actionBuilder';

export const setToken = token => actionBuilder(SET_TOKEN, { token });
