import { AnswerType } from './AnswerType';

export interface NameAnswerValue {
  name: string;
  phoneticName: string;
}

export interface ParticipantReportAnswerValue {
  email: string;
  receiveReport: boolean;
}

export type AnswerValueType =
  | string
  | number
  | NameAnswerValue
  | ParticipantReportAnswerValue;

export interface AnswerData<T> {
  var: string;
  value: T;
}

export interface AnswerBody<T> {
  data: AnswerData<T>[];
}

export interface Answer<T extends AnswerValueType = AnswerValueType> {
  id: string;
  questionId: string;
  type: AnswerType;
  decryptedBody: AnswerBody<T>;
  nextSessionId: Nullable<string>;
}
