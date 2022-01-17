import { CamelToSnakeOmitId } from 'global/types/camelToSnake';

export enum GroupTypes {
  PLAIN = 'QuestionGroup::Plain',
  FINISH = 'QuestionGroup::Finish',
  TLFB = 'QuestionGroup::Tlfb',
}

export interface QuestionGroup {
  id: string;
  sessionId: string;
  title: string;
  position: number;
  type: GroupTypes;
}

export type QuestionGroupDTO = CamelToSnakeOmitId<QuestionGroup>;
