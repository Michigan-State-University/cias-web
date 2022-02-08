import { ActionType } from 'typesafe-actions';

import { CalendarData } from 'components/Calendar/types';
import * as actions from './actions';

export type TlfbActions = ActionType<typeof actions>;

export type TlfbState = {
  days: CalendarData;
  loaders: Record<string, boolean>;
  errors: Record<string, boolean>;
  cache: {
    days: TlfbState['days'];
  };
};
