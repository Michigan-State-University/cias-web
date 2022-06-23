import { ActionType } from 'typesafe-actions';

import { ApiError } from 'models/Api';
import { NavigatorSetup } from 'models/NavigatorSetup';

import * as actions from './actions';

export type NavigatorSetupAction = ActionType<typeof actions>;

export type NavigatorSetupState = {
  navigatorData: Nullable<NavigatorSetup>;
  loaders: Record<string, boolean>;
  error: Nullable<ApiError>;
};
