import produce from 'immer';
import { getType } from 'typesafe-actions';

import { deleteItemById } from 'utils/reduxUtils';

import {
  fetchNavigatorSetupError,
  fetchNavigatorSetupRequest,
  fetchNavigatorSetupSuccess,
  updateNavigatorSetupRequest,
  updateNavigatorSetupError,
  updateNavigatorSetupSuccess,
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
} from './actions';
import { NavigatorSetupState, NavigatorSetupAction } from './types';

export const initialState: NavigatorSetupState = {
  loaders: {
    fetching: false,
    updatingForm: false,
    updatingLinks: false,
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
          noNavigatorsData,
          notAcceptedNavigators,
          interventionNavigators,
        } = action.payload;
        draft.modalTabsData = {
          navigatorsData: {
            notAcceptedNavigators,
            interventionNavigators,
          },
          noNavigatorAvailable: noNavigatorsData,
        };
        draft.loaders.fetching = false;
        break;
      }
      case getType(fetchNavigatorSetupError):
        draft.loaders.fetching = false;
        draft.error = action.payload.error;
        break;

      case getType(updateNavigatorSetupRequest):
        // @ts-ignore
        draft.modalTabsData.noNavigatorAvailable = {
          ...state.modalTabsData?.noNavigatorAvailable,
          ...action.payload.noNavigatorsData,
        };
        draft.loaders.updatingForm = true;
        break;
      case getType(updateNavigatorSetupError):
      case getType(updateNavigatorSetupSuccess):
        draft.loaders.fetching = false;
        break;

      case getType(addParticipantLinkRequest):
        draft.loaders.updatingLinks = true;
        break;
      case getType(addParticipantLinkSuccess):
        const { navigatorSetup } = action.payload;
        draft.modalTabsData!.noNavigatorAvailable = navigatorSetup;
        break;
      case getType(addParticipantLinkError):
        draft.loaders.updatingLinks = false;
        break;

      case getType(removeParticipantLinkRequest):
        draft.loaders.updatingLinks = true;
        break;
      case getType(removeParticipantLinkSuccess):
        const { linkId } = action.payload;
        if (draft.modalTabsData) {
          deleteItemById(
            draft.modalTabsData.noNavigatorAvailable.participantLinks,
            linkId,
          );
        }
        break;
      case getType(removeParticipantLinkError):
        draft.loaders.updatingLinks = false;
        break;
      case getType(inviteNavigatorsByEmailRequest):
        draft.loaders.navigatorEmailInvitation = true;
        break;
      case getType(inviteNavigatorsByEmailSuccess): {
        draft.modalTabsData!.navigatorsData.notAcceptedNavigators = [
          ...state.modalTabsData!.navigatorsData.notAcceptedNavigators,
          ...action.payload.notAcceptedNavigators,
        ];
        draft.loaders.navigatorEmailInvitation = false;
        break;
      }
      case getType(inviteNavigatorsByEmailError):
        draft.loaders.navigatorEmailInvitation = false;
        break;
      case getType(removeNavigatorEmailInvitationSuccess): {
        deleteItemById(
          draft.modalTabsData!.navigatorsData.notAcceptedNavigators,
          action.payload.invitationId,
        );
        break;
      }
      case getType(removeInterventionNavigatorSuccess): {
        deleteItemById(
          draft.modalTabsData!.navigatorsData.interventionNavigators,
          action.payload.interventionNavigatorId,
        );
        break;
      }
    }
  });
