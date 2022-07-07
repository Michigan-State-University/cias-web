import { ActionType } from 'typesafe-actions';

import { ApiError } from 'models/Api';
import {
  NoNavigatorAvailableData,
  NotAcceptedNavigators,
} from 'models/NavigatorSetup';

import * as actions from './actions';

export type NavigatorSetupAction = ActionType<typeof actions>;

type ModalTabsData = {
  noNavigatorAvailable: NoNavigatorAvailableData;
  navigatorsData: {
    notAcceptedNavigators: NotAcceptedNavigators[];
    interventionNavigators: any[];
  };
};

export type NavigatorSetupState = {
  modalTabsData: Nullable<ModalTabsData>;
  loaders: Record<string, boolean>;
  error: Nullable<ApiError>;
};
