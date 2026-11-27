import { TimeRange } from 'models/TimeRange';

import { AnswerType } from './AnswerType';

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
  timeRanges?: TimeRange[];
  timezone?: string;
}

export type VariableAnswerValueType =
  | string
  | string[]
  | number
  | boolean
  | NameAnswerValue
  | ParticipantReportAnswerValue
  | PhoneAnswerValue;

export interface AnswerData<T> {
  value: T;
}

export interface VariableAnswerData<
  T extends VariableAnswerValueType = VariableAnswerValueType,
> extends AnswerData<T> {
  var: string;
}

export interface IndexedVariableAnswerData<
  T extends VariableAnswerValueType = VariableAnswerValueType,
> extends VariableAnswerData<T> {
  index?: number;
}

export interface ThirdPartyReportAnswerData extends IndexedVariableAnswerData<string> {
  reportTemplateIds: string[];
  numericValue: string[];
}

export interface GridAnswerData extends VariableAnswerData<string> {
  index?: {
    [key: string]: number;
  };
}

export interface HenryFordQuestionAnswerData extends IndexedVariableAnswerData<string> {
  hfhValue: string;
}

export type AnswerDataType =
  | VariableAnswerData
  | IndexedVariableAnswerData
  | ThirdPartyReportAnswerData
  | GridAnswerData
  | HenryFordQuestionAnswerData;

export interface AnswerBody<T extends AnswerDataType = AnswerDataType> {
  data: T[];
}

export interface GenericAnswer<
  V extends AnswerType = AnswerType,
  T extends AnswerDataType = AnswerDataType,
> {
  id: string;
  questionId: string;
  type: V;
  decryptedBody: AnswerBody<T>;
  nextSessionId: Nullable<string>;
}

export type SingleAnswer = GenericAnswer<
  AnswerType.SINGLE,
  IndexedVariableAnswerData<string>
>;

export type MultiAnswer = GenericAnswer<
  AnswerType.MULTIPLE,
  IndexedVariableAnswerData<string>
>;

export type FreeResponseAnswer = GenericAnswer<
  AnswerType.FREE_RESPONSE,
  VariableAnswerData<string>
>;

export type DateAnswer = GenericAnswer<
  AnswerType.DATE,
  VariableAnswerData<string>
>;

export type NameAnswer = GenericAnswer<
  AnswerType.NAME,
  VariableAnswerData<NameAnswerValue>
>;

export type CurrencyAnswer = GenericAnswer<
  AnswerType.CURRENCY,
  VariableAnswerData<string>
>;

export type NumberAnswer = GenericAnswer<
  AnswerType.NUMBER,
  VariableAnswerData<string | number>
>;

export type GridAnswer = GenericAnswer<AnswerType.GRID, GridAnswerData>;

export type SliderAnswer = GenericAnswer<
  AnswerType.SLIDER,
  VariableAnswerData<number>
>;

export type InformationAnswer = GenericAnswer<
  AnswerType.INFORMATION,
  VariableAnswerData<''>
>;

export type ExternalLinkAnswer = GenericAnswer<
  AnswerType.EXTERNAL_LINK,
  VariableAnswerData<boolean>
>;

export type FeedbackAnswer = GenericAnswer<
  AnswerType.FEEDBACK,
  VariableAnswerData<''>
>;

export type ParticipantReportAnswer = GenericAnswer<
  AnswerType.PARTICIPANT_REPORT,
  VariableAnswerData<ParticipantReportAnswerValue | ''>
>;

export type ThirdPartyReportAnswer = GenericAnswer<
  AnswerType.THIRD_PARTY,
  ThirdPartyReportAnswerData | VariableAnswerData<''>
>;

export type PhoneAnswer = GenericAnswer<
  AnswerType.PHONE,
  VariableAnswerData<PhoneAnswerValue | ''>
>;

export type HenryFordQuestionAnswer = GenericAnswer<
  AnswerType.HENRY_FORD,
  HenryFordQuestionAnswerData
>;

export type FileUploadAnswer = GenericAnswer<
  AnswerType.FILE_UPLOAD,
  VariableAnswerData<string[] | ''>
>;

export type Answer =
  | SingleAnswer
  | MultiAnswer
  | FreeResponseAnswer
  | DateAnswer
  | NameAnswer
  | CurrencyAnswer
  | NumberAnswer
  | GridAnswer
  | SliderAnswer
  | InformationAnswer
  | ExternalLinkAnswer
  | FeedbackAnswer
  | ParticipantReportAnswer
  | ThirdPartyReportAnswer
  | PhoneAnswer
  | HenryFordQuestionAnswer
  | FileUploadAnswer;
