import { colors, themeColors } from 'theme';

import { AlertType } from './types';

export const getBackgroundColorByType = (type: AlertType) => {
  switch (type) {
    case AlertType.WARNING: {
      return colors.chardonnay;
    }
    case AlertType.INFO:
    default: {
      return themeColors.highlight;
    }
  }
};
