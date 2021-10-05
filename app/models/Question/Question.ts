import { SessionTargetType } from 'models/Session/SessionTargetType';

import { Formula } from '../Formula';

export enum QuestionTypes {
  SINGLE = 'Question::Single',
  MULTIPLE = 'Question::Multiple',
  FREE_RESPONSE = 'Question::FreeResponse',
  THIRD_PARTY = 'Question::ThirdParty',
  NAME = 'Question::Name',
  NUMBER = 'Question::Number',
  GRID = 'Question::Grid',
  SLIDER = 'Question::Slider',
  INFORMATION = 'Question::Information',
  EXTERNAL_LINK = 'Question::ExternalLink',
  FEEDBACK = 'Question::Feedback',
  FINISH = 'Question::Finish',
  PHONE = 'Question::Phone',
  DATE = 'Question::Date',
  PARTICIPANT_REPORT = 'Question::ParticipantReport',
  CURRENCY = 'Question::Currency',
}

export enum BlockTypes {
  BODY_ANIMATION = 'BodyAnimation',
  HEAD_ANIMATION = 'HeadAnimation',
  SPEECH = 'Speech',
  READ_QUESTION = 'ReadQuestion',
  REFLECTION = 'Reflection',
  REFLECTION_FORMULA = 'ReflectionFormula',
  PAUSE = 'Pause',
  FEEDBACK = 'Feedback',
}

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

export interface Position {
  x: number;
  y: number;
}

export interface NarratorBlock {
  text?: Nullable<string[]>;
  type: BlockTypes;
  action?: string;
  sha256?: string[];
  animation: string;
  audio_urls?: string[];
  endPosition: Position;
  pause_duration?: number;
  original_text?: Nullable<string[]>;
}

export interface NarratorSettings {
  voice: boolean;
  animation: boolean;
}

export interface Narrator {
  blocks: NarratorBlock[];
  settings: NarratorSettings;
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

export interface QuestionBody<T> {
  data: QuestionData<T>[];
  variable?: QuestionVariable;
}

export interface QuestionOriginalText {
  title: string;
  subtitle: string;
  image_description: Nullable<string>;
}

export type QuestionFormulaTargetType = QuestionTypes | SessionTargetType;

export interface GenericQuestion<
  V extends QuestionTypes = QuestionTypes,
  T extends PayloadType = PayloadType,
> {
  id: string;
  type: V;
  question_group_id: string;
  settings: QuestionSettings;
  position: number;
  title: string;
  subtitle: string;
  narrator: Narrator;
  video_url: Nullable<string>;
  formula: Formula<QuestionFormulaTargetType>;
  body: QuestionBody<T>;
  original_text: QuestionOriginalText;
  image_url: Nullable<string>;
  image_alt: Nullable<string>;
}

export type SingleQuestion = GenericQuestion<QuestionTypes.SINGLE, string>;

export type MultipleQuestion = GenericQuestion<QuestionTypes.MULTIPLE, string>;

export type FreeResponseQuestion = GenericQuestion<
  QuestionTypes.FREE_RESPONSE,
  string
>;

export type ThirdPartyReportQuestion = GenericQuestion<
  QuestionTypes.THIRD_PARTY,
  string
>;

export type NameQuestion = GenericQuestion<QuestionTypes.NAME, string>;

export type NumberQuestion = GenericQuestion<QuestionTypes.NUMBER, string>;

export type GridQuestion = GenericQuestion<
  QuestionTypes.GRID,
  GridQuestionPayload
>;

export type SliderQuestion = GenericQuestion<
  QuestionTypes.SLIDER,
  SliderQuestionPayload
>;

export type InformationQuestion = GenericQuestion<
  QuestionTypes.INFORMATION,
  string
>;

export type ExternalLinkQuestion = GenericQuestion<
  QuestionTypes.EXTERNAL_LINK,
  string
>;

export type FeedbackQuestion = GenericQuestion<
  QuestionTypes.FEEDBACK,
  FeedbackQuestionPayload
>;

export type FinishQuestion = GenericQuestion<QuestionTypes.FINISH, string>;

export type PhoneQuestion = GenericQuestion<QuestionTypes.PHONE, string>;

export type DateQuestion = GenericQuestion<QuestionTypes.DATE, string>;

export type ParticipantReportQuestion = GenericQuestion<
  QuestionTypes.PARTICIPANT_REPORT,
  string
>;

export type CurrencyQuestion = GenericQuestion<QuestionTypes.CURRENCY, string>;

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
