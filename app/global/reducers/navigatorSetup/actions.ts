import { createAction } from 'typesafe-actions';

import { ApiError } from 'models/Api';
import {
  InterventionNavigator,
  NoNavigatorsAvailableData,
  PendingNavigatorInvitation,
  ParticipantLink,
  NavigatorSetupData,
} from 'models/NavigatorSetup';

import {
  ADD_PARTICIPANT_LINK_ERROR,
  ADD_PARTICIPANT_LINK_REQUEST,
  ADD_PARTICIPANT_LINK_SUCCESS,
  FETCH_NAVIGATOR_SETUP_ERROR,
  FETCH_NAVIGATOR_SETUP_REQUEST,
  FETCH_NAVIGATOR_SETUP_SUCCESS,
  REMOVE_PARTICIPANT_LINK_ERROR,
  REMOVE_PARTICIPANT_LINK_REQUEST,
  REMOVE_PARTICIPANT_LINK_SUCCESS,
  UPDATE_NO_NAVIGATOR_TAB_ERROR,
  UPDATE_NO_NAVIGATOR_TAB_REQUEST,
  UPDATE_NO_NAVIGATOR_TAB_SUCCESS,
  UPDATE_PARTICIPANT_LINK_REQUEST,
  UPDATE_PARTICIPANT_LINK_SUCCESS,
  UPDATE_PARTICIPANT_LINK_ERROR,
  INVITE_NAVIGATOR_BY_EMAIL_REQUEST,
  INVITE_NAVIGATOR_BY_EMAIL_SUCCESS,
  REMOVE_NAVIGATOR_EMAIL_INVITATION_REQUEST,
  REMOVE_NAVIGATOR_EMAIL_INVITATION_SUCCESS,
  REMOVE_NAVIGATOR_EMAIL_INVITATION_ERROR,
  INVITE_NAVIGATOR_BY_EMAIL_ERROR,
  REMOVE_INTERVENTION_NAVIGATOR_REQUEST,
  REMOVE_INTERVENTION_NAVIGATOR_SUCCESS,
  REMOVE_INTERVENTION_NAVIGATOR_ERROR,
  ADD_PARTICIPANT_FILE_REQUEST,
  ADD_PARTICIPANT_FILE_ERROR,
  ADD_PARTICIPANT_FILE_SUCCESS,
  REMOVE_PARTICIPANT_FILE_REQUEST,
  REMOVE_PARTICIPANT_FILE_SUCCESS,
  REMOVE_PARTICIPANT_FILE_ERROR,
} from './constants';

export const fetchNavigatorSetupRequest = createAction(
  FETCH_NAVIGATOR_SETUP_REQUEST,
  (action) => (interventionId: string) => action({ interventionId }),
);
export const fetchNavigatorSetupSuccess = createAction(
  FETCH_NAVIGATOR_SETUP_SUCCESS,
  (action) =>
    (
      pendingNavigatorInvitations: PendingNavigatorInvitation[],
      interventionNavigators: InterventionNavigator[],
      navigatorSetupData: NavigatorSetupData,
    ) =>
      action({
        navigatorSetupData,
        pendingNavigatorInvitations,
        interventionNavigators,
      }),
);
export const fetchNavigatorSetupError = createAction(
  FETCH_NAVIGATOR_SETUP_ERROR,
  (action) => (error: ApiError) => action({ error }),
);

export const updateNoNavigatorTabRequest = createAction(
  UPDATE_NO_NAVIGATOR_TAB_REQUEST,
  (action) =>
    (
      interventionId: string,
      noNavigatorsData: Partial<NoNavigatorsAvailableData>,
    ) =>
      action({ interventionId, noNavigatorsData }),
);

export const updateNoNavigatorsTabSuccess = createAction(
  UPDATE_NO_NAVIGATOR_TAB_SUCCESS,
  (action) => () => action(),
);

export const updateNoNavigatorsTabError = createAction(
  UPDATE_NO_NAVIGATOR_TAB_ERROR,
  (action) => (error: ApiError) => action({ error }),
);

export const addParticipantLinkRequest = createAction(
  ADD_PARTICIPANT_LINK_REQUEST,
  (action) =>
    (
      interventionId: string,
      participantLink: Partial<Omit<ParticipantLink, 'id'>>,
    ) =>
      action({ interventionId, participantLink }),
);

export const addParticipantLinkSuccess = createAction(
  ADD_PARTICIPANT_LINK_SUCCESS,
  (action) => (navigatorSetupData: NavigatorSetupData) =>
    action({ navigatorSetupData }),
);

export const addParticipantLinkError = createAction(
  ADD_PARTICIPANT_LINK_ERROR,
  (action) => (error: ApiError) => action({ error }),
);

export const removeParticipantLinkRequest = createAction(
  REMOVE_PARTICIPANT_LINK_REQUEST,
  (action) => (interventionId: string, linkId: string) =>
    action({ interventionId, linkId }),
);

export const removeParticipantLinkSuccess = createAction(
  REMOVE_PARTICIPANT_LINK_SUCCESS,
  (action) => (linkId: string) => action({ linkId }),
);

export const removeParticipantLinkError = createAction(
  REMOVE_PARTICIPANT_LINK_ERROR,
  (action) => (linkId: string, error: ApiError) => action({ linkId, error }),
);

export const updateParticipantLinkRequest = createAction(
  UPDATE_PARTICIPANT_LINK_REQUEST,
  (action) =>
    (
      interventionId: string,
      linkId: string,
      participantLink: Partial<Omit<ParticipantLink, 'id'>>,
    ) =>
      action({ interventionId, linkId, participantLink }),
);

export const updateParticipantLinkSuccess = createAction(
  UPDATE_PARTICIPANT_LINK_SUCCESS,
  (action) => () => action(),
);

export const updateParticipantLinkError = createAction(
  UPDATE_PARTICIPANT_LINK_ERROR,
  (action) => (error: ApiError) => action({ error }),
);

export const inviteNavigatorsByEmailRequest = createAction(
  INVITE_NAVIGATOR_BY_EMAIL_REQUEST,
  (action) => (interventionId: string, emails: string[]) =>
    action({ emails, interventionId }),
);

export const inviteNavigatorsByEmailSuccess = createAction(
  INVITE_NAVIGATOR_BY_EMAIL_SUCCESS,
  (action) => (pendingNavigatorInvitations: PendingNavigatorInvitation[]) =>
    action({ pendingNavigatorInvitations }),
);

export const inviteNavigatorsByEmailError = createAction(
  INVITE_NAVIGATOR_BY_EMAIL_ERROR,
  (action) => () => action({}),
);

export const removeNavigatorEmailInvitationRequest = createAction(
  REMOVE_NAVIGATOR_EMAIL_INVITATION_REQUEST,
  (action) => (interventionId: string, invitationId: string) =>
    action({ interventionId, invitationId }),
);

export const removeNavigatorEmailInvitationSuccess = createAction(
  REMOVE_NAVIGATOR_EMAIL_INVITATION_SUCCESS,
  (action) => (invitationId: string) => action({ invitationId }),
);

export const removeNavigatorEmailInvitationError = createAction(
  REMOVE_NAVIGATOR_EMAIL_INVITATION_ERROR,
  (action) => (invitationId: string) => action({ invitationId }),
);

export const removeInterventionNavigatorRequest = createAction(
  REMOVE_INTERVENTION_NAVIGATOR_REQUEST,
  (action) => (interventionId: string, interventionNavigatorId: string) =>
    action({ interventionId, interventionNavigatorId }),
);

export const removeInterventionNavigatorSuccess = createAction(
  REMOVE_INTERVENTION_NAVIGATOR_SUCCESS,
  (action) => (interventionNavigatorId: string) =>
    action({ interventionNavigatorId }),
);

export const removeInterventionNavigatorError = createAction(
  REMOVE_INTERVENTION_NAVIGATOR_ERROR,
  (action) => (interventionNavigatorId: string) =>
    action({ interventionNavigatorId }),
);

export const addParticipantFileRequest = createAction(
  ADD_PARTICIPANT_FILE_REQUEST,
  (action) => (interventionId: string, files: File[]) =>
    action({ interventionId, files }),
);

export const addParticipantFileSuccess = createAction(
  ADD_PARTICIPANT_FILE_SUCCESS,
  (action) => (navigatorSetupData: NavigatorSetupData) =>
    action({ navigatorSetupData }),
);

export const addParticipantFileError = createAction(
  ADD_PARTICIPANT_FILE_ERROR,
  (action) => (error: ApiError) => action({ error }),
);

export const removeParticipantFileRequest = createAction(
  REMOVE_PARTICIPANT_FILE_REQUEST,
  (action) => (interventionId: string, fileId: string) =>
    action({ interventionId, fileId }),
);

export const removeParticipantFileSuccess = createAction(
  REMOVE_PARTICIPANT_FILE_SUCCESS,
  (action) => (fileId: string) => action({ fileId }),
);

export const removeParticipantFileError = createAction(
  REMOVE_PARTICIPANT_FILE_ERROR,
  (action) => (fileId: string, error: ApiError) => action({ fileId, error }),
);
