import { CamelToSnake } from 'global/types/camelToSnake';

import {
  FeedbackQuestionPayload,
  GridQuestionPayload,
  QuestionPayload,
  SliderQuestionPayload,
  TlfbEventsPayload,
} from './QuestionPayload';

export interface FeedbackSpectrumPattern {
  match: string;
  target: string;
}

export interface FeedbackSpectrum {
  payload: string;
  patterns: FeedbackSpectrumPattern[];
}

export interface QuestionDataVariable {
  name: string;
  value: string;
}

export interface QuestionPayloadData<TPayload extends QuestionPayload> {
  payload: TPayload;
}

export interface SingleQuestionData extends QuestionPayloadData<string> {
  value: string;
  originalText?: string;
}

export interface MultipleQuestionData extends QuestionPayloadData<string> {
  variable: QuestionDataVariable;
  originalText?: string;
}

export interface FreeResponseQuestionData extends QuestionPayloadData<string> {}

export interface ThirdPartyReportQuestionData
  extends QuestionPayloadData<string> {
  value: string;
  reportTemplateIds: string[];
  originalText?: string;
}

export type ThirdPartyReportQuestionDataDTO =
  CamelToSnake<ThirdPartyReportQuestionData>;

export interface NameQuestionData extends QuestionPayloadData<string> {}

export interface NumberQuestionData extends QuestionPayloadData<string> {}

export interface GridQuestionData
  extends QuestionPayloadData<GridQuestionPayload> {}

export interface SliderQuestionData
  extends QuestionPayloadData<SliderQuestionPayload> {}

export type InformationOnlyQuestionData = never;

export interface ExternalLinkQuestionData extends QuestionPayloadData<string> {}

export interface FeedbackQuestionData
  extends QuestionPayloadData<FeedbackQuestionPayload> {
  spectrum: FeedbackSpectrum;
}

export type FinishQuestionData = never;

export interface PhoneQuestionData extends QuestionPayloadData<string> {}

export interface DateQuestionData extends QuestionPayloadData<string> {}

export interface ParticipantReportQuestionData
  extends QuestionPayloadData<string> {}

export interface CurrencyQuestionData extends QuestionPayloadData<string> {}

export interface TlfbConfigData extends QuestionPayloadData<string> {}

export interface TlfbEventsData
  extends QuestionPayloadData<TlfbEventsPayload> {}

export type TlfbQuestionData = never;

export type QuestionData =
  | SingleQuestionData
  | MultipleQuestionData
  | FreeResponseQuestionData
  | ThirdPartyReportQuestionData
  | NameQuestionData
  | NumberQuestionData
  | GridQuestionData
  | SliderQuestionData
  | InformationOnlyQuestionData
  | ExternalLinkQuestionData
  | FeedbackQuestionData
  | FinishQuestionData
  | PhoneQuestionData
  | DateQuestionData
  | ParticipantReportQuestionData
  | CurrencyQuestionData
  | TlfbConfigData
  | TlfbEventsData
  | TlfbQuestionData;
