import { colors } from 'theme';
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

export const gridQuestion = new QuestionType(
  'Question::Grid',
  'Grid question',
  colors.pink,
);

export const visualAnalogueScaleQuestion = new QuestionType(
  'Question::AnalogueScale',
  'Visual Analogue Scale',
  colors.pink,
);

export const informationQuestion = new QuestionType(
  'Question::Information',
  'Information',
  colors.blueHaze,
);

export const urlQuestion = new QuestionType(
  'Question::Url',
  'Url',
  colors.jungleGreen,
);

export const QuestionTypes = [
  singleQuestion,
  multiQuestion,
  textboxQuestion,
  numberQuestion,
  gridQuestion,
  visualAnalogueScaleQuestion,
  informationQuestion,
  urlQuestion,
];
