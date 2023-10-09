import { defineMessages } from 'react-intl';

import { InterventionStatus } from 'models/Intervention';

export const scope = 'app.global.InterventionStatuses';

export default defineMessages<InterventionStatus>({
  draft: {
    id: `${scope}.draft`,
    defaultMessage: 'Draft',
  },
  published: {
    id: `${scope}.published`,
    defaultMessage: 'Published',
  },
  closed: {
    id: `${scope}.closed`,
    defaultMessage: 'Closed',
  },
  archived: {
    id: `${scope}.archived`,
    defaultMessage: 'Archived',
  },
});
