import { CamelToSnake } from 'global/types/camelToSnake';

import { SessionTargetType } from 'models/Session';
import { Formula } from 'models/Formula';
import { Narrator } from 'models/Narrator';

import { QuestionTypes } from './QuestionTypes';
import { QuestionSettings } from './QuestionSettings';
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
  VType extends QuestionTypes = QuestionTypes,
  TBody extends QuestionBodyType = QuestionBodyType,
> {
  id: string;
  type: VType;
  questionGroupId: string;
  settings: QuestionSettings;
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
  QuestionBodyWithVariable<SingleQuestionData>
>;
export type SingleQuestionDTO = CamelToSnake<SingleQuestion>;

export type MultipleQuestion = GenericQuestion<
  QuestionTypes.MULTIPLE,
  QuestionBodyWithoutVariable<MultipleQuestionData>
>;
export type MultipleQuestionDTO = CamelToSnake<MultipleQuestion>;

export type FreeResponseQuestion = GenericQuestion<
  QuestionTypes.FREE_RESPONSE,
  QuestionBodyWithVariable<FreeResponseQuestionData>
>;
export type FreeResponseQuestionDTO = CamelToSnake<FreeResponseQuestion>;

export type ThirdPartyReportQuestion = GenericQuestion<
  QuestionTypes.THIRD_PARTY,
  QuestionBodyWithoutVariable<ThirdPartyReportQuestionData>
>;
export type ThirdPartyReportQuestionDTO =
  CamelToSnake<ThirdPartyReportQuestion>;

export type NameQuestion = GenericQuestion<
  QuestionTypes.NAME,
  QuestionBodyWithVariable<NameQuestionData>
>;
export type NameQuestionDTO = CamelToSnake<NameQuestion>;

export type NumberQuestion = GenericQuestion<
  QuestionTypes.NUMBER,
  QuestionBodyWithVariable<NumberQuestionData>
>;
export type NumberQuestionDTO = CamelToSnake<NumberQuestion>;

export type GridQuestion = GenericQuestion<
  QuestionTypes.GRID,
  QuestionBodyWithoutVariable<GridQuestionData>
>;
export type GridQuestionDTO = CamelToSnake<GridQuestion>;

export type SliderQuestion = GenericQuestion<
  QuestionTypes.SLIDER,
  QuestionBodyWithVariable<SliderQuestionData>
>;
export type SliderQuestionDTO = CamelToSnake<SliderQuestion>;

export type InformationQuestion = GenericQuestion<
  QuestionTypes.INFORMATION,
  QuestionBodyWithoutVariable<InformationOnlyQuestionData>
>;
export type InformationQuestionDTO = CamelToSnake<InformationQuestion>;

export type ExternalLinkQuestion = GenericQuestion<
  QuestionTypes.EXTERNAL_LINK,
  QuestionBodyWithVariable<ExternalLinkQuestionData>
>;
export type ExternalLinkQuestionDTO = CamelToSnake<ExternalLinkQuestion>;

export type FeedbackQuestion = GenericQuestion<
  QuestionTypes.FEEDBACK,
  QuestionBodyWithoutVariable<FeedbackQuestionData>
>;
export type FeedbackQuestionDTO = CamelToSnake<FeedbackQuestion>;

export type FinishQuestion = GenericQuestion<
  QuestionTypes.FINISH,
  QuestionBodyWithoutVariable<FinishQuestionData>
>;
export type FinishQuestionDTO = CamelToSnake<FinishQuestion>;

export type PhoneQuestion = GenericQuestion<
  QuestionTypes.PHONE,
  QuestionBodyWithVariable<PhoneQuestionData>
>;
export type PhoneQuestionDTO = CamelToSnake<PhoneQuestion>;

export type DateQuestion = GenericQuestion<
  QuestionTypes.DATE,
  QuestionBodyWithVariable<DateQuestionData>
>;
export type DateQuestionDTO = CamelToSnake<DateQuestion>;

export type ParticipantReportQuestion = GenericQuestion<
  QuestionTypes.PARTICIPANT_REPORT,
  QuestionBodyWithVariable<ParticipantReportQuestionData>
>;
export type ParticipantReportQuestionDTO =
  CamelToSnake<ParticipantReportQuestion>;

export type CurrencyQuestion = GenericQuestion<
  QuestionTypes.CURRENCY,
  QuestionBodyWithVariable<CurrencyQuestionData>
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
