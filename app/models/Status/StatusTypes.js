import { colors, themeColors } from 'theme';

export const draft = 'draft';
export const published = 'published';
export const closed = 'closed';
export const archived = 'archived';

export const statusTypes = [closed, draft, published].sort();

export const statusTypeToColorMap = {
  [draft]: themeColors.primary,
  [published]: colors.pistachio,
  [closed]: colors.burntSienna,
  [archived]: colors.black,
};

export const statusTypeToFontColorMap = {
  [draft]: colors.white,
  [published]: colors.white,
  [closed]: colors.white,
  [archived]: colors.white,
};
