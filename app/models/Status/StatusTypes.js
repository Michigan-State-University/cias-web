import { colors, themeColors } from 'theme';

import { InterventionStatus } from 'models/Intervention';

export const INITIAL_STATUSES_FILTER_VALUE = [
  InterventionStatus.DRAFT,
  InterventionStatus.PUBLISHED,
].sort();

export const statusTypeToColorMap = {
  [InterventionStatus.DRAFT]: themeColors.primary,
  [InterventionStatus.PUBLISHED]: colors.pistachio,
  [InterventionStatus.PAUSED]: colors.rawUmber,
  [InterventionStatus.CLOSED]: colors.burntSienna,
  [InterventionStatus.ARCHIVED]: colors.black,
};

export const statusTypeToFontColorMap = {
  [InterventionStatus.DRAFT]: colors.white,
  [InterventionStatus.PUBLISHED]: colors.white,
  [InterventionStatus.PAUSED]: colors.white,
  [InterventionStatus.CLOSED]: colors.white,
  [InterventionStatus.ARCHIVED]: colors.white,
};
