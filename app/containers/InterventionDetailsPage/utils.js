import { createContext } from 'react';

import { archived, closed, draft, published } from 'models/Status/StatusTypes';

export const nextStatus = {
  [draft]: published,
  [published]: closed,
  [closed]: archived,
};

export const InterventionDetailsPageContext = createContext({
  canEdit: false,
  canShareWithParticipants: false,
  canArchive: false,
});
