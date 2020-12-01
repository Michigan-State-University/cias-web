import { actionBuilder } from 'utils/actionBuilder';
import {
  FETCH_PROBLEM_REQUEST,
  FETCH_PROBLEM_SUCCESS,
  FETCH_PROBLEM_ERROR,
  CREATE_PROBLEM_REQUEST,
  CREATE_PROBLEM_SUCCESS,
  CREATE_PROBLEM_ERROR,
  EDIT_PROBLEM_REQUEST,
  EDIT_PROBLEM_SUCCESS,
  EDIT_PROBLEM_ERROR,
  SEND_PROBLEM_CSV_REQUEST,
  SEND_PROBLEM_CSV_SUCCESS,
  SEND_PROBLEM_CSV_ERROR,
  COPY_SESSION_SUCCESS,
  COPY_SESSION_REQUEST,
  REORDER_SESSION_LIST,
  CHANGE_CURRENT_SESSION,
  REORDER_SESSION_LIST_SUCCESS,
  REORDER_SESSION_LIST_ERROR,
  CHANGE_ACCESS_SETTING_REQUEST,
  CHANGE_ACCESS_SETTING_SUCCESS,
  CHANGE_ACCESS_SETTING_ERROR,
  ENABLE_USER_ACCESS_REQUEST,
  ENABLE_USER_ACCESS_SUCCESS,
  ENABLE_USER_ACCESS_ERROR,
  FETCH_USERS_WITH_ACCESS_REQUEST,
  FETCH_USERS_WITH_ACCESS_SUCCESS,
  FETCH_USERS_WITH_ACCESS_ERROR,
  REVOKE_USER_ACCESS_REQUEST,
  REVOKE_USER_ACCESS_SUCCESS,
  REVOKE_USER_ACCESS_ERROR,
  CREATE_SESSION_REQUEST,
  CREATE_SESSION_SUCCESS,
  CREATE_SESSION_ERROR,
  SEND_SESSION_INVITE_REQUEST,
  SEND_SESSION_INVITE_SUCCESS,
  SEND_SESSION_INVITE_ERROR,
  RESEND_SESSION_INVITE_REQUEST,
  FETCH_SESSION_EMAILS_REQUEST,
  FETCH_SESSION_EMAILS_SUCCESS,
  FETCH_SESSION_EMAILS_ERROR,
  UPDATE_SESSION_SETTINGS_REQUEST,
  UPDATE_SESSION_SETTINGS_SUCCESS,
  UPDATE_SESSION_SETTINGS_ERROR,
} from './constants';

export const fetchInterventionRequest = id =>
  actionBuilder(FETCH_PROBLEM_REQUEST, { id });
export const fetchInterventionSuccess = intervention =>
  actionBuilder(FETCH_PROBLEM_SUCCESS, { intervention });
export const fetchInterventionError = error =>
  actionBuilder(FETCH_PROBLEM_ERROR, { error });

export const sendInterventionCsvRequest = id =>
  actionBuilder(SEND_PROBLEM_CSV_REQUEST, { id });
export const sendInterventionCsvSuccess = message =>
  actionBuilder(SEND_PROBLEM_CSV_SUCCESS, { message });
export const sendInterventionCsvError = error =>
  actionBuilder(SEND_PROBLEM_CSV_ERROR, { error });

export const createInterventionRequest = () =>
  actionBuilder(CREATE_PROBLEM_REQUEST, {});
export const createInterventionSuccess = intervention =>
  actionBuilder(CREATE_PROBLEM_SUCCESS, { intervention });
export const createInterventionError = error =>
  actionBuilder(CREATE_PROBLEM_ERROR, { error });

export const editInterventionRequest = payload =>
  actionBuilder(EDIT_PROBLEM_REQUEST, payload);
export const editInterventionSuccess = intervention =>
  actionBuilder(EDIT_PROBLEM_SUCCESS, { intervention });
export const editInterventionError = () =>
  actionBuilder(EDIT_PROBLEM_ERROR, {});

export const copySessionRequest = payload =>
  actionBuilder(COPY_SESSION_REQUEST, payload);
export const copySessionSuccess = session =>
  actionBuilder(COPY_SESSION_SUCCESS, { session });

export const reorderSessionList = payload =>
  actionBuilder(REORDER_SESSION_LIST, payload);
export const reorderSessionsSuccess = payload =>
  actionBuilder(REORDER_SESSION_LIST_SUCCESS, payload);
export const reorderSessionsError = payload =>
  actionBuilder(REORDER_SESSION_LIST_ERROR, payload);

export const updateSessionSettings = (data, fields = []) =>
  actionBuilder(UPDATE_SESSION_SETTINGS_REQUEST, data, fields);

export const updateSessionSettingsSuccess = () =>
  actionBuilder(UPDATE_SESSION_SETTINGS_SUCCESS, {});

export const updateSessionSettingsError = () =>
  actionBuilder(UPDATE_SESSION_SETTINGS_ERROR, {});

export const changeCurrentSession = index =>
  actionBuilder(CHANGE_CURRENT_SESSION, { index });
export const changeAccessSettingRequest = (id, setting) =>
  actionBuilder(CHANGE_ACCESS_SETTING_REQUEST, { id, setting });
export const changeAccessSettingSuccess = () =>
  actionBuilder(CHANGE_ACCESS_SETTING_SUCCESS, {});
export const changeAccessSettingFailure = payload =>
  actionBuilder(CHANGE_ACCESS_SETTING_ERROR, payload);

export const enableUserAccessRequest = (id, emails) =>
  actionBuilder(ENABLE_USER_ACCESS_REQUEST, { id, emails });
export const enableUserAccessSuccess = emails =>
  actionBuilder(ENABLE_USER_ACCESS_SUCCESS, { emails });
export const enableUserAccessFailure = payload =>
  actionBuilder(ENABLE_USER_ACCESS_ERROR, payload);

export const fetchUsersWithAccessRequest = id =>
  actionBuilder(FETCH_USERS_WITH_ACCESS_REQUEST, { id });
export const fetchUsersWithAccessSuccess = userAccess =>
  actionBuilder(FETCH_USERS_WITH_ACCESS_SUCCESS, { userAccess });
export const fetchUsersWithAccessFailure = payload =>
  actionBuilder(FETCH_USERS_WITH_ACCESS_ERROR, payload);

export const revokeUserAccessRequest = (interventionId, userId) =>
  actionBuilder(REVOKE_USER_ACCESS_REQUEST, { interventionId, userId });
export const revokeUserAccessSuccess = userId =>
  actionBuilder(REVOKE_USER_ACCESS_SUCCESS, { userId });
export const revokeUserAccessFailure = (userId, error) =>
  actionBuilder(REVOKE_USER_ACCESS_ERROR, { userId, error });

export const createSessionRequest = (id, lastPosition) =>
  actionBuilder(CREATE_SESSION_REQUEST, { id, lastPosition });
export const createSessionSuccess = session =>
  actionBuilder(CREATE_SESSION_SUCCESS, { session });
export const createSessionError = () => actionBuilder(CREATE_SESSION_ERROR, {});

export const sendSessionInviteRequest = (emails, sessionId) =>
  actionBuilder(SEND_SESSION_INVITE_REQUEST, { emails, sessionId });
export const sendSessionInviteSuccess = () =>
  actionBuilder(SEND_SESSION_INVITE_SUCCESS, {});
export const sendSessionInviteError = () =>
  actionBuilder(SEND_SESSION_INVITE_ERROR, {});

export const resendSessionInviteRequest = (id, sessionId) =>
  actionBuilder(RESEND_SESSION_INVITE_REQUEST, { id, sessionId });

export const fetchSessionEmailsRequest = index =>
  actionBuilder(FETCH_SESSION_EMAILS_REQUEST, { index });
export const fetchSessionEmailsSuccess = (emails, index) =>
  actionBuilder(FETCH_SESSION_EMAILS_SUCCESS, { emails, index });
export const fetchSessionEmailsError = error =>
  actionBuilder(FETCH_SESSION_EMAILS_ERROR, { error });
