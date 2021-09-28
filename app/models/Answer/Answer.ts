import { AnswerType } from './AnswerType';

// answer value

export interface NameAnswerValue {
  name: string;
  phoneticName?: string;
}

export interface ParticipantReportAnswerValue {
  email: string;
  receiveReport: boolean;
}

export interface PhoneAnswerValue {
  confirmed: boolean;
  iso: string;
  number: string;
  prefix: string;
}

export type VariableAnswerValueType =
  | string
  | number
  | boolean
  | NameAnswerValue
  | ParticipantReportAnswerValue
  | PhoneAnswerValue;

// answer data

export interface AnswerData<T> {
  value: T;
}

export interface VariableAnswerData<
  T extends VariableAnswerValueType = VariableAnswerValueType,
> extends AnswerData<T> {
  var: string;
}

export interface ThirdPartyReportAnswerData extends AnswerData<string> {
  reportTemplateIds: string[];
}

export type AnswerDataType = VariableAnswerData | ThirdPartyReportAnswerData;

// answer body

export interface AnswerBody<T extends AnswerDataType = AnswerDataType> {
  data: T[];
}

// answer

export interface Answer<T extends AnswerDataType = AnswerDataType> {
  id: string;
  questionId: string;
  type: AnswerType;
  decryptedBody: AnswerBody<T>;
  nextSessionId: Nullable<string>;
}

export type SingleAnswer = Answer<VariableAnswerData<string>>;

export type MultiAnswer = Answer<VariableAnswerData<string>>;

export type FreeResponseAnswer = Answer<VariableAnswerData<string>>;

export type DateAnswer = Answer<VariableAnswerData<string>>;

export type NameAnswer = Answer<VariableAnswerData<NameAnswerValue>>;

export type CurrencyAnswer = Answer<VariableAnswerData<string>>;

export type NumberAnswer = Answer<VariableAnswerData<string | number>>;

export type GridAnswer = Answer<VariableAnswerData<string>>;

export type SliderAnswer = Answer<VariableAnswerData<number>>;

export type InformationAnswer = Answer<VariableAnswerData<''>>;

export type ExternalLinkAnswer = Answer<VariableAnswerData<boolean>>;

export type FeedbackAnswer = Answer<VariableAnswerData<''>>;

// value is an empty string if question is skipped
export type ParticipantReportAnswer = Answer<
  VariableAnswerData<ParticipantReportAnswerValue | ''>
>;

// value is an empty string if question is skipped
export type ThirdPartyReportAnswer = Answer<
  ThirdPartyReportAnswerData | VariableAnswerData<''>
>;

// value is an empty string if question is skipped
export type PhoneAnswer = Answer<VariableAnswerData<PhoneAnswerValue | ''>>;
