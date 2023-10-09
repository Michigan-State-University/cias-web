import { defineMessages } from 'react-intl';

export const scope = 'app.global.UserSessionStatuses';

export default defineMessages({
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
