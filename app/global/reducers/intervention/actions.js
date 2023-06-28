import { actionBuilder } from 'utils/actionBuilder';
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
  COPY_SESSION_REQUEST,
  REORDER_SESSION_LIST,
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
  ADD_INTERVENTION_ATTACHMENTS_REQUEST,
  ADD_INTERVENTION_ATTACHMENTS_SUCCESS,
  DELETE_INTERVENTION_ATTACHMENT_REQUEST,
  DELETE_INTERVENTION_ATTACHMENT_SUCCESS,
  SEND_INTERVENTION_INVITE_REQUEST,
  SEND_INTERVENTION_INVITE_SUCCESS,
  SEND_INTERVENTION_INVITE_ERROR,
  RESEND_INTERVENTION_INVITE_REQUEST,
  ADD_INTERVENTION_ATTACHMENTS_ERROR,
  FETCH_INTERVENTION_INVITES_REQUEST,
  FETCH_INTERVENTION_INVITES_SUCCESS,
  FETCH_INTERVENTION_INVITES_ERROR,
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
  EDIT_SHORT_LINKS_ERROR,
  EDIT_SHORT_LINKS_SUCCESS,
  ADD_COLLABORATORS_REQUEST,
  ADD_COLLABORATORS_ERROR,
  ADD_COLLABORATORS_SUCCESS,
  FETCH_COLLABORATORS_REQUEST,
  FETCH_COLLABORATORS_ERROR,
  FETCH_COLLABORATORS_SUCCESS,
  CHANGE_COLLABORATOR_SETTING_REQUEST,
  CHANGE_COLLABORATOR_SETTING_ERROR,
  CHANGE_COLLABORATOR_SETTING_SUCCESS,
  REMOVE_COLLABORATOR_REQUEST,
  REMOVE_COLLABORATOR_ERROR,
  REMOVE_COLLABORATOR_SUCCESS,
  SET_CURRENT_EDITOR,
  SET_STARTING_EDITING,
  SET_STOPPING_EDITING,
  RESET_COLLABORATION_STATE,
  ON_COLLABORATOR_REMOVED_RECEIVE,
  RESET_REDUCER,
  REFRESH_INTERVENTION_DATA,
  FETCH_CURRENT_USER_COLLABORATOR_DATA_REQUEST,
  FETCH_CURRENT_USER_COLLABORATOR_DATA_SUCCESS,
  FETCH_CURRENT_USER_COLLABORATOR_DATA_ERROR,
} from './constants';

export const fetchInterventionRequest = (id, showLoader = false) =>
  actionBuilder(FETCH_INTERVENTION_REQUEST, { id, showLoader });
export const fetchInterventionSuccess = (intervention) =>
  actionBuilder(FETCH_INTERVENTION_SUCCESS, { intervention });
export const fetchInterventionError = (error) =>
  actionBuilder(FETCH_INTERVENTION_ERROR, { error });

export const sendInterventionCsvRequest = (id) =>
  actionBuilder(SEND_INTERVENTION_CSV_REQUEST, { id });
export const sendInterventionCsvSuccess = (message) =>
  actionBuilder(SEND_INTERVENTION_CSV_SUCCESS, { message });
export const sendInterventionCsvError = (error) =>
  actionBuilder(SEND_INTERVENTION_CSV_ERROR, { error });

export const createInterventionRequest = () =>
  actionBuilder(CREATE_INTERVENTION_REQUEST, {});
export const createInterventionSuccess = (intervention) =>
  actionBuilder(CREATE_INTERVENTION_SUCCESS, { intervention });
export const createInterventionError = (error) =>
  actionBuilder(CREATE_INTERVENTION_ERROR, { error });

export const editInterventionRequest = (intervention, extraOptions) =>
  actionBuilder(EDIT_INTERVENTION_REQUEST, {
    intervention,
    extraOptions,
  });

export const editInterventionSuccess = (intervention) =>
  actionBuilder(EDIT_INTERVENTION_SUCCESS, { intervention });
export const editInterventionError = (error) =>
  actionBuilder(EDIT_INTERVENTION_ERROR, { error });

export const copySessionRequest = (payload) =>
  actionBuilder(COPY_SESSION_REQUEST, payload);

export const reorderSessionList = (payload) =>
  actionBuilder(REORDER_SESSION_LIST, payload);
export const reorderSessionsSuccess = (payload) =>
  actionBuilder(REORDER_SESSION_LIST_SUCCESS, payload);
export const reorderSessionsError = (payload) =>
  actionBuilder(REORDER_SESSION_LIST_ERROR, payload);

export const updateSessionSettings = (data, fields = []) =>
  actionBuilder(UPDATE_SESSION_SETTINGS_REQUEST, data, fields);

export const updateSessionSettingsSuccess = () =>
  actionBuilder(UPDATE_SESSION_SETTINGS_SUCCESS, {});

export const updateSessionSettingsError = () =>
  actionBuilder(UPDATE_SESSION_SETTINGS_ERROR, {});

export const changeCurrentSession = (index) =>
  actionBuilder(CHANGE_CURRENT_SESSION, { index });

export const enableUserAccessRequest = (id, emails) =>
  actionBuilder(ENABLE_USER_ACCESS_REQUEST, { id, emails });
export const enableUserAccessSuccess = (emails) =>
  actionBuilder(ENABLE_USER_ACCESS_SUCCESS, { emails });
export const enableUserAccessFailure = (payload) =>
  actionBuilder(ENABLE_USER_ACCESS_ERROR, payload);

export const fetchUsersWithAccessRequest = (id) =>
  actionBuilder(FETCH_USERS_WITH_ACCESS_REQUEST, { id });
export const fetchUsersWithAccessSuccess = (userAccess) =>
  actionBuilder(FETCH_USERS_WITH_ACCESS_SUCCESS, { userAccess });
export const fetchUsersWithAccessFailure = (payload) =>
  actionBuilder(FETCH_USERS_WITH_ACCESS_ERROR, payload);

export const revokeUserAccessRequest = (interventionId, accessId) =>
  actionBuilder(REVOKE_USER_ACCESS_REQUEST, { interventionId, accessId });
export const revokeUserAccessSuccess = (userId) =>
  actionBuilder(REVOKE_USER_ACCESS_SUCCESS, { userId });
export const revokeUserAccessFailure = (userId, error) =>
  actionBuilder(REVOKE_USER_ACCESS_ERROR, { userId, error });

export const createSessionRequest = (id, lastPosition, type) =>
  actionBuilder(CREATE_SESSION_REQUEST, { id, lastPosition, type });
export const createSessionSuccess = (session) =>
  actionBuilder(CREATE_SESSION_SUCCESS, { session });
export const createSessionError = () => actionBuilder(CREATE_SESSION_ERROR, {});

export const sendSessionInviteRequest = (
  emails,
  sessionId,
  shouldNotUpdateStore,
) =>
  actionBuilder(SEND_SESSION_INVITE_REQUEST, {
    emails,
    sessionId,
    shouldNotUpdateStore,
  });
export const sendSessionInviteSuccess = () =>
  actionBuilder(SEND_SESSION_INVITE_SUCCESS, {});
export const sendSessionInviteError = () =>
  actionBuilder(SEND_SESSION_INVITE_ERROR, {});

export const resendSessionInviteRequest = (id, sessionId) =>
  actionBuilder(RESEND_SESSION_INVITE_REQUEST, { id, sessionId });

export const fetchInterventionInvitesRequest = (interventionId) =>
  actionBuilder(FETCH_INTERVENTION_INVITES_REQUEST, {
    interventionId,
  });
export const fetchInterventionInvitesSuccess = (invites) =>
  actionBuilder(FETCH_INTERVENTION_INVITES_SUCCESS, { invites });
export const fetchInterventionInvitesError = (error) =>
  actionBuilder(FETCH_INTERVENTION_INVITES_ERROR, { error });

export const sendInterventionInviteRequest = (emails, interventionId) =>
  actionBuilder(SEND_INTERVENTION_INVITE_REQUEST, {
    emails,
    interventionId,
  });
export const sendInterventionInviteSuccess = (invites) =>
  actionBuilder(SEND_INTERVENTION_INVITE_SUCCESS, { invites });
export const sendInterventionInviteError = () =>
  actionBuilder(SEND_INTERVENTION_INVITE_ERROR, {});

export const resendInterventionInviteRequest = (id, interventionId) =>
  actionBuilder(RESEND_INTERVENTION_INVITE_REQUEST, { id, interventionId });

export const fetchSessionEmailsRequest = (index) =>
  actionBuilder(FETCH_SESSION_EMAILS_REQUEST, { index });
export const fetchSessionEmailsSuccess = (emails, index) =>
  actionBuilder(FETCH_SESSION_EMAILS_SUCCESS, { emails, index });
export const fetchSessionEmailsError = (error) =>
  actionBuilder(FETCH_SESSION_EMAILS_ERROR, { error });

export const deleteSessionRequest = (sessionId, interventionId) =>
  actionBuilder(DELETE_SESSION_REQUEST, { sessionId, interventionId });
export const deleteSessionSuccess = () =>
  actionBuilder(DELETE_SESSION_SUCCESS, {});
export const deleteSessionError = (error) =>
  actionBuilder(DELETE_SESSION_ERROR, { error });

export const externalCopySessionRequest = (payload) =>
  actionBuilder(EXTERNAL_COPY_SESSION_REQUEST, payload);
export const externalCopySessionError = (error) =>
  actionBuilder(EXTERNAL_COPY_SESSION_ERROR, { error });

export const addInterventionLogoRequest = (interventionId, logoData, logoUrl) =>
  actionBuilder(ADD_INTERVENTION_LOGO_REQUEST, {
    interventionId,
    logoData,
    logoUrl,
  });
export const addInterventionLogoSuccess = (logoUrl) =>
  actionBuilder(ADD_INTERVENTION_LOGO_SUCCESS, { logoUrl });
export const addInterventionLogoError = (error) =>
  actionBuilder(ADD_INTERVENTION_LOGO_ERROR, { error });

export const deleteInterventionLogoRequest = (interventionId) =>
  actionBuilder(DELETE_INTERVENTION_LOGO_REQUEST, { interventionId });
export const deleteInterventionLogoSuccess = () =>
  actionBuilder(DELETE_INTERVENTION_LOGO_SUCCESS, {});
export const deleteInterventionLogoError = (error) =>
  actionBuilder(DELETE_INTERVENTION_LOGO_ERROR, { error });

export const updateInterventionLogoRequest = (interventionId, description) =>
  actionBuilder(UPDATE_INTERVENTION_LOGO_REQUEST, {
    interventionId,
    description,
  });
export const updateInterventionLogoSuccess = () =>
  actionBuilder(UPDATE_INTERVENTION_LOGO_SUCCESS, {});
export const updateInterventionLogoError = (error) =>
  actionBuilder(UPDATE_INTERVENTION_LOGO_ERROR, { error });

export const translateInterventionRequest = (
  id,
  destinationLanguageId,
  destinationVoiceId,
) =>
  actionBuilder(TRANSLATE_INTERVENTION_REQUEST, {
    id,
    destinationLanguageId,
    destinationVoiceId,
  });
export const translateInterventionSuccess = () =>
  actionBuilder(TRANSLATE_INTERVENTION_SUCCESS, {});
export const translateInterventionError = (error) =>
  actionBuilder(TRANSLATE_INTERVENTION_ERROR, { error });
export const addAttachmentRequest = (interventionId, attachments) =>
  actionBuilder(ADD_INTERVENTION_ATTACHMENTS_REQUEST, {
    interventionId,
    attachments,
  });
export const addAttachmentSuccess = (intervention) =>
  actionBuilder(ADD_INTERVENTION_ATTACHMENTS_SUCCESS, { intervention });
export const addAttachmentError = (error) =>
  actionBuilder(ADD_INTERVENTION_ATTACHMENTS_ERROR, { error });

export const deleteAttachmentRequest = (interventionId, attachmentId) =>
  actionBuilder(DELETE_INTERVENTION_ATTACHMENT_REQUEST, {
    interventionId,
    attachmentId,
  });
export const deleteAttachmentSuccess = (intervention) =>
  actionBuilder(DELETE_INTERVENTION_ATTACHMENT_SUCCESS, { intervention });

export const generateConversationsTranscriptRequest = () =>
  actionBuilder(GENERATE_CONVERSATIONS_TRANSCRIPT_REQUEST, {});
export const generateConversationsTranscriptSuccess = () =>
  actionBuilder(GENERATE_CONVERSATIONS_TRANSCRIPT_SUCCESS, {});
export const generateConversationsTranscriptError = (error) =>
  actionBuilder(GENERATE_CONVERSATIONS_TRANSCRIPT_ERROR, { error });

export const updateInterventionConversationsTranscript = (transcript) =>
  actionBuilder(UPDATE_INTERVENTION_CONVERSATIONS_TRANSCRIPT, {
    transcript,
  });

export const exportInterventionRequest = (interventionId) =>
  actionBuilder(EXPORT_INTERVENTION_REQUEST, { interventionId });
export const exportInterventionSuccess = () =>
  actionBuilder(EXPORT_INTERVENTION_SUCCESS);
export const exportInterventionError = (error) =>
  actionBuilder(EXPORT_INTERVENTION_ERROR, { error });

export const changeInterventionNarratorRequest = (name, replacedAnimations) =>
  actionBuilder(CHANGE_INTERVENTION_NARRATOR_REQUEST, {
    name,
    replacedAnimations,
  });
export const changeInterventionNarratorSuccess = () =>
  actionBuilder(CHANGE_INTERVENTION_NARRATOR_SUCCESS, {});
export const changeInterventionNarratorError = (error) =>
  actionBuilder(CHANGE_INTERVENTION_NARRATOR_ERROR, { error });

export const editShortLinksRequest = (shortLinks) =>
  actionBuilder(EDIT_SHORT_LINKS_REQUEST, {
    shortLinks,
  });
export const editShortLinksSuccess = () =>
  actionBuilder(EDIT_SHORT_LINKS_SUCCESS);
export const editShortLinksError = (error) =>
  actionBuilder(EDIT_SHORT_LINKS_ERROR, { error });

export const addCollaboratorsRequest = (emails, interventionId, ids) =>
  actionBuilder(ADD_COLLABORATORS_REQUEST, {
    emails,
    interventionId,
    ids,
  });
export const addCollaboratorsSuccess = (collaborators) =>
  actionBuilder(ADD_COLLABORATORS_SUCCESS, { collaborators });
export const addCollaboratorsError = (error) =>
  actionBuilder(ADD_COLLABORATORS_ERROR, { error });

export const fetchCollaboratorsRequest = (interventionId) =>
  actionBuilder(FETCH_COLLABORATORS_REQUEST, { interventionId });
export const fetchCollaboratorsSuccess = (collaborators) =>
  actionBuilder(FETCH_COLLABORATORS_SUCCESS, { collaborators });
export const fetchCollaboratorsError = (error) =>
  actionBuilder(FETCH_COLLABORATORS_ERROR, { error });

export const changeCollaboratorSettingRequest = (
  setting,
  value,
  collaboratorId,
  index,
  interventionId,
) =>
  actionBuilder(CHANGE_COLLABORATOR_SETTING_REQUEST, {
    setting,
    value,
    collaboratorId,
    index,
    interventionId,
  });
export const changeCollaboratorSettingSuccess = () =>
  actionBuilder(CHANGE_COLLABORATOR_SETTING_SUCCESS);
export const changeCollaboratorSettingError = () =>
  actionBuilder(CHANGE_COLLABORATOR_SETTING_ERROR);

export const removeCollaboratorRequest = (
  collaboratorId,
  index,
  interventionId,
) =>
  actionBuilder(REMOVE_COLLABORATOR_REQUEST, {
    collaboratorId,
    index,
    interventionId,
  });
export const removeCollaboratorSuccess = () =>
  actionBuilder(REMOVE_COLLABORATOR_SUCCESS);
export const removeCollaboratorError = () =>
  actionBuilder(REMOVE_COLLABORATOR_ERROR);

export const fetchCurrentUserCollaboratorDataRequest = (interventionId) =>
  actionBuilder(FETCH_CURRENT_USER_COLLABORATOR_DATA_REQUEST, {
    interventionId,
  });
export const fetchCurrentUserCollaboratorDataSuccess = (
  currentUserCollaboratorData,
) =>
  actionBuilder(FETCH_CURRENT_USER_COLLABORATOR_DATA_SUCCESS, {
    currentUserCollaboratorData,
  });
export const fetchCurrentUserCollaboratorDataError = () =>
  actionBuilder(FETCH_CURRENT_USER_COLLABORATOR_DATA_ERROR, {});

export const setCurrentEditor = (currentEditor) =>
  actionBuilder(SET_CURRENT_EDITOR, { currentEditor });

export const setStartingEditing = (startingEditing) =>
  actionBuilder(SET_STARTING_EDITING, { startingEditing });

export const setStoppingEditing = (stoppingEditing) =>
  actionBuilder(SET_STOPPING_EDITING, { stoppingEditing });

export const resetCollaborationState = () =>
  actionBuilder(RESET_COLLABORATION_STATE, {});

export const onCollaboratorRemovedReceive = (interventionId) =>
  actionBuilder(ON_COLLABORATOR_REMOVED_RECEIVE, {
    interventionId,
  });
export const refreshInterventionData = (interventionId, forCurrentEditorToo) =>
  actionBuilder(REFRESH_INTERVENTION_DATA, {
    interventionId,
    forCurrentEditorToo,
  });

export const resetReducer = () => actionBuilder(RESET_REDUCER, {});
