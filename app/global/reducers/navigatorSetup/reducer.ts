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
} from './actions';
import { NavigatorSetupState, NavigatorSetupAction } from './types';

export const initialState: NavigatorSetupState = {
  loaders: {
    fetching: false,
    updatingForm: false,
    updatingLinks: false,
    updatingParticipantFiles: false,
    navigatorEmailInvitation: false,
  },
  modalTabsData: null,
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
        draft.loaders.fetching = true;
        draft.modalTabsData = null;
        draft.error = null;
        break;

      case getType(fetchNavigatorSetupSuccess): {
        const {
          pendingNavigatorInvitations,
          interventionNavigators,
          navigatorSetupData,
        } = action.payload;
        draft.modalTabsData = {
          navigatorsData: {
            pendingNavigatorInvitations,
            interventionNavigators,
          },
          navigatorSetupData,
        };
        draft.loaders.fetching = false;
        break;
      }
      case getType(fetchNavigatorSetupError):
        draft.loaders.fetching = false;
        draft.error = action.payload.error;
        break;

      case getType(updateNoNavigatorTabRequest):
        if (state.modalTabsData && draft.modalTabsData) {
          draft.modalTabsData.navigatorSetupData = {
            ...state.modalTabsData?.navigatorSetupData,
            ...action.payload.noNavigatorsData,
          };
          draft.loaders.updatingForm = true;
        }
        break;
      case getType(updateNoNavigatorsTabError):
      case getType(updateNoNavigatorsTabSuccess):
        draft.loaders.updatingForm = false;
        break;

      case getType(addParticipantLinkRequest):
        draft.loaders.updatingLinks = true;
        break;
      case getType(addParticipantLinkSuccess):
        draft.loaders.updatingLinks = false;
        if (draft.modalTabsData) {
          const { navigatorSetupData } = action.payload;
          draft.modalTabsData.navigatorSetupData = navigatorSetupData;
        }
        break;
      case getType(addParticipantLinkError):
        draft.loaders.updatingLinks = false;
        break;

      case getType(addParticipantFileRequest):
        draft.loaders.updatingParticipantFiles = true;
        break;
      case getType(addParticipantFileSuccess):
        draft.loaders.updatingParticipantFiles = false;
        if (draft.modalTabsData) {
          const { navigatorSetupData } = action.payload;
          draft.modalTabsData.navigatorSetupData = navigatorSetupData;
        }
        break;
      case getType(addParticipantFileError):
        draft.loaders.updatingParticipantFiles = false;
        break;

      case getType(removeParticipantLinkRequest):
        updateItemById(
          draft.modalTabsData?.navigatorSetupData.participantLinks || [],
          action.payload.linkId,
          { deleting: true },
        );
        draft.loaders.updatingLinks = true;
        break;
      case getType(removeParticipantLinkSuccess):
        const { linkId } = action.payload;
        if (draft.modalTabsData) {
          deleteItemById(
            draft.modalTabsData.navigatorSetupData.participantLinks,
            linkId,
          );
        }
        break;
      case getType(removeParticipantLinkError):
        updateItemById(
          draft.modalTabsData?.navigatorSetupData.participantLinks || [],
          action.payload.linkId,
          { deleting: false },
        );
        draft.loaders.updatingLinks = false;
        break;
      case getType(inviteNavigatorsByEmailRequest):
        draft.loaders.navigatorEmailInvitation = true;
        break;
      case getType(inviteNavigatorsByEmailSuccess): {
        if (draft.modalTabsData) {
          const {
            payload: { pendingNavigatorInvitations },
          } = action;
          draft.modalTabsData.navigatorsData.pendingNavigatorInvitations.push(
            ...pendingNavigatorInvitations,
          );
        }
        draft.loaders.navigatorEmailInvitation = false;
        break;
      }
      case getType(inviteNavigatorsByEmailError):
        draft.loaders.navigatorEmailInvitation = false;
        break;
      case getType(removeNavigatorEmailInvitationRequest): {
        if (draft.modalTabsData) {
          updateItemById(
            draft.modalTabsData.navigatorsData.pendingNavigatorInvitations,
            action.payload.invitationId,
            { inDeletion: true },
          );
        }
        break;
      }
      case getType(removeNavigatorEmailInvitationSuccess): {
        if (draft.modalTabsData) {
          deleteItemById(
            draft.modalTabsData.navigatorsData.pendingNavigatorInvitations,
            action.payload.invitationId,
          );
        }
        break;
      }
      case getType(removeNavigatorEmailInvitationError): {
        if (draft.modalTabsData) {
          updateItemById(
            draft.modalTabsData.navigatorsData.pendingNavigatorInvitations,
            action.payload.invitationId,
            { inDeletion: false },
          );
        }
        break;
      }
      case getType(removeInterventionNavigatorSuccess): {
        if (draft.modalTabsData) {
          deleteItemById(
            draft.modalTabsData.navigatorsData.interventionNavigators,
            action.payload.interventionNavigatorId,
          );
        }
        break;
      }
      case getType(removeInterventionNavigatorRequest): {
        if (draft.modalTabsData) {
          updateItemById(
            draft.modalTabsData.navigatorsData.interventionNavigators,
            action.payload.interventionNavigatorId,
            { inDeletion: true },
          );
        }
        break;
      }
      case getType(removeInterventionNavigatorError): {
        if (draft.modalTabsData) {
          updateItemById(
            draft.modalTabsData.navigatorsData.interventionNavigators,
            action.payload.interventionNavigatorId,
            { inDeletion: false },
          );
        }
        break;
      }
    }
  });
