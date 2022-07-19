import { ActionType } from 'typesafe-actions';

import { ApiError } from 'models/Api';
import {
  InterventionNavigator,
  NoNavigatorsAvailableData,
  PendingNavigatorInvitations,
} from 'models/NavigatorSetup';

import * as actions from './actions';

export type NavigatorSetupAction = ActionType<typeof actions>;

type NavigatorsData = {
  pendingNavigatorInvitations: PendingNavigatorInvitations[];
  interventionNavigators: InterventionNavigator[];
};

type ModalTabsData = {
  noNavigatorsAvailable: NoNavigatorsAvailableData;
  navigatorsData: NavigatorsData;
};

export type NavigatorSetupState = {
  modalTabsData: Nullable<ModalTabsData>;
  loaders: Record<string, boolean>;
  error: Nullable<ApiError>;
};
