import { ActionType } from 'typesafe-actions';

import { ApiError } from 'models/Api';
import {
  InterventionNavigator,
  NavigatorSetup,
  PendingNavigatorInvitation,
} from 'models/NavigatorSetup';

import * as actions from './actions';

export type NavigatorSetupAction = ActionType<typeof actions>;

export type NavigatorSetupState = {
  navigatorSetup: Nullable<NavigatorSetup>;
  pendingNavigatorInvitations: PendingNavigatorInvitation[];
  interventionNavigators: InterventionNavigator[];
  loaders: {
    fetchingNavigatorSetup: boolean;
    updatingNoNavigatorsData: boolean;
    addingParticipantLink: boolean;
    addingNavigatorLink: boolean;
    updatingParticipantFiles: boolean;
    navigatorEmailInvitation: boolean;
  };
  error: Nullable<ApiError>;
};
