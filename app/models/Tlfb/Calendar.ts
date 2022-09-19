import { EventData } from './Event';
import { TlfbQuestionAnswer } from './TlfbQuestionAnswer';

export type DayData = {
  events?: EventData[];
  answer?: TlfbQuestionAnswer;
};

export type CalendarData = Record<string, DayData>;
