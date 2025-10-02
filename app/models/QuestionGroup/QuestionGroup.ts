import { CamelToSnakeOmitId } from 'global/types/camelToSnake';

export enum GroupType {
  PLAIN = 'QuestionGroup::Plain',
  FINISH = 'QuestionGroup::Finish',
  INITIAL = 'QuestionGroup::Initial',
  TLFB = 'QuestionGroup::Tlfb',
}

export interface QuestionGroup {
  id: string;
  sessionId: string;
  title: string;
  position: number;
  type: GroupType;
  smsSchedule: {
    overwriteUserTimeSettings: boolean;
    questionsPerDay: number;
    numberOfRepetitions?: number;
    dayOfPeriod: string[];
    time: { exact: string; range: { from: string; to: string } };
    patterns: { match: string }[];
  };
  formulas: { payload: string; patterns: Array<{ match: string }> }[];
}

export type QuestionGroupDTO = CamelToSnakeOmitId<QuestionGroup>;
