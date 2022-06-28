import produce from 'immer';
import { getType } from 'typesafe-actions';

import {
  fetchNavigatorSetupError,
  fetchNavigatorSetupRequest,
  fetchNavigatorSetupSuccess,
  updateNavigatorSetupRequest,
  updateNavigatorSetupError,
  updateNavigatorSetupSuccess,
} from './actions';
import { NavigatorSetupState, NavigatorSetupAction } from './types';

export const initialState: NavigatorSetupState = {
  loaders: {
    fetching: false,
    updatingForm: false,
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
    }
  });
