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
} from './actions';
import { NavigatorSetupState, NavigatorSetupAction } from './types';

export const initialState: NavigatorSetupState = {
  loaders: {
    fetching: false,
    updatingForm: false,
    updatingLinks: false,
  },
  navigatorData: null,
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
        draft.navigatorData = null;
        draft.error = null;
        break;

      case getType(fetchNavigatorSetupSuccess):
        draft.navigatorData = action.payload.navigatorSetup;
        draft.loaders.fetching = false;
        break;
      case getType(fetchNavigatorSetupError):
        draft.loaders.fetching = false;
        draft.error = action.payload.error;
        break;

      case getType(updateNavigatorSetupRequest):
        // @ts-ignore
        draft.navigatorData = {
          ...state.navigatorData,
          ...action.payload.navigatorSetupData,
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
        draft.navigatorData = navigatorSetup;
        break;
      case getType(addParticipantLinkError):
        draft.loaders.updatingLinks = false;
        break;

      case getType(removeParticipantLinkRequest):
        draft.loaders.updatingLinks = true;
        break;
      case getType(removeParticipantLinkSuccess):
        const { linkId } = action.payload;
        if (draft.navigatorData) {
          deleteItemById(draft.navigatorData.participantLinks, linkId);
        }
        break;
      case getType(removeParticipantLinkError):
        draft.loaders.updatingLinks = false;
        break;
    }
  });
