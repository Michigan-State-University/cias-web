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
  colors.orchid,
);

export const textboxQuestion = new QuestionType(
  'Question::FreeResponse',
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
  'Question::Slider',
  'Slider',
  colors.pink,
);

export const informationQuestion = new QuestionType(
  'Question::Information',
  'Information Only',
  colors.navyBlue,
);

export const urlQuestion = new QuestionType(
  'Question::ExternalLink',
  'External Link',
  colors.jungleGreen,
);

export const feedbackQuestion = new QuestionType(
  'Question::Feedback',
  'Feedback',
  colors.olive,
);

export const finishQuestion = new QuestionType(
  'Question::Finish',
  'Finish',
  colors.brightGreen,
);

export const phoneQuestion = new QuestionType(
  'Question::Phone',
  'Phone',
  colors.flamingo,
);

export const dateQuestion = new QuestionType(
  'Question::Date',
  'Date',
  colors.bluewood,
);

export const questionType = 'Question::';

export const QuestionTypes = [
  singleQuestion,
  multiQuestion,
  textboxQuestion,
  phoneQuestion,
  dateQuestion,
  numberQuestion,
  gridQuestion,
  visualAnalogueScaleQuestion,
  informationQuestion,
  urlQuestion,
  feedbackQuestion,
  finishQuestion,
];
