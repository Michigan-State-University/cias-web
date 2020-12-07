import { defineMessages } from 'react-intl';

export const scope = 'app.containers.ParticipantDashboard';

export default defineMessages({
  session: {
    id: `${scope}.session`,
    defaultMessage: 'session',
  },

  sessions: {
    id: `${scope}.sessions`,
    defaultMessage: 'sessions',
  },

  notifications: {
    id: `${scope}.notifications`,
    defaultMessage: 'Email notifications',
  },
});
