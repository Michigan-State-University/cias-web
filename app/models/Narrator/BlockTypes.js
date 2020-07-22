import { colors } from 'theme';

export const bodyAnimationType = 'BodyAnimation';
export const speechType = 'Speech';
export const headAnimationType = 'HeadAnimation';

export const blockTypes = [speechType, bodyAnimationType, headAnimationType];

export const blockTypeToColorMap = {
  [bodyAnimationType]: colors.pink,
  [speechType]: colors.azure,
  [headAnimationType]: colors.golden,
};
