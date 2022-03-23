export interface GridQuestionRow {
  payload: string;
  variable: { name: string };
  originalText?: string;
}

export interface GridQuestionColumn {
  payload: string;
  variable: { value: string };
  originalText?: string;
}

export interface GridQuestionPayload {
  rows: GridQuestionRow[];
  columns: GridQuestionColumn[];
}

export interface StartEndValueOriginalText {
  startValue?: string;
  endValue?: string;
}

export interface SliderQuestionPayload {
  startValue: string;
  endValue: string;
  originalText?: StartEndValueOriginalText;
}

export interface FeedbackQuestionPayload {
  startValue: string;
  endValue: string;
  targetValue: string;
  originalText?: StartEndValueOriginalText;
}

export interface TlfbEventsPayload {
  screenTitle: string;
  screenQuestion: string;
}

export type Substance = {
  name: string;
  unit?: string;
  variable: string;
};

export type SubstanceGroup = {
  name: string;
  substances: Substance[];
};

export interface TlfbQuestionPayload {
  questionTitle: string;
  headQuestion: string;
  substanceQuestion: string;
  substancesWithGroup: boolean;
  substances: Substance[];
  substanceGroups: SubstanceGroup[];
}

export interface TlfbConfigPayload {
  daysCount: string;
  chooseDateRange: boolean;
}

export type QuestionPayload =
  | string
  | GridQuestionPayload
  | SliderQuestionPayload
  | FeedbackQuestionPayload
  | TlfbEventsPayload
  | TlfbConfigPayload
  | TlfbQuestionPayload;
