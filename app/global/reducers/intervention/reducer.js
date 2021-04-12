import produce from 'immer';
import set from 'lodash/set';
import get from 'lodash/get';
import cloneDeep from 'lodash/cloneDeep';

import { defaultMapper } from 'utils/mapResponseObjects';
import {
  EDIT_SESSION_ERROR,
  EDIT_SESSION_REQUEST,
  EDIT_SESSION_SUCCESS,
} from 'global/reducers/session/constants';
import sessionSettingsReducer from './sessionSettings/reducer';
import {
  FETCH_INTERVENTION_REQUEST,
  FETCH_INTERVENTION_SUCCESS,
  FETCH_INTERVENTION_ERROR,
  CREATE_INTERVENTION_REQUEST,
  CREATE_INTERVENTION_SUCCESS,
  CREATE_INTERVENTION_ERROR,
  EDIT_INTERVENTION_REQUEST,
  EDIT_INTERVENTION_SUCCESS,
  EDIT_INTERVENTION_ERROR,
  SEND_INTERVENTION_CSV_REQUEST,
  SEND_INTERVENTION_CSV_SUCCESS,
  SEND_INTERVENTION_CSV_ERROR,
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
  DELETE_SESSION_REQUEST,
  DELETE_SESSION_SUCCESS,
  DELETE_SESSION_ERROR,
  EXTERNAL_COPY_SESSION_REQUEST,
  EXTERNAL_COPY_SESSION_SUCCESS,
  EXTERNAL_COPY_SESSION_ERROR,
  ADD_INTERVENTION_LOGO_REQUEST,
  ADD_INTERVENTION_LOGO_SUCCESS,
  ADD_INTERVENTION_LOGO_ERROR,
  DELETE_INTERVENTION_LOGO_REQUEST,
  DELETE_INTERVENTION_LOGO_SUCCESS,
  DELETE_INTERVENTION_LOGO_ERROR,
} from './constants';

export const initialState = {
  currentSessionIndex: 0,
  intervention: null,
  emails: [],
  cache: {
    intervention: null,
  },
  loaders: {
    fetchInterventionLoading: true,
    createInterventionLoading: false,
    sendCsvLoading: false,
    editIntervention: false,
    changeAccessSettingLoading: false,
    fetchUserAccessLoading: false,
    fetchSessionEmailsLoading: false,
    createSessionLoading: false,
    sendSessionLoading: false,
    sessionEmailLoading: {
      id: null,
      email: null,
    },
    logoLoading: false,
  },
  errors: {
    fetchInterventionError: null,
    fetchSessionEmailsError: null,
    createInterventionError: null,
    changeAccessSettingError: null,
    fetchUserAccessError: null,
    createSessionError: null,
  },
};

const findInterventionIndex = (intervention, sessionId) =>
  intervention.sessions.findIndex(({ id }) => id === sessionId);

/* eslint-disable default-case, no-param-reassign */
export const interventionReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case FETCH_INTERVENTION_REQUEST:
        if (state.intervention && action.payload.id === state.intervention.id)
          break;
        draft.loaders.fetchInterventionLoading = true;
        draft.loaders.fetchInterventionError = null;
        draft.intervention = null;
        break;
      case FETCH_INTERVENTION_SUCCESS:
        draft.loaders.fetchInterventionLoading = false;
        // to discuss the solution in the future, FETCH_INTERVENTION_SUCCESS overwrites FETCH_USERS_WITH_ACCESS_SUCCESS
        const temp = get(draft.intervention, 'usersWithAccess', null);
        draft.intervention = action.payload.intervention;
        set(draft.intervention, 'usersWithAccess', temp);
        draft.cache.intervention = action.payload.intervention;
        break;
      case FETCH_INTERVENTION_ERROR:
        draft.loaders.fetchInterventionLoading = false;
        draft.errors.fetchInterventionError = action.payload.error;
        break;
      case CREATE_INTERVENTION_REQUEST:
        draft.loaders.createInterventionLoading = true;
        draft.loaders.createInterventionError = null;
        break;
      case CREATE_INTERVENTION_SUCCESS:
        draft.loaders.createInterventionLoading = false;
        break;
      case CREATE_INTERVENTION_ERROR:
        break;
      case EDIT_INTERVENTION_REQUEST:
        draft.intervention = {
          ...state.intervention,
          ...action.payload.intervention,
        };
        break;
      case EDIT_INTERVENTION_SUCCESS: {
        draft.cache.intervention = cloneDeep(state.intervention);
        break;
      }
      case EDIT_INTERVENTION_ERROR:
        draft.intervention = cloneDeep(state.cache.intervention);
        break;

      case ADD_INTERVENTION_LOGO_REQUEST:
        draft.loaders.logoLoading = true;
        break;

      case ADD_INTERVENTION_LOGO_SUCCESS:
        draft.loaders.logoLoading = false;
        draft.intervention.logoUrl = action.payload.logoUrl;
        draft.cache.intervention.logoUrl = action.payload.logoUrl;
        break;

      case ADD_INTERVENTION_LOGO_ERROR:
        draft.loaders.logoLoading = false;
        break;

      case DELETE_INTERVENTION_LOGO_REQUEST:
        draft.loaders.logoLoading = true;
        draft.intervention.logoUrl = null;
        break;

      case DELETE_INTERVENTION_LOGO_SUCCESS:
        draft.loaders.logoLoading = false;
        draft.cache.intervention.logoUrl = null;
        break;

      case DELETE_INTERVENTION_LOGO_ERROR:
        draft.loaders.logoLoading = false;
        draft.intervention.logoUrl = state.cache.intervention.logoUrl;
        break;

      case SEND_INTERVENTION_CSV_REQUEST:
        draft.loaders.sendCsvLoading = true;
        break;
      case SEND_INTERVENTION_CSV_SUCCESS:
        draft.loaders.sendCsvLoading = false;
        break;
      case SEND_INTERVENTION_CSV_ERROR:
        draft.loaders.sendCsvLoading = false;
        break;
      case COPY_SESSION_SUCCESS:
        draft.intervention.sessions.push(defaultMapper(action.payload.session));
        break;
      case REORDER_SESSION_LIST:
        draft.cache.intervention = state.intervention;
        draft.intervention.sessions = action.payload.reorderedList;
        break;
      case CHANGE_CURRENT_SESSION:
        draft.currentSessionIndex = action.payload.index;
        break;
      case UPDATE_SESSION_SETTINGS_REQUEST: {
        const sessionIndex = state.intervention.sessions.findIndex(
          session => session.id === action.payload.data.sessionId,
        );
        if (sessionIndex > -1) {
          draft.currentSessionIndex = sessionIndex;
          draft.loaders.editIntervention = true;
          draft.intervention.sessions[sessionIndex] = {
            ...sessionSettingsReducer(
              draft.intervention.sessions[sessionIndex],
              action.payload,
            ),
          };
        }
        break;
      }
      case UPDATE_SESSION_SETTINGS_SUCCESS:
        draft.cache.intervention = state.intervention;
        break;
      case UPDATE_SESSION_SETTINGS_ERROR:
        draft.intervention = state.cache.intervention;
        break;
      case REORDER_SESSION_LIST_SUCCESS:
        draft.cache.intervention = state.intervention;
        break;
      case REORDER_SESSION_LIST_ERROR:
        draft.intervention = state.cache.intervention;
        break;
      case CHANGE_ACCESS_SETTING_REQUEST:
        draft.intervention.sharedTo = action.payload.setting;
        draft.cache.intervention = state.intervention;
        break;
      case CHANGE_ACCESS_SETTING_SUCCESS:
        draft.cache.intervention = draft.intervention;
        break;
      case CHANGE_ACCESS_SETTING_ERROR:
        draft.intervention = state.cache.intervention;
        break;
      case ENABLE_USER_ACCESS_REQUEST:
        draft.loaders.enableAccessLoading = true;
        break;
      case ENABLE_USER_ACCESS_SUCCESS:
        draft.loaders.enableAccessLoading = false;
        draft.intervention.usersWithAccess = [...action.payload.emails];
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
        draft.intervention.usersWithAccess = action.payload.userAccess;
        break;
      case FETCH_USERS_WITH_ACCESS_ERROR:
        draft.loaders.fetchUserAccessLoading = false;
        draft.errors.fetchUserAccessError = action.payload.message;
        break;
      case REVOKE_USER_ACCESS_REQUEST:
        let userIndex = state.intervention.usersWithAccess.findIndex(
          ({ id }) => id === action.payload.userId,
        );
        draft.intervention.usersWithAccess[userIndex].loading = true;
        break;
      case REVOKE_USER_ACCESS_SUCCESS:
        draft.intervention.usersWithAccess = state.intervention.usersWithAccess.filter(
          ({ id }) => id !== action.payload.userId,
        );
        break;
      case REVOKE_USER_ACCESS_ERROR:
        userIndex = state.intervention.usersWithAccess.findIndex(
          ({ id }) => id === action.payload.userId,
        );
        draft.intervention.usersWithAccess[userIndex].loading = false;
        break;
      case CREATE_SESSION_REQUEST:
        draft.loaders.createSessionLoading = true;
        break;
      case CREATE_SESSION_SUCCESS:
        draft.intervention.sessions = [
          ...state.intervention.sessions,
          action.payload.session,
        ];
        draft.cache.intervention.sessions = draft.intervention.sessions;
        draft.loaders.createSessionLoading = false;
        break;
      case CREATE_SESSION_ERROR:
        draft.loaders.createSessionLoading = false;
        draft.errors.createSessionError = action.payload.error;
        break;

      case FETCH_SESSION_EMAILS_REQUEST:
        if (!state.intervention.sessions[action.payload.index].emails)
          draft.loaders.fetchSessionEmailsLoading = true;
        break;
      case FETCH_SESSION_EMAILS_SUCCESS:
        const { index, emails } = action.payload;
        draft.intervention.sessions[index].emails = emails;
        draft.loaders.fetchSessionEmailsLoading = false;
        break;

      case FETCH_SESSION_EMAILS_ERROR:
        draft.loaders.fetchSessionEmailsLoading = false;
        draft.errors.fetchSessionEmailsError = action.payload.error;
        break;

      case SEND_SESSION_INVITE_REQUEST: {
        const { emails: payloadEmails, sessionId } = action.payload;

        const sessionIndex = findInterventionIndex(
          state.intervention,
          sessionId,
        );

        if (sessionIndex > -1) {
          draft.loaders.sendSessionLoading = true;
          draft.cache.intervention = state.intervention;
          const mappedEmails = payloadEmails.map(email => ({
            email,
          }));

          draft.intervention.sessions[sessionIndex].emails = [
            ...state.intervention.sessions[sessionIndex].emails,
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
        draft.intervention = state.cache.intervention;
        break;

      case RESEND_SESSION_INVITE_REQUEST:
        draft.cache.intervention = state.intervention;
        draft.loaders.sessionEmailLoading = {
          ...action.payload,
        };
        break;

      case DELETE_SESSION_REQUEST:
        draft.intervention.sessions = state.intervention.sessions.filter(
          ({ id }) => id !== action.payload.sessionId,
        );
        break;

      case DELETE_SESSION_SUCCESS:
        draft.cache.intervention.sessions = state.intervention.sessions;
        break;

      case DELETE_SESSION_ERROR:
        draft.intervention.sessions = state.cache.intervention.sessions;
        break;
      case EXTERNAL_COPY_SESSION_REQUEST:
        break;
      case EXTERNAL_COPY_SESSION_SUCCESS: {
        const { session, interventionId } = action.payload;
        if (state.intervention.id === interventionId) {
          const updateIntervention = {
            ...state.intervention,
            sessions: [...state.intervention.sessions, session],
          };
          draft.intervention = updateIntervention;
          draft.cache.intervention = updateIntervention;
        }
        break;
      }
      case EXTERNAL_COPY_SESSION_ERROR:
        draft.intervention = state.cache.intervention;
        break;

      case EDIT_SESSION_REQUEST: {
        const sessionIndex = state.intervention.sessions.findIndex(
          session => session.id === action.payload.sessionId,
        );

        if (sessionIndex > -1)
          set(
            draft.intervention.sessions[sessionIndex],
            action.payload.path,
            action.payload.value,
          );
        break;
      }
      case EDIT_SESSION_SUCCESS:
        const sessionIndex = state.intervention.sessions.findIndex(
          session => session.id === action.payload.session.id,
        );

        if (sessionIndex > -1) {
          draft.intervention.sessions[sessionIndex] = action.payload.session;
          draft.cache.intervention.sessions[sessionIndex] =
            action.payload.session;
        }
        break;
      case EDIT_SESSION_ERROR:
        draft.intervention.sessions = state.cache.intervention.sessions;
        break;
    }
  });

export default interventionReducer;
