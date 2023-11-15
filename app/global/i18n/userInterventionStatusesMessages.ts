import { defineMessages } from 'react-intl';

import { UserInterventionStatus } from 'models/UserIntervention/StatusTypes';

export const scope = 'app.global.UserInterventionStatuses';

export default defineMessages<UserInterventionStatus>({
  [UserInterventionStatus.READY_TO_START]: {
    id: `${scope}.ready_to_start`,
    defaultMessage: 'Ready to start',
  },
  [UserInterventionStatus.IN_PROGRESS]: {
    id: `${scope}.in_progress`,
    defaultMessage: 'In progress',
  },
  [UserInterventionStatus.COMPLETED]: {
    id: `${scope}.completed`,
    defaultMessage: 'Completed',
  },
  [UserInterventionStatus.SCHEDULE_PENDING]: {
    id: `${scope}.schedule_pending`,
    defaultMessage: 'Schedule session pending',
  },
  [UserInterventionStatus.NO_ACCESS]: {
    id: `${scope}.no_access`,
    defaultMessage: 'No access',
  },
  [UserInterventionStatus.PAUSED]: {
    id: `${scope}.paused`,
    defaultMessage: 'Paused',
  },
});
