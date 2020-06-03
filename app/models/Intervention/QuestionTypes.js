import { colors } from 'theme/colors';
import QuestionType from './QuestionType';

export const singleQuestion = new QuestionType(
  'Question::Single',
  'Single answer question',
  colors.azure,
);

export const multiQuestion = new QuestionType(
  'Question::Multiple',
  'Multi answer question',
  colors.lavender,
);

export const textboxQuestion = new QuestionType(
  'Question::TextBox',
  'Textbox question',
  colors.tangerine,
);

export const numberQuestion = new QuestionType(
  'Question::Number',
  'Number question',
  colors.golden,
);

export const QuestionTypes = [
  singleQuestion,
  multiQuestion,
  textboxQuestion,
  numberQuestion,
];
