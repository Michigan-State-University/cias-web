import { CamelToSnake } from 'global/types/camelToSnake';

import { SessionTargetType } from 'models/Session';
import { Formula } from 'models/Formula';
import { Narrator } from 'models/Narrator';

import { QuestionTypes } from './QuestionTypes';
import { QuestionSettings } from './QuestionSettings';
import {
  FeedbackQuestionPayload,
  GridQuestionPayload,
  SliderQuestionPayload,
} from './QuestionPayload';
import {
  QuestionBody,
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
  QuestionBodyWithVariable<string>
>;
export type SingleQuestionDTO = CamelToSnake<SingleQuestion>;

export type MultipleQuestion = GenericQuestion<
  QuestionTypes.MULTIPLE,
  QuestionBody<string>
>;
export type MultipleQuestionDTO = CamelToSnake<MultipleQuestion>;

export type FreeResponseQuestion = GenericQuestion<
  QuestionTypes.FREE_RESPONSE,
  QuestionBodyWithVariable<string>
>;
export type FreeResponseQuestionDTO = CamelToSnake<FreeResponseQuestion>;

export type ThirdPartyReportQuestion = GenericQuestion<
  QuestionTypes.THIRD_PARTY,
  QuestionBody<string>
>;
export type ThirdPartyReportQuestionDTO =
  CamelToSnake<ThirdPartyReportQuestion>;

export type NameQuestion = GenericQuestion<
  QuestionTypes.NAME,
  QuestionBodyWithVariable<string>
>;
export type NameQuestionDTO = CamelToSnake<NameQuestion>;

export type NumberQuestion = GenericQuestion<
  QuestionTypes.NUMBER,
  QuestionBodyWithVariable<string>
>;
export type NumberQuestionDTO = CamelToSnake<NumberQuestion>;

export type GridQuestion = GenericQuestion<
  QuestionTypes.GRID,
  QuestionBody<GridQuestionPayload>
>;
export type GridQuestionDTO = CamelToSnake<GridQuestion>;

export type SliderQuestion = GenericQuestion<
  QuestionTypes.SLIDER,
  QuestionBodyWithVariable<SliderQuestionPayload>
>;
export type SliderQuestionDTO = CamelToSnake<SliderQuestion>;

export type InformationQuestion = GenericQuestion<
  QuestionTypes.INFORMATION,
  QuestionBody<string>
>;
export type InformationQuestionDTO = CamelToSnake<InformationQuestion>;

export type ExternalLinkQuestion = GenericQuestion<
  QuestionTypes.EXTERNAL_LINK,
  QuestionBodyWithVariable<string>
>;
export type ExternalLinkQuestionDTO = CamelToSnake<ExternalLinkQuestion>;

export type FeedbackQuestion = GenericQuestion<
  QuestionTypes.FEEDBACK,
  QuestionBody<FeedbackQuestionPayload>
>;
export type FeedbackQuestionDTO = CamelToSnake<FeedbackQuestion>;

export type FinishQuestion = GenericQuestion<
  QuestionTypes.FINISH,
  QuestionBody<string>
>;
export type FinishQuestionDTO = CamelToSnake<FinishQuestion>;

export type PhoneQuestion = GenericQuestion<
  QuestionTypes.PHONE,
  QuestionBodyWithVariable<string>
>;
export type PhoneQuestionDTO = CamelToSnake<PhoneQuestion>;

export type DateQuestion = GenericQuestion<
  QuestionTypes.DATE,
  QuestionBodyWithVariable<string>
>;
export type DateQuestionDTO = CamelToSnake<DateQuestion>;

export type ParticipantReportQuestion = GenericQuestion<
  QuestionTypes.PARTICIPANT_REPORT,
  QuestionBodyWithVariable<string>
>;
export type ParticipantReportQuestionDTO =
  CamelToSnake<ParticipantReportQuestion>;

export type CurrencyQuestion = GenericQuestion<
  QuestionTypes.CURRENCY,
  QuestionBodyWithVariable<string>
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
