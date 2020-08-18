import { colors } from 'theme';

export const bodyAnimationType = 'BodyAnimation';
export const headAnimationType = 'HeadAnimation';
export const speechType = 'Speech';
export const readQuestionBlockType = 'ReadQuestion';
export const reflectionType = 'Reflection';

export const blockTypes = [
  speechType,
  bodyAnimationType,
  headAnimationType,
  readQuestionBlockType,
];

export const blockTypeToColorMap = {
  [bodyAnimationType]: colors.pink,
  [speechType]: colors.azure,
  [reflectionType]: colors.azure,
  [headAnimationType]: colors.golden,
  [readQuestionBlockType]: colors.electricViolet,
};
