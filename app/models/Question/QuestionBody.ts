import {
  CurrencyQuestionData,
  DateQuestionData,
  ExternalLinkQuestionData,
  FeedbackQuestionData,
  FinishQuestionData,
  FreeResponseQuestionData,
  GridQuestionData,
  InformationOnlyQuestionData,
  MultipleQuestionData,
  NameQuestionData,
  NumberQuestionData,
  ParticipantReportQuestionData,
  PhoneQuestionData,
  QuestionData,
  SingleQuestionData,
  SliderQuestionData,
  ThirdPartyReportQuestionData,
  TlfbConfigData,
  TlfbEventsData,
  TlfbQuestionData,
} from './QuestionData';

export interface QuestionBodyVariable {
  name: string;
}

export interface QuestionBodyWithoutVariable<
  TQuestionData extends QuestionData,
> {
  data: TQuestionData[];
}

export interface QuestionBodyWithVariable<TQuestionData extends QuestionData> {
  data: TQuestionData[];
  variable: QuestionBodyVariable;
}

export type SingleQuestionBody = QuestionBodyWithVariable<SingleQuestionData>;

export type MultipleQuestionBody =
  QuestionBodyWithoutVariable<MultipleQuestionData>;

export type FreeResponseQuestionBody =
  QuestionBodyWithVariable<FreeResponseQuestionData>;

export type ThirdPartyReportQuestionBody =
  QuestionBodyWithoutVariable<ThirdPartyReportQuestionData>;

export type NameQuestionBody = QuestionBodyWithVariable<NameQuestionData>;

export type NumberQuestionBody = QuestionBodyWithVariable<NumberQuestionData>;

export type GridQuestionBody = QuestionBodyWithoutVariable<GridQuestionData>;

export type SliderQuestionBody = QuestionBodyWithVariable<SliderQuestionData>;

export type InformationQuestionBody =
  QuestionBodyWithoutVariable<InformationOnlyQuestionData>;

export type ExternalLinkQuestionBody =
  QuestionBodyWithVariable<ExternalLinkQuestionData>;

export type FeedbackQuestionBody =
  QuestionBodyWithoutVariable<FeedbackQuestionData>;

export type FinishQuestionBody =
  QuestionBodyWithoutVariable<FinishQuestionData>;

export type PhoneQuestionBody = QuestionBodyWithVariable<PhoneQuestionData>;

export type DateQuestionBody = QuestionBodyWithVariable<DateQuestionData>;

export type ParticipantReportQuestionBody =
  QuestionBodyWithVariable<ParticipantReportQuestionData>;

export type CurrencyQuestionBody =
  QuestionBodyWithVariable<CurrencyQuestionData>;

export type TlfbConfigBody = QuestionBodyWithoutVariable<TlfbConfigData>;

export type TlfbEventsBody = QuestionBodyWithoutVariable<TlfbEventsData>;

export type TlfbEventsBodyWithConfig =
  QuestionBodyWithoutVariable<TlfbEventsData> & { config: TlfbConfigBody };

export type TlfbQuestionBody = QuestionBodyWithoutVariable<TlfbQuestionData>;

export type QuestionBody =
  | SingleQuestionBody
  | MultipleQuestionBody
  | FreeResponseQuestionBody
  | ThirdPartyReportQuestionBody
  | NameQuestionBody
  | NumberQuestionBody
  | GridQuestionBody
  | SliderQuestionBody
  | InformationQuestionBody
  | ExternalLinkQuestionBody
  | FeedbackQuestionBody
  | FinishQuestionBody
  | PhoneQuestionBody
  | DateQuestionBody
  | ParticipantReportQuestionBody
  | CurrencyQuestionBody
  | TlfbConfigBody
  | TlfbEventsBody
  | TlfbQuestionBody
  | TlfbEventsBodyWithConfig;
