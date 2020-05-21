import { colors } from 'theme/colors';
import QuestionType from './QuestionType';

export const singleQuestion = new QuestionType(
  'Single',
  'Single answer question',
  colors.azure,
);

export const multiQuestion = new QuestionType(
  'Multiple',
  'Multi answer question',
  colors.lavender,
);

export const QuestionTypes = [singleQuestion, multiQuestion];
