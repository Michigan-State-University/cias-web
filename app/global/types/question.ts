import { QuestionTypes } from 'models/Question/QuestionDto';

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
  type: string;
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

export interface FormulaPatternTarget {
  id: string;
  type: string;
  probability: string;
}

export interface FormulaPattern {
  match: string;
  target: FormulaPatternTarget[];
}

export interface QuestionFormula {
  payload: string;
  patterns: FormulaPattern[];
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

export interface SpectrumPattern {
  match: string;
  target: string;
}

export interface Spectrum {
  payload: string;
  patterns: SpectrumPattern[];
}

export interface QuestionData {
  payload:
    | string
    | GridQuestionPayload
    | SliderQuestionPayload
    | FeedbackQuestionPayload;
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

export interface QuestionBody {
  data: QuestionData[];
  variable?: QuestionVariable;
}

export interface QuestionOriginalText {
  title: string;
  subtitle: string;
  image_description: Nullable<string>;
}

export interface Question {
  id: string;
  type: QuestionTypes;
  question_group_id: string;
  settings: QuestionSettings;
  position: number;
  title: string;
  subtitle: string;
  narrator: Narrator;
  video_url: Nullable<string>;
  formula: QuestionFormula;
  body: QuestionBody;
  original_text: QuestionOriginalText;
  image_url: Nullable<string>;
  image_alt: Nullable<string>;
}
