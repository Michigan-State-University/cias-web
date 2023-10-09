import { defineMessages } from 'react-intl';

import { UserSessionStatus } from 'models/UserSession/StatusTypes';

export const scope = 'app.global.UserSessionStatuses';

export default defineMessages<UserSessionStatus>({
  ready_to_start: {
    id: `${scope}.ready_to_start`,
    defaultMessage: 'Ready to start',
  },
  inProgress: {
    id: `${scope}.inProgress`,
    defaultMessage: 'In progress',
  },
  completed: {
    id: `${scope}.completed`,
    defaultMessage: 'Completed',
  },
  notAvailable: {
    id: `${scope}.notAvailable`,
    defaultMessage: 'Not available',
  },
});
