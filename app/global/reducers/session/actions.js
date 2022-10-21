import { actionBuilder } from 'utils/actionBuilder';

import {
  GET_SESSION_REQUEST,
  GET_SESSION_SUCCESS,
  GET_SESSION_ERROR,
  EDIT_SESSION_REQUEST,
  EDIT_SESSION_SUCCESS,
  EDIT_SESSION_ERROR,
  BULK_EDIT_SESSION_REQUEST,
  UPDATE_NARRATOR_SUCCESS,
} from './constants';

export const getSessionRequest = (payload) =>
  actionBuilder(GET_SESSION_REQUEST, payload);
export const getSessionSuccess = (session) =>
  actionBuilder(GET_SESSION_SUCCESS, { session });
export const getSessionError = (error) =>
  actionBuilder(GET_SESSION_ERROR, { error });

export const editSessionRequest = (payload, fields = [], sessionId) =>
  actionBuilder(EDIT_SESSION_REQUEST, { ...payload, sessionId }, fields);
export const bulkEditSessionRequest = (session) =>
  actionBuilder(BULK_EDIT_SESSION_REQUEST, { session });
export const editSessionSuccess = (session) =>
  actionBuilder(EDIT_SESSION_SUCCESS, { session });
export const editSessionError = (error) =>
  actionBuilder(EDIT_SESSION_ERROR, { error });
export const updateNarratorSuccess = () =>
  actionBuilder(UPDATE_NARRATOR_SUCCESS, {});
