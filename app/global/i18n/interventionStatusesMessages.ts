import { defineMessages } from 'react-intl';

import { InterventionStatus } from 'models/Intervention';

export const scope = 'app.global.InterventionStatuses';

export default defineMessages<InterventionStatus>({
  [InterventionStatus.DRAFT]: {
    id: `${scope}.draft`,
    defaultMessage: 'Draft',
  },
  [InterventionStatus.PUBLISHED]: {
    id: `${scope}.published`,
    defaultMessage: 'Published',
  },
  [InterventionStatus.CLOSED]: {
    id: `${scope}.closed`,
    defaultMessage: 'Closed',
  },
  [InterventionStatus.ARCHIVED]: {
    id: `${scope}.archived`,
    defaultMessage: 'Archived',
  },
});
