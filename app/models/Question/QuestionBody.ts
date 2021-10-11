import { QuestionDataType } from './QuestionData';

export interface QuestionBodyVariable {
  name: string;
}

export interface QuestionBodyWithoutVariable<
  TQuestionData extends QuestionDataType = QuestionDataType,
> {
  data: TQuestionData[];
}

export interface QuestionBodyWithVariable<
  TQuestionData extends QuestionDataType = QuestionDataType,
> {
  data: TQuestionData[];
  variable: QuestionBodyVariable;
}

export type QuestionBodyType =
  | QuestionBodyWithoutVariable
  | QuestionBodyWithVariable;
