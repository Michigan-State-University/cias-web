import { colors } from 'theme';

import QuestionType from './QuestionType';

export const questionType = 'Question::';

export const singleQuestion = new QuestionType(
  `${questionType}Single`,
  'Single answer',
  colors.azure,
);

export const multiQuestion = new QuestionType(
  `${questionType}Multiple`,
  'Multi answer',
  colors.electricPurple,
);

export const textboxQuestion = new QuestionType(
  `${questionType}FreeResponse`,
  'Free Response',
  colors.tangerine,
);

export const thirdPartyQuestion = new QuestionType(
  `${questionType}ThirdParty`,
  'Third Party',
  colors.pistachio,
);

export const nameQuestion = new QuestionType(
  `${questionType}Name`,
  'Name',
  colors.aqua,
  '.:name:.',
);

export const numberQuestion = new QuestionType(
  `${questionType}Number`,
  'Number',
  colors.golden,
);

export const gridQuestion = new QuestionType(
  `${questionType}Grid`,
  'Grid',
  colors.pink,
);

export const visualAnalogueScaleQuestion = new QuestionType(
  `${questionType}Slider`,
  'Slider',
  colors.pink,
);

export const informationQuestion = new QuestionType(
  `${questionType}Information`,
  'Information Only',
  colors.navyBlue,
);

export const urlQuestion = new QuestionType(
  `${questionType}ExternalLink`,
  'External Link',
  colors.jungleGreen,
);

export const feedbackQuestion = new QuestionType(
  `${questionType}Feedback`,
  'Feedback',
  colors.olive,
);

export const finishQuestion = new QuestionType(
  `${questionType}Finish`,
  'Finish',
  colors.brightGreen,
);

export const phoneQuestion = new QuestionType(
  `${questionType}Phone`,
  'Phone',
  colors.vermilion,
);

export const dateQuestion = new QuestionType(
  `${questionType}Date`,
  'Date',
  colors.bluewood,
);

export const participantReport = new QuestionType(
  `${questionType}ParticipantReport`,
  'ParticipantReport',
  colors.electricViolet,
);

export const currencyQuestion = new QuestionType(
  `${questionType}Currency`,
  'Currency',
  colors.olive,
);

export const tlfbConfig = new QuestionType(
  `${questionType}TlfbConfig`,
  'TLFB Config',
  colors.asparagus,
);

export const tlfbEvents = new QuestionType(
  `${questionType}TlfbEvents`,
  'TLFB Events',
  colors.asparagus,
);

export const tlfbQuestion = new QuestionType(
  `${questionType}TlfbQuestion`,
  'TLFB Question',
  colors.asparagus,
);

export const henryFordInitialScreen = new QuestionType(
  `${questionType}HenryFordInitial`,
  'Henry Ford Initial Screen',
  colors.kleinBlue,
);

export const QuestionTypes = [
  singleQuestion,
  multiQuestion,
  textboxQuestion,
  dateQuestion,
  nameQuestion,
  currencyQuestion,
  numberQuestion,
  gridQuestion,
  visualAnalogueScaleQuestion,
  informationQuestion,
  urlQuestion,
  feedbackQuestion,
  finishQuestion,
  participantReport,
  thirdPartyQuestion,
  phoneQuestion,
  tlfbQuestion,
  tlfbConfig,
  tlfbEvents,
  henryFordInitialScreen,
];

const notAddableQuestionTypes = [
  finishQuestion.id,
  tlfbConfig.id,
  tlfbEvents.id,
  tlfbQuestion.id,
];

export const AddableQuestionTypes = QuestionTypes.filter(
  ({ id }) => !notAddableQuestionTypes.includes(id),
);
