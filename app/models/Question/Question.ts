import { SessionTargetType } from 'models/Session/SessionTargetType';
import { Formula } from 'models/Formula';
import { Narrator } from 'models/Narrator';

import { QuestionTypes } from './QuestionTypes';

export interface QuestionSettings {
  image: boolean;
  title: boolean;
  video: boolean;
  required?: boolean;
  subtitle: boolean;
  text_limit?: number;
  narrator_skippable: boolean;
  proceed_button?: boolean;
  show_number?: boolean;
}

export interface GridQuestionRow {
  payload: string;
  variable: { name: string };
  original_text?: string;
}

export interface GridQuestionColumn {
  payload: string;
  variable: { value: string };
  original_text?: string;
}

export interface GridQuestionPayload {
  rows: GridQuestionRow[];
  columns: GridQuestionColumn[];
}

export interface StartEndValueOriginalText {
  start_value: string;
  end_value: string;
}

export interface SliderQuestionPayload {
  start_value: string;
  end_value: string;
  original_text?: StartEndValueOriginalText;
}

export interface FeedbackQuestionPayload {
  start_value: string;
  end_value: string;
  target_value: string;
  original_text?: StartEndValueOriginalText;
}

export type PayloadType =
  | string
  | GridQuestionPayload
  | SliderQuestionPayload
  | FeedbackQuestionPayload;

export interface SpectrumPattern {
  match: string;
  target: string;
}

export interface Spectrum {
  payload: string;
  patterns: SpectrumPattern[];
}

export interface QuestionData<T> {
  payload: T;
  variable?: QuestionVariable;
  value?: string;
  spectrum?: Spectrum;
  report_template_ids?: string[];
  original_text?: string;
}

export interface QuestionVariable {
  name: string;
  value?: string;
}

export interface QuestionBodyWithoutVariable<
  T extends PayloadType = PayloadType,
> {
  data: QuestionData<T>[];
}

export interface QuestionBodyWithVariable<T extends PayloadType = PayloadType>
  extends QuestionBodyWithoutVariable<T> {
  variable: QuestionVariable;
}

export type QuestionBody<T extends PayloadType = PayloadType> =
  | QuestionBodyWithoutVariable<T>
  | QuestionBodyWithVariable<T>;

export interface QuestionOriginalText {
  title: string;
  subtitle: string;
  image_description: Nullable<string>;
}

export type QuestionFormulaTargetType = QuestionTypes | SessionTargetType;

export interface GenericQuestion<
  VType extends QuestionTypes = QuestionTypes,
  TBody extends QuestionBody = QuestionBody,
> {
  id: string;
  type: VType;
  question_group_id: string;
  settings: QuestionSettings;
  position: number;
  title: string;
  subtitle: string;
  narrator: Narrator;
  video_url: Nullable<string>;
  formula: Formula<QuestionFormulaTargetType>;
  body: TBody;
  original_text: QuestionOriginalText;
  image_url: Nullable<string>;
  image_alt: Nullable<string>;
}

export type SingleQuestion = GenericQuestion<
  QuestionTypes.SINGLE,
  QuestionBodyWithVariable<string>
>;

export type MultipleQuestion = GenericQuestion<
  QuestionTypes.MULTIPLE,
  QuestionBodyWithoutVariable<string>
>;

export type FreeResponseQuestion = GenericQuestion<
  QuestionTypes.FREE_RESPONSE,
  QuestionBodyWithVariable<string>
>;

export type ThirdPartyReportQuestion = GenericQuestion<
  QuestionTypes.THIRD_PARTY,
  QuestionBodyWithoutVariable<string>
>;

export type NameQuestion = GenericQuestion<
  QuestionTypes.NAME,
  QuestionBodyWithVariable<string>
>;

export type NumberQuestion = GenericQuestion<
  QuestionTypes.NUMBER,
  QuestionBodyWithVariable<string>
>;

export type GridQuestion = GenericQuestion<
  QuestionTypes.GRID,
  QuestionBodyWithoutVariable<GridQuestionPayload>
>;

export type SliderQuestion = GenericQuestion<
  QuestionTypes.SLIDER,
  QuestionBodyWithVariable<SliderQuestionPayload>
>;

export type InformationQuestion = GenericQuestion<
  QuestionTypes.INFORMATION,
  QuestionBodyWithoutVariable<string>
>;

export type ExternalLinkQuestion = GenericQuestion<
  QuestionTypes.EXTERNAL_LINK,
  QuestionBodyWithVariable<string>
>;

export type FeedbackQuestion = GenericQuestion<
  QuestionTypes.FEEDBACK,
  QuestionBodyWithoutVariable<FeedbackQuestionPayload>
>;

export type FinishQuestion = GenericQuestion<
  QuestionTypes.FINISH,
  QuestionBodyWithoutVariable<string>
>;

export type PhoneQuestion = GenericQuestion<
  QuestionTypes.PHONE,
  QuestionBodyWithVariable<string>
>;

export type DateQuestion = GenericQuestion<
  QuestionTypes.DATE,
  QuestionBodyWithVariable<string>
>;

export type ParticipantReportQuestion = GenericQuestion<
  QuestionTypes.PARTICIPANT_REPORT,
  QuestionBodyWithVariable<string>
>;

export type CurrencyQuestion = GenericQuestion<
  QuestionTypes.CURRENCY,
  QuestionBodyWithVariable<string>
>;

export type Question =
  | SingleQuestion
  | MultipleQuestion
  | FreeResponseQuestion
  | ThirdPartyReportQuestion
  | NameQuestion
  | NumberQuestion
  | GridQuestion
  | SliderQuestion
  | InformationQuestion
  | ExternalLinkQuestion
  | FeedbackQuestion
  | FinishQuestion
  | PhoneQuestion
  | DateQuestion
  | ParticipantReportQuestion
  | CurrencyQuestion;
