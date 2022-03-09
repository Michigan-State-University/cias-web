import { ActionType } from 'typesafe-actions';

import { EventData, TlfbQuestionAnswer, CalendarData } from 'models/Tlfb';

import * as actions from './actions';

export type TlfbAction = ActionType<typeof actions>;

export type TlfbState = {
  days: CalendarData;
  loaders: Record<string, boolean>;
  errors: Record<string, boolean>;
  cache: {
    days: TlfbState['days'];
  };
  answerSavedSuccessfully: boolean;
};

export type CalendarDataResponseItem = {
  id: string;
  date: string;
  events?: EventData[];
  substances?: TlfbQuestionAnswer[];
};
