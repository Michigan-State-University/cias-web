import { SET_TOKEN } from './constants';

export const setToken = token => ({
  type: SET_TOKEN,
  payload: token,
});
