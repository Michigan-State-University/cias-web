import { archived, closed, draft, published } from 'models/Status/StatusTypes';

export const updateStatuses = {
  draft: 'broadcast',
  published: 'close',
};

export const nextStatus = {
  [draft]: published,
  [published]: closed,
  [closed]: archived,
};
