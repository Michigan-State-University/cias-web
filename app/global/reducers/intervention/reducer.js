import produce from 'immer';
import set from 'lodash/set';
import get from 'lodash/get';

import { defaultMapper } from 'utils/mapResponseObjects';
import interventionSettingsReducer from './sessionSettings/reducer';
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
  REORDER_SESSION_LIST,
  UPDATE_SESSION_SETTINGS_REQUEST,
  UPDATE_SESSION_SETTINGS_SUCCESS,
  UPDATE_SESSION_SETTINGS_ERROR,
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
  CREATE_SESSION_ERROR,
  CREATE_SESSION_SUCCESS,
  SEND_SESSION_INVITE_ERROR,
  SEND_SESSION_INVITE_REQUEST,
  SEND_SESSION_INVITE_SUCCESS,
  RESEND_SESSION_INVITE_REQUEST,
  FETCH_SESSION_EMAILS_REQUEST,
  FETCH_SESSION_EMAILS_SUCCESS,
  FETCH_SESSION_EMAILS_ERROR,
} from './constants';

export const initialState = {
  currentSessionIndex: 0,
  problem: null,
  emails: [],
  cache: {
    problem: null,
  },
  loaders: {
    fetchProblemLoading: true,
    createProblemLoading: false,
    sendCsvLoading: false,
    editProblem: false,
    changeAccessSettingLoading: false,
    fetchUserAccessLoading: false,
    fetchSessionEmailsLoading: false,
    createSessionLoading: false,
    sendSessionLoading: false,
    sessionEmailLoading: {
      id: null,
      email: null,
    },
  },
  errors: {
    fetchProblemError: null,
    fetchSessionEmailsError: null,
    createProblemError: null,
    changeAccessSettingError: null,
    fetchUserAccessError: null,
    createSessionError: null,
  },
};

const findInterventionIndex = (problem, sessionId) =>
  problem.sessions.findIndex(({ id }) => id === sessionId);

/* eslint-disable default-case, no-param-reassign */
export const problemReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case FETCH_PROBLEM_REQUEST:
        if (state.problem && action.payload.id === state.problem.id) break;
        draft.loaders.fetchProblemLoading = true;
        draft.loaders.fetchProblemError = null;
        draft.problem = null;
        break;
      case FETCH_PROBLEM_SUCCESS:
        draft.loaders.fetchProblemLoading = false;
        // to discuss the solution in the future, FETCH_PROBLEM_SUCCESS overwrites FETCH_USERS_WITH_ACCESS_SUCCESS
        const temp = get(draft.problem, 'usersWithAccess', null);
        draft.problem = action.payload.problem;
        set(draft.problem, 'usersWithAccess', temp);
        draft.cache.problem = action.payload.problem;
        break;
      case FETCH_PROBLEM_ERROR:
        draft.loaders.fetchProblemLoading = false;
        draft.errors.fetchProblemError = action.payload.error;
        break;
      case CREATE_PROBLEM_REQUEST:
        draft.loaders.createProblemLoading = true;
        draft.loaders.createProblemError = null;
        break;
      case CREATE_PROBLEM_SUCCESS:
        draft.loaders.createProblemLoading = false;
        break;
      case CREATE_PROBLEM_ERROR:
        break;
      case EDIT_PROBLEM_REQUEST:
        set(draft.problem, action.payload.path, action.payload.value);
        break;
      case EDIT_PROBLEM_SUCCESS:
        draft.problem = action.payload.problem;
        draft.cache.problem = action.payload.problem;
        break;
      case EDIT_PROBLEM_ERROR:
        draft.problem = draft.cache.problem;
        break;
      case SEND_PROBLEM_CSV_REQUEST:
        draft.loaders.sendCsvLoading = true;
        break;
      case SEND_PROBLEM_CSV_SUCCESS:
        draft.loaders.sendCsvLoading = false;
        break;
      case SEND_PROBLEM_CSV_ERROR:
        draft.loaders.sendCsvLoading = false;
        break;
      case COPY_SESSION_SUCCESS:
        draft.problem.sessions.push(defaultMapper(action.payload.session));
        break;
      case REORDER_SESSION_LIST:
        draft.cache.problem = state.problem;
        draft.problem.sessions = action.payload.reorderedList;
        break;
      case CHANGE_CURRENT_SESSION:
        draft.currentSessionIndex = action.payload.index;
        break;
      case UPDATE_SESSION_SETTINGS_REQUEST: {
        const sessionIndex = state.problem.sessions.findIndex(
          intervention => intervention.id === action.payload.data.sessionId,
        );
        if (sessionIndex > -1) {
          draft.currentSessionIndex = sessionIndex;
          draft.loaders.editProblem = true;
          draft.problem.sessions[sessionIndex] = {
            ...interventionSettingsReducer(
              draft.problem.sessions[sessionIndex],
              action.payload,
            ),
          };
        }
        break;
      }
      case UPDATE_SESSION_SETTINGS_SUCCESS:
        draft.cache.problem = state.problem;
        break;
      case UPDATE_SESSION_SETTINGS_ERROR:
        draft.problem = state.cache.problem;
        break;
      case REORDER_SESSION_LIST_SUCCESS:
        draft.cache.problem = state.problem;
        break;
      case REORDER_SESSION_LIST_ERROR:
        draft.problem = state.cache.problem;
        break;
      case CHANGE_ACCESS_SETTING_REQUEST:
        draft.problem.shared_to = action.payload.setting;
        draft.cache.problem = state.problem;
        break;
      case CHANGE_ACCESS_SETTING_SUCCESS:
        draft.cache.problem = draft.problem;
        break;
      case CHANGE_ACCESS_SETTING_ERROR:
        draft.problem = state.cache.problem;
        break;
      case ENABLE_USER_ACCESS_REQUEST:
        draft.loaders.enableAccessLoading = true;
        break;
      case ENABLE_USER_ACCESS_SUCCESS:
        draft.loaders.enableAccessLoading = false;
        draft.problem.usersWithAccess = [...action.payload.emails];
        break;
      case ENABLE_USER_ACCESS_ERROR:
        draft.loaders.enableAccessLoading = false;
        draft.errors.enableAccessError = action.payload.error;
        break;
      case FETCH_USERS_WITH_ACCESS_REQUEST:
        draft.loaders.fetchUserAccessLoading = true;
        break;
      case FETCH_USERS_WITH_ACCESS_SUCCESS:
        draft.loaders.fetchUserAccessLoading = false;
        draft.errors.fetchUserAccessError = null;
        draft.problem.usersWithAccess = action.payload.userAccess;
        break;
      case FETCH_USERS_WITH_ACCESS_ERROR:
        draft.loaders.fetchUserAccessLoading = false;
        draft.errors.fetchUserAccessError = action.payload.message;
        break;
      case REVOKE_USER_ACCESS_REQUEST:
        let userIndex = state.problem.usersWithAccess.findIndex(
          ({ id }) => id === action.payload.userId,
        );
        draft.problem.usersWithAccess[userIndex].loading = true;
        break;
      case REVOKE_USER_ACCESS_SUCCESS:
        draft.problem.usersWithAccess = state.problem.usersWithAccess.filter(
          ({ id }) => id !== action.payload.userId,
        );
        break;
      case REVOKE_USER_ACCESS_ERROR:
        userIndex = state.problem.usersWithAccess.findIndex(
          ({ id }) => id === action.payload.userId,
        );
        draft.problem.usersWithAccess[userIndex].loading = false;
        break;
      case CREATE_SESSION_REQUEST:
        draft.loaders.createSessionLoading = true;
        break;
      case CREATE_SESSION_SUCCESS:
        draft.problem.sessions = [
          ...state.problem.sessions,
          action.payload.session,
        ];
        draft.loaders.createSessionLoading = false;
        break;
      case CREATE_SESSION_ERROR:
        draft.loaders.createSessionLoading = false;
        draft.errors.createSessionError = action.payload.error;
        break;

      case FETCH_SESSION_EMAILS_REQUEST:
        if (!state.problem.sessions[action.payload.index].emails)
          draft.loaders.fetchSessionEmailsLoading = true;
        break;
      case FETCH_SESSION_EMAILS_SUCCESS:
        const { index, emails } = action.payload;
        draft.problem.sessions[index].emails = emails;
        draft.loaders.fetchSessionEmailsLoading = false;
        break;

      case FETCH_SESSION_EMAILS_ERROR:
        draft.loaders.fetchSessionEmailsLoading = false;
        draft.errors.fetchSessionEmailsError = action.payload.error;
        break;

      case SEND_SESSION_INVITE_REQUEST: {
        const { emails: payloadEmails, sessionId } = action.payload;

        const sessionIndex = findInterventionIndex(state.problem, sessionId);

        if (sessionIndex > -1) {
          draft.loaders.sendSessionLoading = true;
          draft.cache.problem = state.problem;
          const mappedEmails = payloadEmails.map(email => ({
            email,
          }));

          draft.problem.sessions[sessionIndex].emails = [
            ...state.problem.sessions[sessionIndex].emails,
            ...mappedEmails,
          ];
        }

        break;
      }

      case SEND_SESSION_INVITE_SUCCESS:
        draft.loaders.sendSessionLoading = false;
        draft.loaders.sessionEmailLoading =
          initialState.loaders.sessionEmailLoading;
        break;

      case SEND_SESSION_INVITE_ERROR:
        draft.loaders.sendSessionLoading = false;
        draft.loaders.sessionEmailLoading =
          initialState.loaders.sessionEmailLoading;
        draft.problem = state.cache.problem;
        break;

      case RESEND_SESSION_INVITE_REQUEST:
        draft.cache.problem = state.problem;
        draft.loaders.sessionEmailLoading = {
          ...action.payload,
        };
        break;
    }
  });

export default problemReducer;
