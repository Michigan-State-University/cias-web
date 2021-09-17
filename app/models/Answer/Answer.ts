import { AnswerType } from './AnswerType';

export interface AnswerData {
  var: string;
  value: string;
}

export interface AnswerBody {
  data: AnswerData[];
}

export interface Answer {
  id: string;
  questionId: string;
  type: AnswerType;
  decryptedBody: AnswerBody;
}
