import { colors } from 'theme';

export const bodyAnimationType = 'BodyAnimation';
export const speechType = 'Speech';

export const blockTypes = [speechType, bodyAnimationType];

export const blockTypeToColorMap = {
  [bodyAnimationType]: colors.pink,
  [speechType]: colors.azure,
};
