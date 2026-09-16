import { CamelToSnake } from 'global/types/camelToSnake';

import {
  FeedbackQuestionPayload,
  GridQuestionPayload,
  QuestionPayload,
  SliderQuestionPayload,
  TlfbEventsPayload,
  TlfbConfigPayload,
  TlfbQuestionPayload,
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
  original_text?: TPayload;
}

export interface SingleQuestionData extends QuestionPayloadData<string> {
  id?: string;
  value: string;
  imageId?: string;
  originalText?: string;
}

export interface MultipleQuestionData extends QuestionPayloadData<string> {
  id?: string;
  variable: QuestionDataVariable;
  imageId?: string;
  originalText?: string;
}

export interface FreeResponseQuestionData extends QuestionPayloadData<string> {}

export interface ThirdPartyReportQuestionData extends QuestionPayloadData<string> {
  value: string;
  reportTemplateIds: string[];
  numericValue: string;
  imageId?: string;
  originalText?: string;
}

export type ThirdPartyReportQuestionDataDTO =
  CamelToSnake<ThirdPartyReportQuestionData>;

export interface NameQuestionData extends QuestionPayloadData<string> {}

export interface NumberQuestionData extends QuestionPayloadData<string> {}

export interface GridQuestionData extends QuestionPayloadData<GridQuestionPayload> {}

export interface SliderQuestionData extends QuestionPayloadData<SliderQuestionPayload> {}

export type InformationOnlyQuestionData = never;

export interface ExternalLinkQuestionData extends QuestionPayloadData<string> {}

export interface FeedbackQuestionData extends QuestionPayloadData<FeedbackQuestionPayload> {
  spectrum: FeedbackSpectrum;
}

export type FinishQuestionData = never;

export interface PhoneQuestionData extends QuestionPayloadData<string> {}

export interface DateQuestionData extends QuestionPayloadData<string> {}

export interface ParticipantReportQuestionData extends QuestionPayloadData<string> {}

export interface CurrencyQuestionData extends QuestionPayloadData<string> {}

export interface TlfbConfigData extends QuestionPayloadData<TlfbConfigPayload> {}

export interface TlfbEventsData extends QuestionPayloadData<TlfbEventsPayload> {}

export interface TlfbQuestionData extends QuestionPayloadData<TlfbQuestionPayload> {}

export interface HenryFordQuestionData extends SingleQuestionData {
  hfhValue: string;
}
export type HenryFordInitialScreenData = never;

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
  | TlfbQuestionData
  | HenryFordQuestionData
  | HenryFordInitialScreenData;
