import { defineMessages } from 'react-intl';

import { UserSessionStatus } from 'models/UserSession/StatusTypes';

export const scope = 'app.global.UserSessionStatuses';

export default defineMessages<UserSessionStatus>({
  [UserSessionStatus.READY_TO_START]: {
    id: `${scope}.ready_to_start`,
    defaultMessage: 'Ready to start',
  },
  [UserSessionStatus.IN_PROGRESS]: {
    id: `${scope}.inProgress`,
    defaultMessage: 'In progress',
  },
  [UserSessionStatus.COMPLETED]: {
    id: `${scope}.completed`,
    defaultMessage: 'Completed',
  },
  [UserSessionStatus.NOT_AVAILABLE]: {
    id: `${scope}.notAvailable`,
    defaultMessage: 'Not available',
  },
  [UserSessionStatus.CLOSED]: {
    id: `${scope}.closed`,
    defaultMessage: 'Session closed',
  },
});
