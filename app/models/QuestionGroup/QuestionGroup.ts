import { CamelToSnakeOmitId } from 'global/types/camelToSnake';

export interface QuestionGroup {
  id: string;
  sessionId: string;
  title: string;
  position: number;
  type: string;
}

export type QuestionGroupDTO = CamelToSnakeOmitId<QuestionGroup>;
