import { ActionType } from 'typesafe-actions';

import { ApiError } from 'models/Api';
import {
  NavigatorModalUser,
  NavigatorSetup,
  PendingNavigatorInvitation,
} from 'models/NavigatorSetup';

import * as actions from './actions';

export type NavigatorSetupAction = ActionType<typeof actions>;

export type NavigatorSetupState = {
  navigatorSetup: Nullable<NavigatorSetup>;
  pendingNavigatorInvitations: PendingNavigatorInvitation[];
  interventionNavigators: NavigatorModalUser[];
  teamNavigators: NavigatorModalUser[];
  loaders: {
    fetchingNavigatorSetup: boolean;
    updatingNoNavigatorsData: boolean;
    addingParticipantLink: boolean;
    addingNavigatorLink: boolean;
    uploadingNavigatorFile: boolean;
    uploadingParticipantFile: boolean;
    navigatorEmailInvitation: boolean;
    updatingFilledNavigatorScript: boolean;
  };
  error: Nullable<ApiError>;
};
