import { PayloadType } from './QuestionPayload';
import { CamelToSnake } from '../../global/types/camelToSnake';

export interface SpectrumPattern {
  match: string;
  target: string;
}

export interface Spectrum {
  payload: string;
  patterns: SpectrumPattern[];
}

export interface QuestionData<T extends PayloadType = PayloadType> {
  payload: T;
  variable?: QuestionVariable;
  value?: string;
  spectrum?: Spectrum;
  reportTemplateIds?: string[];
  originalText?: string;
}

export type QuestionDataDTO<T extends PayloadType = PayloadType> = CamelToSnake<
  QuestionData<T>
>;

export interface QuestionVariable {
  name: string;
  value?: string;
}

export interface QuestionBody<T extends PayloadType = PayloadType> {
  data: QuestionData<T>[];
}

export interface QuestionBodyWithVariable<T extends PayloadType = PayloadType>
  extends QuestionBody<T> {
  variable: QuestionVariable;
}

export type QuestionBodyType<T extends PayloadType = PayloadType> =
  | QuestionBody<T>
  | QuestionBodyWithVariable<T>;
