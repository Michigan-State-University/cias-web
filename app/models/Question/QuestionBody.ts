import { QuestionData } from './QuestionData';

export interface QuestionBodyVariable {
  name: string;
}

export interface QuestionBodyWithoutVariable<
  TQuestionData extends QuestionData = QuestionData,
> {
  data: TQuestionData[];
}

export interface QuestionBodyWithVariable<
  TQuestionData extends QuestionData = QuestionData,
> {
  data: TQuestionData[];
  variable: QuestionBodyVariable;
}

export type QuestionBodyType =
  | QuestionBodyWithoutVariable
  | QuestionBodyWithVariable;
