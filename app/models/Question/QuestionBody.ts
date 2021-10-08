import { CamelToSnake } from 'global/types/camelToSnake';

import {
  FeedbackQuestionPayload,
  GridQuestionPayload,
  PayloadType,
  SliderQuestionPayload,
} from './QuestionPayload';

export interface SpectrumPattern {
  match: string;
  target: string;
}

export interface Spectrum {
  payload: string;
  patterns: SpectrumPattern[];
}

export interface QuestionDataVariable {
  name: string;
  value: string;
}

export interface QuestionData<T extends PayloadType = PayloadType> {
  payload: T;
  variable?: QuestionDataVariable;
  value?: string;
  originalText?: string;
}

export interface SingleQuestionData extends QuestionData<string> {
  value: string;
  originalText?: string;
}

export interface MultipleQuestionData extends QuestionData<string> {
  variable: QuestionDataVariable;
  originalText?: string;
}

export interface FreeResponseQuestionData extends QuestionData<string> {}

export interface ThirdPartyReportQuestionData extends QuestionData<string> {
  value: string;
  reportTemplateIds: string[];
  originalText?: string;
}
export type ThirdPartyReportQuestionDataDTO =
  CamelToSnake<ThirdPartyReportQuestionData>;

export interface NameQuestionData extends QuestionData<string> {}

export interface NumberQuestionData extends QuestionData<string> {}

export interface GridQuestionData extends QuestionData<GridQuestionPayload> {}

export interface SliderQuestionData
  extends QuestionData<SliderQuestionPayload> {}

export interface InformationOnlyQuestionData extends QuestionData<never> {}

export interface ExternalLinkQuestionData extends QuestionData<string> {}

export interface FeedbackQuestionData
  extends QuestionData<FeedbackQuestionPayload> {
  spectrum: Spectrum;
}

export type QuestionDataType =
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
  | FeedbackQuestionData;

export type QuestionDataDTO<T extends PayloadType = PayloadType> = CamelToSnake<
  QuestionData<T>
>;

export interface QuestionBodyVariable {
  name: string;
}

export interface QuestionBody<T extends PayloadType = PayloadType> {
  data: QuestionData<T>[];
}

export interface QuestionBodyWithVariable<T extends PayloadType = PayloadType>
  extends QuestionBody<T> {
  variable: QuestionBodyVariable;
}

export type QuestionBodyType<T extends PayloadType = PayloadType> =
  | QuestionBody<T>
  | QuestionBodyWithVariable<T>;
