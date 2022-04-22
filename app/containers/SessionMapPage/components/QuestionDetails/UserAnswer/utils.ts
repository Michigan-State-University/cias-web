import { themeColors } from 'theme';

export const formatAnswerValueForMarkup = (value: string) =>
  `<span style='color: ${themeColors.primary}; font-weight: bold'>${value}</span>`;
