import { actionBuilder } from 'utils/actionBuilder';

import {
  GET_SESSION_REQUEST,
  GET_SESSION_SUCCESS,
  GET_SESSION_ERROR,
  EDIT_SESSION_REQUEST,
  EDIT_SESSION_SUCCESS,
  EDIT_SESSION_ERROR,
} from './constants';

export const getSessionRequest = payload =>
  actionBuilder(GET_SESSION_REQUEST, payload);
export const getSessionSuccess = session =>
  actionBuilder(GET_SESSION_SUCCESS, { session });
export const getSessionError = error =>
  actionBuilder(GET_SESSION_ERROR, { error });

export const editSessionRequest = (payload, fields = []) =>
  actionBuilder(EDIT_SESSION_REQUEST, payload, fields);
export const editSessionSuccess = session =>
  actionBuilder(EDIT_SESSION_SUCCESS, { session });
export const editSessionError = error =>
  actionBuilder(EDIT_SESSION_ERROR, { error });
