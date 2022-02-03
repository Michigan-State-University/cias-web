import { ActionType } from 'typesafe-actions';

import { DayData } from 'models/Tlfb';
import * as actions from './actions';

export type TlfbActions = ActionType<typeof actions>;

export type TlfbState = {
  days: Record<string, DayData>;
  loaders: Record<string, boolean>;
  cache: {
    days: TlfbState['days'];
  };
};
