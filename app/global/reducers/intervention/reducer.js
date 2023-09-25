import produce from 'immer';
import set from 'lodash/set';
import get from 'lodash/get';
import cloneDeep from 'lodash/cloneDeep';

import { SensitiveDataState } from 'models/Intervention';

import {
  EDIT_SESSION_ERROR,
  EDIT_SESSION_REQUEST,
  EDIT_SESSION_SUCCESS,
} from 'global/reducers/session/constants';
import { findIndexById } from 'utils/arrayUtils';

import {
  assignDraftItems,
  deleteItemByIndex,
  updateItemById,
  updateListItemStateById,
} from 'utils/reduxUtils';
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
  SEND_INTERVENTION_INVITATIONS_SUCCESS,
  SEND_INTERVENTION_INVITATIONS_REQUEST,
  SEND_INTERVENTION_INVITATIONS_ERROR,
  RESEND_INTERVENTION_INVITATION_REQUEST,
  ADD_INTERVENTION_ATTACHMENTS_SUCCESS,
  DELETE_INTERVENTION_ATTACHMENT_SUCCESS,
  ADD_INTERVENTION_ATTACHMENTS_REQUEST,
  ADD_INTERVENTION_ATTACHMENTS_ERROR,
  FETCH_INTERVENTION_INVITATIONS_REQUEST,
  FETCH_INTERVENTION_INVITATIONS_SUCCESS,
  FETCH_INTERVENTION_INVITATIONS_ERROR,
  GENERATE_CONVERSATIONS_TRANSCRIPT_REQUEST,
  GENERATE_CONVERSATIONS_TRANSCRIPT_SUCCESS,
  GENERATE_CONVERSATIONS_TRANSCRIPT_ERROR,
  UPDATE_INTERVENTION_CONVERSATIONS_TRANSCRIPT,
  EXPORT_INTERVENTION_REQUEST,
  EXPORT_INTERVENTION_SUCCESS,
  EXPORT_INTERVENTION_ERROR,
  CHANGE_INTERVENTION_NARRATOR_REQUEST,
  CHANGE_INTERVENTION_NARRATOR_SUCCESS,
  CHANGE_INTERVENTION_NARRATOR_ERROR,
  EDIT_SHORT_LINKS_REQUEST,
  EDIT_SHORT_LINKS_SUCCESS,
  EDIT_SHORT_LINKS_ERROR,
  FETCH_COLLABORATORS_SUCCESS,
  FETCH_COLLABORATORS_REQUEST,
  FETCH_COLLABORATORS_ERROR,
  CHANGE_COLLABORATOR_SETTING_REQUEST,
  CHANGE_COLLABORATOR_SETTING_SUCCESS,
  CHANGE_COLLABORATOR_SETTING_ERROR,
  REMOVE_COLLABORATOR_REQUEST,
  REMOVE_COLLABORATOR_SUCCESS,
  REMOVE_COLLABORATOR_ERROR,
  ADD_COLLABORATORS_SUCCESS,
  SET_CURRENT_EDITOR,
  SET_STARTING_EDITING,
  SET_STOPPING_EDITING,
  RESET_COLLABORATION_STATE,
  RESET_REDUCER,
  FETCH_CURRENT_USER_COLLABORATOR_DATA_REQUEST,
  FETCH_CURRENT_USER_COLLABORATOR_DATA_SUCCESS,
  FETCH_CURRENT_USER_COLLABORATOR_DATA_ERROR,
  CLEAR_INTERVENTION_DATA_REQUEST,
  CLEAR_INTERVENTION_DATA_SUCCESS,
  CLEAR_INTERVENTION_DATA_ERROR,
  ON_SENSITIVE_DATA_REMOVED_RECEIVED,
  INVITATION_LIST_ITEM_DEFAULT_STATE,
  RESEND_INTERVENTION_INVITATION_SUCCESS,
  RESEND_INTERVENTION_INVITATION_ERROR,
} from './constants';

export const initialState = {
  currentSessionIndex: 0,
  intervention: null,
  invitations: null,
  invitationsStates: {},
  collaborators: [],
  currentUserCollaboratorData: null,
  cache: {
    intervention: null,
    collaborators: [],
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
    fetchInterventionInvitations: false,
    sendInterventionInvitations: false,
    interventionEmailLoading: {
      id: null,
      email: null,
    },
    logoLoading: false,
    translateInterventionLoading: false,
    addAttachmentsLoading: false,
    generateConversationsTranscript: false,
    exportInterventionLoading: false,
    changeInterventionNarrator: false,
    editShortLinks: false,
    collaborators: false,
    startingEditing: false,
    stoppingEditing: false,
    fetchCurrentUserCollaboratorData: false,
    clearInterventionData: false,
  },
  errors: {
    fetchInterventionError: null,
    fetchSessionEmailsError: null,
    createInterventionError: null,
    changeAccessSettingError: null,
    fetchUserAccessError: null,
    createSessionError: null,
    translateInterventionError: null,
    fetchInterventionInvitations: null,
    generateConversationsTranscript: null,
    exportInterventionError: null,
    editIntervention: null,
    changeInterventionNarrator: null,
    editShortLinks: null,
  },
};

const findSessionIndex = (intervention, sessionId) =>
  intervention.sessions.findIndex(({ id }) => id === sessionId);

/* eslint-disable default-case, no-param-reassign */
export const interventionReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    const updateInvitationListItemStateById = (invitationId, changes) => {
      updateListItemStateById(
        draft.invitationsStates,
        invitationId,
        changes,
        INVITATION_LIST_ITEM_DEFAULT_STATE,
      );
    };

    switch (action.type) {
      case RESET_REDUCER: {
        return initialState;
      }
      case FETCH_INTERVENTION_REQUEST:
        if (action.payload.showLoader) {
          draft.loaders.fetchInterventionLoading = true;
        }
        if (state.intervention && action.payload.id === state.intervention.id) {
          break;
        }
        draft.loaders.fetchInterventionLoading = true;
        draft.errors.fetchInterventionError = null;
        draft.intervention = null;
        draft.invitations = null;
        draft.invitationsStates = {};
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
        draft.invitations = null;
        draft.invitationsStates = {};
        break;
      case CREATE_INTERVENTION_ERROR:
        break;
      case EDIT_INTERVENTION_REQUEST:
        draft.loaders.editIntervention = true;
        draft.errors.editIntervention = null;
        const { locationIds, ...restChanges } = action.payload.intervention;
        draft.intervention = {
          ...state.intervention,
          ...restChanges,
        };

        if (locationIds) {
          draft.intervention.clinicLocations = locationIds.map((id) => ({
            id,
          }));
        }

        break;
      case EDIT_INTERVENTION_SUCCESS: {
        draft.loaders.editIntervention = false;
        const { interventionId, updatedSessions } = action.payload;
        if (updatedSessions && draft.intervention.id === interventionId) {
          draft.intervention.sessions = updatedSessions;
        }
        draft.cache.intervention = cloneDeep(draft.intervention);
        break;
      }
      case EDIT_INTERVENTION_ERROR:
        draft.loaders.editIntervention = false;
        draft.errors.editIntervention = action.payload.error;
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
      case REVOKE_USER_ACCESS_REQUEST: {
        updateItemById(
          draft.intervention.usersWithAccess,
          action.payload.userId,
          { loading: true },
        );
        break;
      }
      case REVOKE_USER_ACCESS_SUCCESS:
        draft.intervention.usersWithAccess =
          state.intervention.usersWithAccess.filter(
            ({ id }) => id !== action.payload.userId,
          );
        break;
      case REVOKE_USER_ACCESS_ERROR:
        updateItemById(
          draft.intervention.usersWithAccess,
          action.payload.userId,
          { loading: false },
        );
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
      case FETCH_SESSION_EMAILS_SUCCESS: {
        const { index, emails } = action.payload;
        draft.intervention.sessions[index].emails = emails;
        draft.loaders.fetchSessionEmailsLoading = false;
        break;
      }

      case FETCH_SESSION_EMAILS_ERROR:
        draft.loaders.fetchSessionEmailsLoading = false;
        draft.errors.fetchSessionEmailsError = action.payload.error;
        break;

      case SEND_SESSION_INVITE_REQUEST: {
        const { sessionId } = action.payload;

        const sessionIndex = findSessionIndex(state.intervention, sessionId);

        if (sessionIndex !== -1) {
          draft.loaders.sendSessionLoading = true;
          draft.cache.intervention = state.intervention;
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

      case FETCH_INTERVENTION_INVITATIONS_REQUEST: {
        draft.errors.fetchInterventionInvitations = null;
        draft.loaders.fetchInterventionInvitations = true;
        break;
      }

      case FETCH_INTERVENTION_INVITATIONS_SUCCESS: {
        const { invitations } = action.payload;
        draft.invitations = invitations;
        draft.loaders.fetchInterventionInvitations = false;
        break;
      }

      case FETCH_INTERVENTION_INVITATIONS_ERROR: {
        const { error } = action.payload;
        draft.errors.fetchInterventionInvitations = error;
        draft.loaders.fetchInterventionInvitations = false;
        break;
      }

      case SEND_INTERVENTION_INVITATIONS_REQUEST: {
        draft.loaders.sendInterventionInvitations = true;
        break;
      }

      case SEND_INTERVENTION_INVITATIONS_SUCCESS: {
        const { invitations } = action.payload;
        draft.invitations = invitations;
        draft.loaders.sendInterventionInvitations = false;
        break;
      }

      case SEND_INTERVENTION_INVITATIONS_ERROR: {
        draft.loaders.sendInterventionInvitations = false;
        break;
      }

      case RESEND_INTERVENTION_INVITATION_REQUEST: {
        const { id } = action.payload;
        updateInvitationListItemStateById(id, {
          resendLoading: true,
        });
        break;
      }

      case RESEND_INTERVENTION_INVITATION_SUCCESS: {
        const { id } = action.payload;
        updateInvitationListItemStateById(id, {
          resendLoading: false,
        });
        break;
      }

      case RESEND_INTERVENTION_INVITATION_ERROR: {
        const { id } = action.payload;
        updateInvitationListItemStateById(id, {
          resendLoading: false,
        });
        break;
      }

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

      case GENERATE_CONVERSATIONS_TRANSCRIPT_REQUEST:
        draft.loaders.generateConversationsTranscript = true;
        draft.errors.generateConversationsTranscript = null;
        break;
      case GENERATE_CONVERSATIONS_TRANSCRIPT_SUCCESS:
        draft.loaders.generateConversationsTranscript = false;
        break;
      case GENERATE_CONVERSATIONS_TRANSCRIPT_ERROR:
        draft.loaders.generateConversationsTranscript = false;
        draft.errors.generateConversationsTranscript = action.payload.error;
        break;

      case UPDATE_INTERVENTION_CONVERSATIONS_TRANSCRIPT:
        const { name, createdAt } = action.payload.transcript;
        if (draft.intervention) {
          draft.intervention.conversationsTranscriptGeneratedAt = createdAt;
          draft.intervention.conversationsTranscriptFilename = name;
        }
        break;
      case EXPORT_INTERVENTION_REQUEST:
        draft.loaders.exportInterventionLoading = true;
        draft.errors.exportInterventionError = null;
        break;
      case EXPORT_INTERVENTION_SUCCESS:
        draft.loaders.exportInterventionLoading = false;
        draft.errors.exportInterventionError = null;
        break;
      case EXPORT_INTERVENTION_ERROR:
        draft.loaders.exportInterventionLoading = false;
        draft.errors.exportInterventionError = action.payload.error;
        break;

      case CHANGE_INTERVENTION_NARRATOR_REQUEST: {
        draft.loaders.changeInterventionNarrator = true;
        draft.errors.changeInterventionNarrator = null;
        draft.intervention.currentNarrator = action.payload.name;
        break;
      }
      case CHANGE_INTERVENTION_NARRATOR_SUCCESS: {
        draft.loaders.changeInterventionNarrator = false;
        draft.cache.intervention.currentNarrator =
          state.intervention.currentNarrator;
        break;
      }
      case CHANGE_INTERVENTION_NARRATOR_ERROR: {
        draft.loaders.changeInterventionNarrator = false;
        draft.errors.changeInterventionNarrator = action.payload.error;
        draft.intervention.currentNarrator =
          state.cache.intervention.currentNarrator;
        break;
      }

      case EDIT_SHORT_LINKS_REQUEST: {
        draft.loaders.editShortLinks = true;
        draft.errors.editShortLinks = null;
        draft.intervention.shortLinks = action.payload.shortLinks;
        break;
      }
      case EDIT_SHORT_LINKS_SUCCESS: {
        draft.loaders.editShortLinks = false;
        draft.cache.intervention.shortLinks = state.intervention.shortLinks;
        break;
      }
      case EDIT_SHORT_LINKS_ERROR: {
        draft.loaders.editShortLinks = false;
        draft.errors.editShortLinks = action.payload.error;
        draft.intervention.shortLinks = state.cache.intervention.shortLinks;
        break;
      }
      case FETCH_COLLABORATORS_REQUEST: {
        draft.loaders.collaborators = true;
        break;
      }
      case FETCH_COLLABORATORS_SUCCESS: {
        draft.loaders.collaborators = false;
        draft.collaborators = action.payload.collaborators;
        assignDraftItems(draft.collaborators, draft.cache.collaborators);
        break;
      }
      case FETCH_COLLABORATORS_ERROR: {
        draft.loaders.collaborators = false;
        break;
      }
      case CHANGE_COLLABORATOR_SETTING_REQUEST: {
        const { index, setting, value } = action.payload;
        draft.collaborators[index][setting] = value;
        break;
      }
      case CHANGE_COLLABORATOR_SETTING_SUCCESS: {
        assignDraftItems(draft.collaborators, draft.cache.collaborators);
        break;
      }
      case CHANGE_COLLABORATOR_SETTING_ERROR: {
        assignDraftItems(draft.cache.collaborators, draft.collaborators);
        break;
      }
      case REMOVE_COLLABORATOR_REQUEST: {
        const { index } = action.payload;
        deleteItemByIndex(draft.collaborators, index);
        break;
      }
      case REMOVE_COLLABORATOR_SUCCESS: {
        assignDraftItems(draft.collaborators, draft.cache.collaborators);
        if (!draft.collaborators?.length && draft.intervention) {
          draft.intervention.hasCollaborators = false;
        }
        break;
      }
      case REMOVE_COLLABORATOR_ERROR: {
        assignDraftItems(draft.cache.collaborators, draft.collaborators);
        break;
      }
      case ADD_COLLABORATORS_SUCCESS: {
        draft.collaborators.push(...action.payload.collaborators);
        assignDraftItems(draft.collaborators, draft.cache.collaborators);
        if (draft.intervention) {
          draft.intervention.hasCollaborators = true;
        }
        break;
      }
      case FETCH_CURRENT_USER_COLLABORATOR_DATA_REQUEST: {
        draft.currentUserCollaboratorData = null;
        draft.loaders.fetchCurrentUserCollaboratorData = true;
        break;
      }
      case FETCH_CURRENT_USER_COLLABORATOR_DATA_SUCCESS: {
        const { currentUserCollaboratorData } = action.payload;
        draft.currentUserCollaboratorData = currentUserCollaboratorData;
        draft.loaders.fetchCurrentUserCollaboratorData = false;
        break;
      }
      case FETCH_CURRENT_USER_COLLABORATOR_DATA_ERROR: {
        draft.loaders.fetchCurrentUserCollaboratorData = false;
        break;
      }
      case SET_CURRENT_EDITOR: {
        if (!draft.intervention) return;
        const { currentEditor } = action.payload;
        draft.intervention.currentEditor = currentEditor;
        break;
      }
      case SET_STARTING_EDITING: {
        const { startingEditing } = action.payload;
        draft.loaders.startingEditing = startingEditing;
        break;
      }
      case SET_STOPPING_EDITING: {
        const { stoppingEditing } = action.payload;
        draft.loaders.stoppingEditing = stoppingEditing;
        break;
      }
      case RESET_COLLABORATION_STATE: {
        if (draft.intervention) {
          draft.intervention.currentEditor = null;
        }
        draft.loaders.startingEditing = false;
        draft.loaders.stoppingEditing = false;
        draft.currentUserCollaboratorData = null;
        break;
      }
      case CLEAR_INTERVENTION_DATA_REQUEST: {
        draft.loaders.clearInterventionData = true;
        break;
      }
      case CLEAR_INTERVENTION_DATA_SUCCESS: {
        const {
          interventionId,
          sensitiveDataState,
          clearSensitiveDataScheduledAt,
        } = action.payload;
        if (draft.intervention?.id === interventionId) {
          draft.intervention.sensitiveDataState = sensitiveDataState;
          draft.intervention.clearSensitiveDataScheduledAt =
            clearSensitiveDataScheduledAt;
        }
        draft.loaders.clearInterventionData = false;
        break;
      }
      case CLEAR_INTERVENTION_DATA_ERROR: {
        draft.loaders.clearInterventionData = false;
        break;
      }
      case ON_SENSITIVE_DATA_REMOVED_RECEIVED: {
        const { interventionId } = action.payload;
        if (draft.intervention?.id === interventionId) {
          draft.intervention.sensitiveDataState = SensitiveDataState.REMOVED;
        }
      }
    }
  });

export default interventionReducer;
