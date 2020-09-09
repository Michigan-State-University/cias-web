import { colors } from 'theme';

export const draft = 'draft';
export const published = 'published';
export const closed = 'closed';
export const archived = 'archived';
export const toArchive = 'to_archive';

export const statusTypes = [draft, published, closed];

export const statusTypeToColorMap = {
  [draft]: colors.heather,
  [published]: colors.pistachio,
  [closed]: colors.burntSienna,
  [archived]: colors.heather,
};
