import { ActionType } from 'typesafe-actions';

import * as actions from './actions';

export type TlfbActions = ActionType<typeof actions>;

export type EventData = {
  id: number;
  name: string;
};

type DayData = {
  events: EventData[];
};

export type TlfbState = {
  days: Record<string, DayData>;
  loaders: Record<string, boolean>;
};
