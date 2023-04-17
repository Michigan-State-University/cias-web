import produce from 'immer';
import { getType } from 'typesafe-actions';

import { deleteItemById, updateItemById } from 'utils/reduxUtils';
import { WithReducer } from '../types';

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
  addNavigatorFileRequest,
  addNavigatorFileSuccess,
  addNavigatorFileError,
  removeNavigatorFileRequest,
  removeNavigatorFileSuccess,
  removeNavigatorFileError,
  addNavigatorFromTeamRequest,
  addNavigatorFromTeamSuccess,
  addNavigatorFromTeamError,
  uploadFilledScriptTemplateSuccess,
  uploadFilledScriptTemplateError,
  uploadFilledScriptTemplateRequest,
  removeFilledScriptTemplateRequest,
  removeFilledScriptTemplateSuccess,
  removeFilledScriptTemplateError,
  updateParticipantLinkRequest,
  updateParticipantLinkSuccess,
  updateParticipantLinkError,
  updateNavigatorLinkRequest,
  updateNavigatorLinkSuccess,
  updateNavigatorLinkError,
} from './actions';
import { NavigatorSetupState, NavigatorSetupAction } from './types';

export const navigatorSetupReducerKey = 'navigatorSetup';

export const initialState: NavigatorSetupState = {
  navigatorSetup: null,
  pendingNavigatorInvitations: [],
  interventionNavigators: [],
  teamNavigators: [],
  loaders: {
    fetchingNavigatorSetup: false,
    updatingNoNavigatorsData: false,
    addingParticipantLink: false,
    addingNavigatorLink: false,
    uploadingNavigatorFile: false,
    uploadingParticipantFile: false,
    navigatorEmailInvitation: false,
    updatingFilledNavigatorScript: false,
  },
  error: null,
};

/* eslint-disable default-case, no-param-reassign */
export const navigatorSetupReducer = (
  state: NavigatorSetupState = initialState,
  { type, payload }: NavigatorSetupAction,
) =>
  produce(state, (draft) => {
    switch (type) {
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
          navigatorsInTeam,
        } = payload;
        draft.navigatorSetup = navigatorSetup;
        draft.pendingNavigatorInvitations = pendingNavigatorInvitations;
        draft.interventionNavigators = interventionNavigators;
        draft.teamNavigators = navigatorsInTeam;
        draft.loaders.fetchingNavigatorSetup = false;
        break;
      }
      case getType(fetchNavigatorSetupError):
        draft.loaders.fetchingNavigatorSetup = false;
        draft.error = payload.error;
        break;

      case getType(updateNoNavigatorTabRequest):
        if (state.navigatorSetup && draft.navigatorSetup) {
          draft.navigatorSetup = {
            ...draft.navigatorSetup,
            ...payload.noNavigatorsData,
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
          const { navigatorSetup } = payload;
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
            payload.linkId,
            { deleting: true },
          );
        }
        break;
      case getType(removeParticipantLinkSuccess):
        if (draft.navigatorSetup) {
          deleteItemById(draft.navigatorSetup.participantLinks, payload.linkId);
        }
        break;
      case getType(removeParticipantLinkError):
        if (draft.navigatorSetup) {
          updateItemById(
            draft.navigatorSetup.participantLinks,
            payload.linkId,
            { deleting: false },
          );
        }
        break;
      case getType(updateParticipantLinkRequest):
        if (draft.navigatorSetup) {
          updateItemById(
            draft.navigatorSetup.participantLinks,
            payload.linkId,
            { saving: true },
          );
        }
        break;
      case getType(updateParticipantLinkSuccess): {
        const { linkId, linkData } = payload;
        if (draft.navigatorSetup) {
          updateItemById(draft.navigatorSetup.participantLinks, linkId, {
            saving: false,
            ...linkData,
          });
        }
        break;
      }
      case getType(updateParticipantLinkError):
        if (draft.navigatorSetup) {
          updateItemById(
            draft.navigatorSetup.participantLinks,
            payload.linkId,
            { saving: false },
          );
        }
        break;
      case getType(addNavigatorLinkRequest):
        draft.loaders.addingNavigatorLink = true;
        break;
      case getType(addNavigatorLinkSuccess):
        draft.loaders.addingNavigatorLink = false;
        if (draft.navigatorSetup) {
          const { navigatorSetup } = payload;
          draft.navigatorSetup = navigatorSetup;
        }
        break;
      case getType(addNavigatorLinkError):
        draft.loaders.addingNavigatorLink = false;
        break;
      case getType(removeNavigatorLinkRequest):
        if (draft.navigatorSetup) {
          updateItemById(draft.navigatorSetup.navigatorLinks, payload.linkId, {
            deleting: true,
          });
        }
        break;
      case getType(removeNavigatorLinkSuccess):
        if (draft.navigatorSetup) {
          deleteItemById(draft.navigatorSetup.navigatorLinks, payload.linkId);
        }
        break;
      case getType(removeNavigatorLinkError):
        if (draft.navigatorSetup) {
          updateItemById(draft.navigatorSetup.navigatorLinks, payload.linkId, {
            deleting: false,
          });
        }
        break;
      case getType(updateNavigatorLinkRequest):
        if (draft.navigatorSetup) {
          updateItemById(draft.navigatorSetup.navigatorLinks, payload.linkId, {
            saving: true,
          });
        }
        break;
      case getType(updateNavigatorLinkSuccess): {
        const { linkId, linkData } = payload;
        if (draft.navigatorSetup) {
          updateItemById(draft.navigatorSetup.navigatorLinks, linkId, {
            saving: false,
            ...linkData,
          });
        }
        break;
      }
      case getType(updateNavigatorLinkError):
        if (draft.navigatorSetup) {
          updateItemById(draft.navigatorSetup.navigatorLinks, payload.linkId, {
            saving: false,
          });
        }
        break;
      case getType(inviteNavigatorsByEmailRequest):
        draft.loaders.navigatorEmailInvitation = true;
        break;
      case getType(inviteNavigatorsByEmailSuccess): {
        const { pendingNavigatorInvitations } = payload;
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
          payload.invitationId,
          { inDeletion: true },
        );
        break;
      }
      case getType(removeNavigatorEmailInvitationSuccess): {
        deleteItemById(draft.pendingNavigatorInvitations, payload.invitationId);
        break;
      }
      case getType(removeNavigatorEmailInvitationError): {
        updateItemById(
          draft.pendingNavigatorInvitations,
          payload.invitationId,
          { inDeletion: false },
        );
        break;
      }
      case getType(removeInterventionNavigatorSuccess): {
        deleteItemById(
          draft.interventionNavigators,
          payload.interventionNavigatorId,
        );
        break;
      }
      case getType(removeInterventionNavigatorRequest): {
        updateItemById(
          draft.interventionNavigators,
          payload.interventionNavigatorId,
          { inDeletion: true },
        );
        break;
      }
      case getType(removeInterventionNavigatorError): {
        updateItemById(
          draft.interventionNavigators,
          payload.interventionNavigatorId,
          { inDeletion: false },
        );
        break;
      }
      case getType(addParticipantFileRequest): {
        draft.loaders.uploadingParticipantFile = true;
        break;
      }
      case getType(addParticipantFileSuccess): {
        draft.loaders.uploadingParticipantFile = false;
        const { navigatorSetup } = payload;
        draft.navigatorSetup = navigatorSetup;
        break;
      }
      case getType(addParticipantFileError): {
        draft.loaders.uploadingParticipantFile = false;
        break;
      }
      case getType(removeParticipantFileRequest): {
        if (draft.navigatorSetup) {
          updateItemById(
            draft.navigatorSetup.participantFiles,
            payload.fileId,
            { deleting: true },
          );
        }
        break;
      }
      case getType(removeParticipantFileSuccess): {
        if (draft.navigatorSetup) {
          deleteItemById(draft.navigatorSetup.participantFiles, payload.fileId);
        }
        break;
      }
      case getType(removeParticipantFileError): {
        if (draft.navigatorSetup) {
          updateItemById(
            draft.navigatorSetup.participantFiles,
            payload.fileId,
            { deleting: false },
          );
        }
        break;
      }
      case getType(addNavigatorFileRequest): {
        draft.loaders.uploadingNavigatorFile = true;
        break;
      }
      case getType(addNavigatorFileSuccess): {
        draft.loaders.uploadingNavigatorFile = false;
        const { navigatorSetup } = payload;
        draft.navigatorSetup = navigatorSetup;
        break;
      }
      case getType(addNavigatorFileError): {
        draft.loaders.uploadingNavigatorFile = false;
        break;
      }
      case getType(removeNavigatorFileRequest): {
        if (draft.navigatorSetup) {
          updateItemById(draft.navigatorSetup.navigatorFiles, payload.fileId, {
            deleting: true,
          });
        }
        break;
      }
      case getType(removeNavigatorFileSuccess): {
        if (draft.navigatorSetup) {
          deleteItemById(draft.navigatorSetup.navigatorFiles, payload.fileId);
        }
        break;
      }
      case getType(removeNavigatorFileError): {
        if (draft.navigatorSetup) {
          updateItemById(draft.navigatorSetup.navigatorFiles, payload.fileId, {
            deleting: false,
          });
        }
        break;
      }

      case getType(addNavigatorFromTeamRequest): {
        updateItemById(draft.teamNavigators, payload.user.id, {
          inDeletion: true,
        });
        break;
      }
      case getType(addNavigatorFromTeamSuccess): {
        const { user } = payload;
        updateItemById(draft.teamNavigators, user.id, {
          inDeletion: false,
        });
        draft.interventionNavigators.push(user);
        break;
      }
      case getType(addNavigatorFromTeamError): {
        updateItemById(draft.teamNavigators, payload.id, {
          inDeletion: false,
        });
        break;
      }

      case getType(uploadFilledScriptTemplateRequest): {
        draft.loaders.updatingFilledNavigatorScript = true;
        break;
      }
      case getType(uploadFilledScriptTemplateSuccess): {
        draft.loaders.updatingFilledNavigatorScript = false;
        if (draft.navigatorSetup) {
          const { navigatorSetup } = payload;
          draft.navigatorSetup = navigatorSetup;
        }
        break;
      }
      case getType(uploadFilledScriptTemplateError): {
        draft.loaders.updatingFilledNavigatorScript = false;
        break;
      }

      case getType(removeFilledScriptTemplateRequest): {
        draft.loaders.updatingFilledNavigatorScript = true;
        break;
      }
      case getType(removeFilledScriptTemplateSuccess): {
        draft.loaders.updatingFilledNavigatorScript = false;
        if (draft.navigatorSetup) {
          const { navigatorSetup } = payload;
          draft.navigatorSetup = navigatorSetup;
        }
        break;
      }
      case getType(removeFilledScriptTemplateError): {
        draft.loaders.updatingFilledNavigatorScript = false;
        break;
      }
    }
  });

export const withNavigatorSetupReducer: WithReducer = {
  key: navigatorSetupReducerKey,
  // @ts-ignore
  reducer: navigatorSetupReducer,
};
