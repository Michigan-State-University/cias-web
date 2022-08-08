import produce from 'immer';
import { getType } from 'typesafe-actions';

import { deleteItemById, updateItemById } from 'utils/reduxUtils';

import {
  fetchNavigatorSetupError,
  fetchNavigatorSetupRequest,
  fetchNavigatorSetupSuccess,
  updateNoNavigatorTabRequest,
  updateNoNavigatorsTabError,
  updateNoNavigatorsTabSuccess,
  addParticipantLinkRequest,
  addParticipantLinkSuccess,
  addParticipantLinkError,
  removeParticipantLinkSuccess,
  removeParticipantLinkError,
  removeParticipantLinkRequest,
  inviteNavigatorsByEmailSuccess,
  removeNavigatorEmailInvitationSuccess,
  inviteNavigatorsByEmailRequest,
  inviteNavigatorsByEmailError,
  removeInterventionNavigatorSuccess,
  removeNavigatorEmailInvitationRequest,
  removeNavigatorEmailInvitationError,
  removeInterventionNavigatorRequest,
  removeInterventionNavigatorError,
  addParticipantFileRequest,
  addParticipantFileSuccess,
  addParticipantFileError,
  removeParticipantFileError,
  removeParticipantFileRequest,
  removeParticipantFileSuccess,
  addNavigatorLinkRequest,
  addNavigatorLinkSuccess,
  addNavigatorLinkError,
  removeNavigatorLinkRequest,
  removeNavigatorLinkSuccess,
  removeNavigatorLinkError,
} from './actions';
import { NavigatorSetupState, NavigatorSetupAction } from './types';

export const navigatorSetupReducerKey = 'navigatorSetup';

export const initialState: NavigatorSetupState = {
  navigatorSetup: null,
  pendingNavigatorInvitations: [],
  interventionNavigators: [],
  loaders: {
    fetchingNavigatorSetup: false,
    updatingNoNavigatorsData: false,
    addingParticipantLink: false,
    addingNavigatorLink: false,
    updatingParticipantFiles: false,
    navigatorEmailInvitation: false,
  },
  error: null,
};

/* eslint-disable default-case, no-param-reassign */
export const navigatorSetupReducer = (
  state: NavigatorSetupState = initialState,
  action: NavigatorSetupAction,
) =>
  produce(state, (draft) => {
    switch (action.type) {
      case getType(fetchNavigatorSetupRequest):
        draft.loaders.fetchingNavigatorSetup = true;
        draft.navigatorSetup = null;
        draft.pendingNavigatorInvitations = [];
        draft.interventionNavigators = [];
        draft.error = null;
        break;

      case getType(fetchNavigatorSetupSuccess): {
        const {
          pendingNavigatorInvitations,
          interventionNavigators,
          navigatorSetup,
        } = action.payload;
        draft.navigatorSetup = navigatorSetup;
        draft.pendingNavigatorInvitations = pendingNavigatorInvitations;
        draft.interventionNavigators = interventionNavigators;
        draft.loaders.fetchingNavigatorSetup = false;
        break;
      }
      case getType(fetchNavigatorSetupError):
        draft.loaders.fetchingNavigatorSetup = false;
        draft.error = action.payload.error;
        break;

      case getType(updateNoNavigatorTabRequest):
        if (state.navigatorSetup && draft.navigatorSetup) {
          draft.navigatorSetup = {
            ...draft.navigatorSetup,
            ...action.payload.noNavigatorsData,
          };
          draft.loaders.updatingNoNavigatorsData = true;
        }
        break;
      case getType(updateNoNavigatorsTabError):
      case getType(updateNoNavigatorsTabSuccess):
        draft.loaders.updatingNoNavigatorsData = false;
        break;
      case getType(addParticipantLinkRequest):
        draft.loaders.addingParticipantLink = true;
        break;
      case getType(addParticipantLinkSuccess):
        draft.loaders.addingParticipantLink = false;
        if (draft.navigatorSetup) {
          const { navigatorSetup } = action.payload;
          draft.navigatorSetup = navigatorSetup;
        }
        break;
      case getType(addParticipantLinkError):
        draft.loaders.addingParticipantLink = false;
        break;
      case getType(removeParticipantLinkRequest):
        if (draft.navigatorSetup) {
          updateItemById(
            draft.navigatorSetup.participantLinks,
            action.payload.linkId,
            { deleting: true },
          );
        }
        break;
      case getType(removeParticipantLinkSuccess):
        if (draft.navigatorSetup) {
          deleteItemById(
            draft.navigatorSetup.participantLinks,
            action.payload.linkId,
          );
        }
        break;
      case getType(removeParticipantLinkError):
        if (draft.navigatorSetup) {
          updateItemById(
            draft.navigatorSetup.participantLinks,
            action.payload.linkId,
            { deleting: false },
          );
        }
        break;
      case getType(addNavigatorLinkRequest):
        draft.loaders.addingNavigatorLink = true;
        break;
      case getType(addNavigatorLinkSuccess):
        draft.loaders.addingNavigatorLink = false;
        if (draft.navigatorSetup) {
          const { navigatorSetup } = action.payload;
          draft.navigatorSetup = navigatorSetup;
        }
        break;
      case getType(addNavigatorLinkError):
        draft.loaders.addingNavigatorLink = false;
        break;
      case getType(removeNavigatorLinkRequest):
        if (draft.navigatorSetup) {
          updateItemById(
            draft.navigatorSetup.navigatorLinks,
            action.payload.linkId,
            { deleting: true },
          );
        }
        break;
      case getType(removeNavigatorLinkSuccess):
        if (draft.navigatorSetup) {
          deleteItemById(
            draft.navigatorSetup.navigatorLinks,
            action.payload.linkId,
          );
        }
        break;
      case getType(removeNavigatorLinkError):
        if (draft.navigatorSetup) {
          updateItemById(
            draft.navigatorSetup.navigatorLinks,
            action.payload.linkId,
            { deleting: false },
          );
        }
        break;
      case getType(addParticipantFileRequest):
        draft.loaders.updatingParticipantFiles = true;
        break;
      case getType(addParticipantFileSuccess):
        draft.loaders.updatingParticipantFiles = false;
        if (draft.navigatorSetup) {
          const { navigatorSetup } = action.payload;
          draft.navigatorSetup = navigatorSetup;
        }
        break;
      case getType(addParticipantFileError):
        draft.loaders.updatingParticipantFiles = false;
        break;
      case getType(inviteNavigatorsByEmailRequest):
        draft.loaders.navigatorEmailInvitation = true;
        break;
      case getType(inviteNavigatorsByEmailSuccess): {
        const {
          payload: { pendingNavigatorInvitations },
        } = action;
        draft.pendingNavigatorInvitations.push(...pendingNavigatorInvitations);
        draft.loaders.navigatorEmailInvitation = false;
        break;
      }
      case getType(inviteNavigatorsByEmailError):
        draft.loaders.navigatorEmailInvitation = false;
        break;
      case getType(removeNavigatorEmailInvitationRequest): {
        updateItemById(
          draft.pendingNavigatorInvitations,
          action.payload.invitationId,
          { inDeletion: true },
        );
        break;
      }
      case getType(removeNavigatorEmailInvitationSuccess): {
        deleteItemById(
          draft.pendingNavigatorInvitations,
          action.payload.invitationId,
        );
        break;
      }
      case getType(removeNavigatorEmailInvitationError): {
        updateItemById(
          draft.pendingNavigatorInvitations,
          action.payload.invitationId,
          { inDeletion: false },
        );
        break;
      }
      case getType(removeInterventionNavigatorSuccess): {
        deleteItemById(
          draft.interventionNavigators,
          action.payload.interventionNavigatorId,
        );
        break;
      }
      case getType(removeInterventionNavigatorRequest): {
        updateItemById(
          draft.interventionNavigators,
          action.payload.interventionNavigatorId,
          { inDeletion: true },
        );
        break;
      }
      case getType(removeInterventionNavigatorError): {
        updateItemById(
          draft.interventionNavigators,
          action.payload.interventionNavigatorId,
          { inDeletion: false },
        );
        break;
      }
      case getType(removeParticipantFileRequest):
        if (draft.navigatorSetup) {
          updateItemById(
            draft.navigatorSetup.participantFiles,
            action.payload.fileId,
            { deleting: true },
          );
        }
        break;
      case getType(removeParticipantFileSuccess):
        const { fileId } = action.payload;
        if (draft.navigatorSetup) {
          deleteItemById(draft.navigatorSetup.participantFiles, fileId);
        }
        break;
      case getType(removeParticipantFileError):
        if (draft.navigatorSetup) {
          updateItemById(
            draft.navigatorSetup.participantFiles,
            action.payload.fileId,
            { deleting: false },
          );
        }
        break;
    }
  });
