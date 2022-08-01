import produce from 'immer';
import set from 'lodash/set';
import get from 'lodash/get';
import cloneDeep from 'lodash/cloneDeep';

import {
  EDIT_SESSION_ERROR,
  EDIT_SESSION_REQUEST,
  EDIT_SESSION_SUCCESS,
} from 'global/reducers/session/constants';
import { findIndexById } from 'utils/arrayUtils';

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
  REORDER_SESSION_LIST,
  UPDATE_SESSION_SETTINGS_REQUEST,
  UPDATE_SESSION_SETTINGS_SUCCESS,
  UPDATE_SESSION_SETTINGS_ERROR,
  CHANGE_CURRENT_SESSION,
  REORDER_SESSION_LIST_SUCCESS,
  REORDER_SESSION_LIST_ERROR,
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
  EXTERNAL_COPY_SESSION_ERROR,
  ADD_INTERVENTION_LOGO_REQUEST,
  ADD_INTERVENTION_LOGO_SUCCESS,
  ADD_INTERVENTION_LOGO_ERROR,
  DELETE_INTERVENTION_LOGO_REQUEST,
  DELETE_INTERVENTION_LOGO_SUCCESS,
  DELETE_INTERVENTION_LOGO_ERROR,
  UPDATE_INTERVENTION_LOGO_REQUEST,
  UPDATE_INTERVENTION_LOGO_SUCCESS,
  UPDATE_INTERVENTION_LOGO_ERROR,
  TRANSLATE_INTERVENTION_REQUEST,
  TRANSLATE_INTERVENTION_SUCCESS,
  TRANSLATE_INTERVENTION_ERROR,
  SEND_INTERVENTION_INVITE_SUCCESS,
  SEND_INTERVENTION_INVITE_REQUEST,
  SEND_INTERVENTION_INVITE_ERROR,
  RESEND_INTERVENTION_INVITE_REQUEST,
  ADD_INTERVENTION_ATTACHMENTS_SUCCESS,
  DELETE_INTERVENTION_ATTACHMENT_SUCCESS,
  ADD_INTERVENTION_ATTACHMENTS_REQUEST,
  ADD_INTERVENTION_ATTACHMENTS_ERROR,
  FETCH_INTERVENTION_INVITES_REQUEST,
  FETCH_INTERVENTION_INVITES_SUCCESS,
  FETCH_INTERVENTION_INVITES_ERROR,
} from './constants';

export const initialState = {
  currentSessionIndex: 0,
  intervention: null,
  invites: [],
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
    fetchInterventionInvites: false,
    sendInterventionInvites: false,
    interventionEmailLoading: {
      id: null,
      email: null,
    },
    logoLoading: false,
    translateInterventionLoading: false,
    addAttachmentsLoading: false,
  },
  errors: {
    fetchInterventionError: null,
    fetchSessionEmailsError: null,
    createInterventionError: null,
    changeAccessSettingError: null,
    fetchUserAccessError: null,
    createSessionError: null,
    translateInterventionError: null,
    fetchInterventionInvites: null,
  },
};

const findSessionIndex = (intervention, sessionId) =>
  intervention.sessions.findIndex(({ id }) => id === sessionId);

/* eslint-disable default-case, no-param-reassign */
export const interventionReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case FETCH_INTERVENTION_REQUEST:
        if (state.intervention && action.payload.id === state.intervention.id)
          break;
        draft.loaders.fetchInterventionLoading = true;
        draft.errors.fetchInterventionError = null;
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
        draft.errors.createInterventionError = null;
        break;
      case CREATE_INTERVENTION_SUCCESS:
        draft.loaders.createInterventionLoading = false;
        break;
      case CREATE_INTERVENTION_ERROR:
        break;
      case EDIT_INTERVENTION_REQUEST:
        draft.loaders.editIntervention = true;
        draft.intervention = {
          ...state.intervention,
          ...action.payload.intervention,
        };
        break;
      case EDIT_INTERVENTION_SUCCESS: {
        draft.loaders.editIntervention = false;
        draft.cache.intervention = cloneDeep(state.intervention);
        break;
      }
      case EDIT_INTERVENTION_ERROR:
        draft.loaders.editIntervention = false;
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
        draft.intervention.imageAlt = '';
        draft.cache.intervention.imageAlt = '';
        break;

      case DELETE_INTERVENTION_LOGO_ERROR:
        draft.loaders.logoLoading = false;
        draft.intervention.logoUrl = state.cache.intervention.logoUrl;
        break;

      case UPDATE_INTERVENTION_LOGO_REQUEST:
        draft.loaders.logoLoading = true;
        draft.intervention.imageAlt = action.payload.description;
        break;

      case UPDATE_INTERVENTION_LOGO_SUCCESS:
        draft.loaders.logoLoading = false;
        draft.cache.intervention.imageAlt = state.intervention.imageAlt;
        break;

      case UPDATE_INTERVENTION_LOGO_ERROR:
        draft.loaders.logoLoading = false;
        draft.intervention.imageAlt = state.cache.intervention.imageAlt;
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
      case REORDER_SESSION_LIST:
        draft.cache.intervention = state.intervention;
        draft.intervention.sessions = action.payload.reorderedList;
        break;
      case CHANGE_CURRENT_SESSION:
        draft.currentSessionIndex = action.payload.index;
        break;
      case UPDATE_SESSION_SETTINGS_REQUEST: {
        const sessionIndex = findIndexById(
          state.intervention.sessions,
          action.payload.data.sessionId,
        );

        if (sessionIndex !== -1) {
          draft.currentSessionIndex = sessionIndex;
          draft.loaders.editIntervention = true;
          draft.intervention.sessions[sessionIndex] = sessionSettingsReducer(
            draft.intervention.sessions[sessionIndex],
            action.payload,
          );
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
      case ENABLE_USER_ACCESS_REQUEST:
        draft.loaders.enableAccessLoading = true;
        draft.errors.enableAccessError = null;
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
        draft.errors.fetchUserAccessError = null;
        break;
      case FETCH_USERS_WITH_ACCESS_SUCCESS:
        draft.loaders.fetchUserAccessLoading = false;
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
        draft.intervention.usersWithAccess =
          state.intervention.usersWithAccess.filter(
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
        draft.errors.createSessionError = null;
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
        draft.errors.fetchSessionEmailsError = null;
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
        const {
          emails: payloadEmails,
          sessionId,
          shouldNotUpdateStore,
        } = action.payload;

        const sessionIndex = findSessionIndex(state.intervention, sessionId);

        if (sessionIndex !== -1) {
          draft.loaders.sendSessionLoading = true;
          draft.cache.intervention = state.intervention;
          const mappedEmails = payloadEmails.map((email) => ({
            email,
          }));

          if (!shouldNotUpdateStore) {
            draft.intervention.sessions[sessionIndex].emails = [
              ...state.intervention.sessions[sessionIndex].emails,
              ...mappedEmails,
            ];
          }
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

      case FETCH_INTERVENTION_INVITES_REQUEST: {
        draft.errors.fetchInterventionInvites = null;
        draft.loaders.fetchInterventionInvites = true;
        break;
      }

      case FETCH_INTERVENTION_INVITES_SUCCESS: {
        const { invites } = action.payload;
        draft.invites = invites;
        draft.loaders.fetchInterventionInvites = false;
        break;
      }

      case FETCH_INTERVENTION_INVITES_ERROR: {
        const { error } = action.payload;
        draft.errors.fetchInterventionInvites = error;
        draft.loaders.fetchInterventionInvites = false;
        break;
      }

      case SEND_INTERVENTION_INVITE_REQUEST: {
        draft.loaders.sendInterventionInvites = true;
        break;
      }

      case SEND_INTERVENTION_INVITE_SUCCESS:
        const { invites } = action.payload;
        draft.invites = invites;
        draft.loaders.sendInterventionInvites = false;
        draft.loaders.interventionEmailLoading =
          initialState.loaders.interventionEmailLoading;
        break;

      case SEND_INTERVENTION_INVITE_ERROR:
        draft.loaders.sendInterventionInvites = false;
        draft.loaders.interventionEmailLoading =
          initialState.loaders.interventionEmailLoading;
        break;

      case RESEND_INTERVENTION_INVITE_REQUEST:
        draft.loaders.interventionEmailLoading = {
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
      case EXTERNAL_COPY_SESSION_ERROR:
        draft.intervention = state.cache.intervention;
        break;

      case EDIT_SESSION_REQUEST: {
        const sessionIndex = state.intervention.sessions.findIndex(
          (session) => session.id === action.payload.sessionId,
        );

        if (sessionIndex !== -1)
          set(
            draft.intervention.sessions[sessionIndex],
            action.payload.path,
            action.payload.value,
          );
        break;
      }
      case EDIT_SESSION_SUCCESS:
        const sessionIndex = state.intervention.sessions.findIndex(
          (session) => session.id === action.payload.session.id,
        );

        if (sessionIndex !== -1) {
          draft.intervention.sessions[sessionIndex] = action.payload.session;
          draft.cache.intervention.sessions[sessionIndex] =
            action.payload.session;
        }
        break;
      case EDIT_SESSION_ERROR:
        draft.intervention.sessions = state.cache.intervention.sessions;
        break;
      case TRANSLATE_INTERVENTION_REQUEST:
        draft.loaders.translateInterventionLoading = true;
        draft.errors.translateInterventionError = null;
        break;
      case TRANSLATE_INTERVENTION_SUCCESS:
        draft.loaders.translateInterventionLoading = false;
        draft.errors.translateInterventionError = null;
        break;
      case TRANSLATE_INTERVENTION_ERROR:
        draft.loaders.translateInterventionLoading = false;
        draft.errors.translateInterventionError = action.payload.error;
        break;
      case ADD_INTERVENTION_ATTACHMENTS_REQUEST:
        draft.loaders.addAttachmentsLoading = true;
        break;
      case ADD_INTERVENTION_ATTACHMENTS_SUCCESS:
        draft.loaders.addAttachmentsLoading = false;
        draft.intervention.files = action.payload.intervention.files;
        break;
      case ADD_INTERVENTION_ATTACHMENTS_ERROR:
        draft.loaders.addAttachmentsLoading = false;
        break;
      case DELETE_INTERVENTION_ATTACHMENT_SUCCESS:
        draft.intervention.files = action.payload.intervention.files;
        break;
    }
  });

export default interventionReducer;
