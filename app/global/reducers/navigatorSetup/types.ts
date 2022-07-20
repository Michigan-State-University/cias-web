import { ActionType } from 'typesafe-actions';

import { ApiError } from 'models/Api';
import {
  InterventionNavigator,
  NoNavigatorsAvailableData,
  PendingNavigatorInvitation,
} from 'models/NavigatorSetup';

import * as actions from './actions';

export type NavigatorSetupAction = ActionType<typeof actions>;

type NavigatorsData = {
  pendingNavigatorInvitations: PendingNavigatorInvitation[];
  interventionNavigators: InterventionNavigator[];
};

type ModalTabsData = {
  noNavigatorsAvailableData: NoNavigatorsAvailableData;
  navigatorsData: NavigatorsData;
};

export type NavigatorSetupState = {
  modalTabsData: Nullable<ModalTabsData>;
  loaders: Record<string, boolean>;
  error: Nullable<ApiError>;
};
