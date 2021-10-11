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
  SingleQuestionData,
  MultipleQuestionData,
  FreeResponseQuestionData,
  ThirdPartyReportQuestionData,
  NameQuestionData,
  NumberQuestionData,
  GridQuestionData,
  SliderQuestionData,
  InformationOnlyQuestionData,
  ExternalLinkQuestionData,
  FeedbackQuestionData,
  FinishQuestionData,
  PhoneQuestionData,
  DateQuestionData,
  ParticipantReportQuestionData,
  CurrencyQuestionData,
} from './QuestionData';
import {
  QuestionBodyWithoutVariable,
  QuestionBodyType,
  QuestionBodyWithVariable,
} from './QuestionBody';
import { QuestionOriginalText } from './QuestionOriginalText';

export type QuestionFormulaTargetType = QuestionTypes | SessionTargetType;

export interface GenericQuestion<
  VType extends QuestionTypes,
  TBody extends QuestionBodyType,
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
  formula: Formula<QuestionFormulaTargetType>;
  body: TBody;
  originalText: QuestionOriginalText;
  imageUrl: Nullable<string>;
  imageAlt: Nullable<string>;
}

export type SingleQuestion = GenericQuestion<
  QuestionTypes.SINGLE,
  QuestionBodyWithVariable<SingleQuestionData>,
  SingleQuestionSettings
>;
export type SingleQuestionDTO = CamelToSnake<SingleQuestion>;

export type MultipleQuestion = GenericQuestion<
  QuestionTypes.MULTIPLE,
  QuestionBodyWithoutVariable<MultipleQuestionData>,
  MultipleQuestionSettings
>;
export type MultipleQuestionDTO = CamelToSnake<MultipleQuestion>;

export type FreeResponseQuestion = GenericQuestion<
  QuestionTypes.FREE_RESPONSE,
  QuestionBodyWithVariable<FreeResponseQuestionData>,
  FreeResponseQuestionSettings
>;
export type FreeResponseQuestionDTO = CamelToSnake<FreeResponseQuestion>;

export type ThirdPartyReportQuestion = GenericQuestion<
  QuestionTypes.THIRD_PARTY,
  QuestionBodyWithoutVariable<ThirdPartyReportQuestionData>,
  ThirdPartyQuestionSettings
>;
export type ThirdPartyReportQuestionDTO =
  CamelToSnake<ThirdPartyReportQuestion>;

export type NameQuestion = GenericQuestion<
  QuestionTypes.NAME,
  QuestionBodyWithVariable<NameQuestionData>,
  NameQuestionSettings
>;
export type NameQuestionDTO = CamelToSnake<NameQuestion>;

export type NumberQuestion = GenericQuestion<
  QuestionTypes.NUMBER,
  QuestionBodyWithVariable<NumberQuestionData>,
  NumberQuestionSettings
>;
export type NumberQuestionDTO = CamelToSnake<NumberQuestion>;

export type GridQuestion = GenericQuestion<
  QuestionTypes.GRID,
  QuestionBodyWithoutVariable<GridQuestionData>,
  GridQuestionSettings
>;
export type GridQuestionDTO = CamelToSnake<GridQuestion>;

export type SliderQuestion = GenericQuestion<
  QuestionTypes.SLIDER,
  QuestionBodyWithVariable<SliderQuestionData>,
  SliderQuestionSettings
>;
export type SliderQuestionDTO = CamelToSnake<SliderQuestion>;

export type InformationQuestion = GenericQuestion<
  QuestionTypes.INFORMATION,
  QuestionBodyWithoutVariable<InformationOnlyQuestionData>,
  InformationQuestionSettings
>;
export type InformationQuestionDTO = CamelToSnake<InformationQuestion>;

export type ExternalLinkQuestion = GenericQuestion<
  QuestionTypes.EXTERNAL_LINK,
  QuestionBodyWithVariable<ExternalLinkQuestionData>,
  ExternalLinkQuestionSettings
>;
export type ExternalLinkQuestionDTO = CamelToSnake<ExternalLinkQuestion>;

export type FeedbackQuestion = GenericQuestion<
  QuestionTypes.FEEDBACK,
  QuestionBodyWithoutVariable<FeedbackQuestionData>,
  FeedbackQuestionSettings
>;
export type FeedbackQuestionDTO = CamelToSnake<FeedbackQuestion>;

export type FinishQuestion = GenericQuestion<
  QuestionTypes.FINISH,
  QuestionBodyWithoutVariable<FinishQuestionData>,
  FinishQuestionSettings
>;
export type FinishQuestionDTO = CamelToSnake<FinishQuestion>;

export type PhoneQuestion = GenericQuestion<
  QuestionTypes.PHONE,
  QuestionBodyWithVariable<PhoneQuestionData>,
  PhoneQuestionSettings
>;
export type PhoneQuestionDTO = CamelToSnake<PhoneQuestion>;

export type DateQuestion = GenericQuestion<
  QuestionTypes.DATE,
  QuestionBodyWithVariable<DateQuestionData>,
  DateQuestionSettings
>;
export type DateQuestionDTO = CamelToSnake<DateQuestion>;

export type ParticipantReportQuestion = GenericQuestion<
  QuestionTypes.PARTICIPANT_REPORT,
  QuestionBodyWithVariable<ParticipantReportQuestionData>,
  ParticipantReportQuestionSettings
>;
export type ParticipantReportQuestionDTO =
  CamelToSnake<ParticipantReportQuestion>;

export type CurrencyQuestion = GenericQuestion<
  QuestionTypes.CURRENCY,
  QuestionBodyWithVariable<CurrencyQuestionData>,
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
