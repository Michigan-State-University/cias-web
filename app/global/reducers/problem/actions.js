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
  COPY_INTERVENTION_SUCCESS,
  COPY_INTERVENTION_REQUEST,
  REORDER_INTERVENTION_LIST,
  UPDATE_INTERVENTION_SETTINGS,
  CHANGE_CURRENT_INTERVENTION,
  REORDER_INTERVENTION_LIST_SUCCESS,
  REORDER_INTERVENTION_LIST_ERROR,
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
  CREATE_INTERVENTION_REQUEST,
  CREATE_INTERVENTION_SUCCESS,
  CREATE_INTERVENTION_ERROR,
  SEND_INTERVENTION_INVITE_REQUEST,
  SEND_INTERVENTION_INVITE_SUCCESS,
  SEND_INTERVENTION_INVITE_ERROR,
  RESEND_INTERVENTION_INVITE_REQUEST,
  FETCH_INTERVENTION_EMAILS_REQUEST,
  FETCH_INTERVENTION_EMAILS_SUCCESS,
  FETCH_INTERVENTION_EMAILS_ERROR,
  DELETE_INTERVENTION_INVITE_REQUEST,
  DELETE_INTERVENTION_INVITE_SUCCESS,
  DELETE_INTERVENTION_INVITE_ERROR,
} from './constants';

export const fetchProblemRequest = id =>
  actionBuilder(FETCH_PROBLEM_REQUEST, { id });
export const fetchProblemSuccess = problem =>
  actionBuilder(FETCH_PROBLEM_SUCCESS, { problem });
export const fetchProblemError = error =>
  actionBuilder(FETCH_PROBLEM_ERROR, { error });

export const sendProblemCsvRequest = id =>
  actionBuilder(SEND_PROBLEM_CSV_REQUEST, { id });
export const sendProblemCsvSuccess = message =>
  actionBuilder(SEND_PROBLEM_CSV_SUCCESS, { message });
export const sendProblemCsvError = error =>
  actionBuilder(SEND_PROBLEM_CSV_ERROR, { error });

export const createProblemRequest = () =>
  actionBuilder(CREATE_PROBLEM_REQUEST, {});
export const createProblemSuccess = problem =>
  actionBuilder(CREATE_PROBLEM_SUCCESS, { problem });
export const createProblemError = error =>
  actionBuilder(CREATE_PROBLEM_ERROR, { error });

export const editProblemRequest = payload =>
  actionBuilder(EDIT_PROBLEM_REQUEST, payload);
export const editProblemSuccess = problem =>
  actionBuilder(EDIT_PROBLEM_SUCCESS, { problem });
export const editProblemError = () => actionBuilder(EDIT_PROBLEM_ERROR, {});

export const copyInterventionRequest = payload =>
  actionBuilder(COPY_INTERVENTION_REQUEST, payload);
export const copyInterventionSuccess = intervention =>
  actionBuilder(COPY_INTERVENTION_SUCCESS, { intervention });

export const reorderInterventionList = payload =>
  actionBuilder(REORDER_INTERVENTION_LIST, payload);
export const reorderSessionsSuccess = payload =>
  actionBuilder(REORDER_INTERVENTION_LIST_SUCCESS, payload);
export const reorderSessionsError = payload =>
  actionBuilder(REORDER_INTERVENTION_LIST_ERROR, payload);

export const updateInterventionSettings = data =>
  actionBuilder(UPDATE_INTERVENTION_SETTINGS, data);

export const changeCurrentIntervention = index =>
  actionBuilder(CHANGE_CURRENT_INTERVENTION, { index });
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

export const revokeUserAccessRequest = (problemId, userId) =>
  actionBuilder(REVOKE_USER_ACCESS_REQUEST, { problemId, userId });
export const revokeUserAccessSuccess = userId =>
  actionBuilder(REVOKE_USER_ACCESS_SUCCESS, { userId });
export const revokeUserAccessFailure = (userId, error) =>
  actionBuilder(REVOKE_USER_ACCESS_ERROR, { userId, error });

export const createInterventionRequest = (id, lastPosition) =>
  actionBuilder(CREATE_INTERVENTION_REQUEST, { id, lastPosition });
export const createInterventionSuccess = intervention =>
  actionBuilder(CREATE_INTERVENTION_SUCCESS, { intervention });
export const createInterventionError = () =>
  actionBuilder(CREATE_INTERVENTION_ERROR, {});

export const sendInterventionInviteRequest = (emails, interventionId) =>
  actionBuilder(SEND_INTERVENTION_INVITE_REQUEST, { emails, interventionId });
export const sendInterventionInviteSuccess = () =>
  actionBuilder(SEND_INTERVENTION_INVITE_SUCCESS, {});
export const sendInterventionInviteError = () =>
  actionBuilder(SEND_INTERVENTION_INVITE_ERROR, {});

export const resendInterventionInviteRequest = (id, interventionId) =>
  actionBuilder(RESEND_INTERVENTION_INVITE_REQUEST, { id, interventionId });

export const fetchInterventionEmailsRequest = index =>
  actionBuilder(FETCH_INTERVENTION_EMAILS_REQUEST, { index });
export const fetchInterventionEmailsSuccess = (emails, index) =>
  actionBuilder(FETCH_INTERVENTION_EMAILS_SUCCESS, { emails, index });
export const fetchInterventionEmailsError = error =>
  actionBuilder(FETCH_INTERVENTION_EMAILS_ERROR, { error });

export const deleteInterventionInviteRequest = (id, interventionId) =>
  actionBuilder(DELETE_INTERVENTION_INVITE_REQUEST, { id, interventionId });
export const deleteInterventionInviteSuccess = () =>
  actionBuilder(DELETE_INTERVENTION_INVITE_SUCCESS, {});
export const deleteInterventionInviteError = () =>
  actionBuilder(DELETE_INTERVENTION_INVITE_ERROR, {});
