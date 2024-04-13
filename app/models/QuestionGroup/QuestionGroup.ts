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
}

export type QuestionGroupDTO = CamelToSnakeOmitId<QuestionGroup>;
