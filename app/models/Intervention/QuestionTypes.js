import { colors } from 'theme';
import QuestionType from './QuestionType';

export const singleQuestion = new QuestionType(
  'Question::Single',
  'Single answer',
  colors.azure,
);

export const multiQuestion = new QuestionType(
  'Question::Multiple',
  'Multi answer',
  colors.lavender,
);

export const textboxQuestion = new QuestionType(
  'Question::TextBox',
  'Free Response',
  colors.tangerine,
);

export const numberQuestion = new QuestionType(
  'Question::Number',
  'Number',
  colors.golden,
);

export const gridQuestion = new QuestionType(
  'Question::Grid',
  'Grid',
  colors.pink,
);

export const visualAnalogueScaleQuestion = new QuestionType(
  'Question::AnalogueScale',
  'Slider',
  colors.pink,
);

export const informationQuestion = new QuestionType(
  'Question::Information',
  'Information Only',
  colors.navyBlue,
);

export const urlQuestion = new QuestionType(
  'Question::Url',
  'External Link',
  colors.jungleGreen,
);

export const feedbackQuestion = new QuestionType(
  'Question::Feedback',
  'Feedback',
  colors.olive,
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
  feedbackQuestion,
];
