import { colors } from 'theme';

export const bodyAnimationType = 'BodyAnimation';
export const headAnimationType = 'HeadAnimation';
export const speechType = 'Speech';
export const readQuestionBlockType = 'ReadQuestion';
export const reflectionType = 'Reflection';
export const reflectionFormulaType = 'ReflectionFormula';
export const pauseType = 'Pause';
export const feedbackBlockType = 'Feedback';

export const blockTypes = [
  speechType,
  bodyAnimationType,
  headAnimationType,
  readQuestionBlockType,
  pauseType,
  feedbackBlockType,
];

export const blockTypeToColorMap = {
  [bodyAnimationType]: colors.pink,
  [speechType]: colors.azure,
  [reflectionType]: colors.azure,
  [reflectionFormulaType]: colors.azure,
  [headAnimationType]: colors.golden,
  [readQuestionBlockType]: colors.electricViolet,
  [pauseType]: colors.coral,
  [feedbackBlockType]: colors.black,
};

const voiceSettingRemovedBlocks = [readQuestionBlockType, speechType];

const animationSettingRemovedBlocks = [bodyAnimationType, headAnimationType];

export const getRemovedBlockForSetting = (setting) => {
  if (setting === 'all')
    return [...animationSettingRemovedBlocks, ...voiceSettingRemovedBlocks];
  if (setting === 'animation') return animationSettingRemovedBlocks;
  if (setting === 'voice') return voiceSettingRemovedBlocks;
  return [];
};
