import { defineMessages } from 'react-intl';

import { UserInterventionStatus } from 'models/UserIntervention/StatusTypes';

export const scope = 'app.global.UserInterventionStatuses';

export default defineMessages<UserInterventionStatus>({
  ready_to_start: {
    id: `${scope}.ready_to_start`,
    defaultMessage: 'Ready to start',
  },
  in_progress: {
    id: `${scope}.in_progress`,
    defaultMessage: 'In progress',
  },
  completed: {
    id: `${scope}.completed`,
    defaultMessage: 'Completed',
  },
  schedule_pending: {
    id: `${scope}.schedule_pending`,
    defaultMessage: 'Schedule session pending',
  },
  no_access: {
    id: `${scope}.no_access`,
    defaultMessage: 'No access',
  },
});
