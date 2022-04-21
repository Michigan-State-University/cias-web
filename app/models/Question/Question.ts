import { CamelToSnake } from 'global/types/camelToSnake';

import { SessionTargetType } from 'models/Session';
import { Formula } from 'models/Formula';
import { Narrator } from 'models/Narrator';

import { QuestionTypes } from './QuestionTypes';
import {
  CurrencyQuestionSettings,
  DateQuestionSettings,
  ExternalLinkQuestionSettings,
  FeedbackQuestionSettings,
  FinishQuestionSettings,
  FreeResponseQuestionSettings,
  GridQuestionSettings,
  InformationQuestionSettings,
  MultipleQuestionSettings,
  NameQuestionSettings,
  NumberQuestionSettings,
  ParticipantReportQuestionSettings,
  PhoneQuestionSettings,
  QuestionSettings,
  SingleQuestionSettings,
  SliderQuestionSettings,
  ThirdPartyQuestionSettings,
} from './QuestionSettings';
import {
  QuestionBody,
  SingleQuestionBody,
  MultipleQuestionBody,
  FreeResponseQuestionBody,
  ThirdPartyReportQuestionBody,
  NumberQuestionBody,
  NameQuestionBody,
  GridQuestionBody,
  SliderQuestionBody,
  InformationQuestionBody,
  ExternalLinkQuestionBody,
  FeedbackQuestionBody,
  FinishQuestionBody,
  PhoneQuestionBody,
  DateQuestionBody,
  ParticipantReportQuestionBody,
  CurrencyQuestionBody,
} from './QuestionBody';
import { QuestionOriginalText } from './QuestionOriginalText';

export type QuestionFormulaTargetType = QuestionTypes | SessionTargetType;

export interface GenericQuestion<
  VType extends QuestionTypes,
  TBody extends QuestionBody,
  TSettings extends QuestionSettings,
> {
  id: string;
  type: VType;
  questionGroupId: string;
  settings: TSettings;
  position: number;
  title: string;
  subtitle: string;
  narrator: Narrator;
  videoUrl: Nullable<string>;
  formulas: Array<Formula<QuestionFormulaTargetType>>;
  body: TBody;
  originalText: QuestionOriginalText;
  imageUrl: Nullable<string>;
  imageAlt: Nullable<string>;
}

export type SingleQuestion = GenericQuestion<
  QuestionTypes.SINGLE,
  SingleQuestionBody,
  SingleQuestionSettings
>;
export type SingleQuestionDTO = CamelToSnake<SingleQuestion>;

export type MultipleQuestion = GenericQuestion<
  QuestionTypes.MULTIPLE,
  MultipleQuestionBody,
  MultipleQuestionSettings
>;
export type MultipleQuestionDTO = CamelToSnake<MultipleQuestion>;

export type FreeResponseQuestion = GenericQuestion<
  QuestionTypes.FREE_RESPONSE,
  FreeResponseQuestionBody,
  FreeResponseQuestionSettings
>;
export type FreeResponseQuestionDTO = CamelToSnake<FreeResponseQuestion>;

export type ThirdPartyReportQuestion = GenericQuestion<
  QuestionTypes.THIRD_PARTY,
  ThirdPartyReportQuestionBody,
  ThirdPartyQuestionSettings
>;
export type ThirdPartyReportQuestionDTO =
  CamelToSnake<ThirdPartyReportQuestion>;

export type NameQuestion = GenericQuestion<
  QuestionTypes.NAME,
  NameQuestionBody,
  NameQuestionSettings
>;
export type NameQuestionDTO = CamelToSnake<NameQuestion>;

export type NumberQuestion = GenericQuestion<
  QuestionTypes.NUMBER,
  NumberQuestionBody,
  NumberQuestionSettings
>;
export type NumberQuestionDTO = CamelToSnake<NumberQuestion>;

export type GridQuestion = GenericQuestion<
  QuestionTypes.GRID,
  GridQuestionBody,
  GridQuestionSettings
>;
export type GridQuestionDTO = CamelToSnake<GridQuestion>;

export type SliderQuestion = GenericQuestion<
  QuestionTypes.SLIDER,
  SliderQuestionBody,
  SliderQuestionSettings
>;
export type SliderQuestionDTO = CamelToSnake<SliderQuestion>;

export type InformationQuestion = GenericQuestion<
  QuestionTypes.INFORMATION,
  InformationQuestionBody,
  InformationQuestionSettings
>;
export type InformationQuestionDTO = CamelToSnake<InformationQuestion>;

export type ExternalLinkQuestion = GenericQuestion<
  QuestionTypes.EXTERNAL_LINK,
  ExternalLinkQuestionBody,
  ExternalLinkQuestionSettings
>;
export type ExternalLinkQuestionDTO = CamelToSnake<ExternalLinkQuestion>;

export type FeedbackQuestion = GenericQuestion<
  QuestionTypes.FEEDBACK,
  FeedbackQuestionBody,
  FeedbackQuestionSettings
>;
export type FeedbackQuestionDTO = CamelToSnake<FeedbackQuestion>;

export type FinishQuestion = GenericQuestion<
  QuestionTypes.FINISH,
  FinishQuestionBody,
  FinishQuestionSettings
>;
export type FinishQuestionDTO = CamelToSnake<FinishQuestion>;

export type PhoneQuestion = GenericQuestion<
  QuestionTypes.PHONE,
  PhoneQuestionBody,
  PhoneQuestionSettings
>;
export type PhoneQuestionDTO = CamelToSnake<PhoneQuestion>;

export type DateQuestion = GenericQuestion<
  QuestionTypes.DATE,
  DateQuestionBody,
  DateQuestionSettings
>;
export type DateQuestionDTO = CamelToSnake<DateQuestion>;

export type ParticipantReportQuestion = GenericQuestion<
  QuestionTypes.PARTICIPANT_REPORT,
  ParticipantReportQuestionBody,
  ParticipantReportQuestionSettings
>;
export type ParticipantReportQuestionDTO =
  CamelToSnake<ParticipantReportQuestion>;

export type CurrencyQuestion = GenericQuestion<
  QuestionTypes.CURRENCY,
  CurrencyQuestionBody,
  CurrencyQuestionSettings
>;
export type CurrencyQuestionDTO = CamelToSnake<CurrencyQuestion>;

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
export type QuestionDTO = CamelToSnake<Question>;
