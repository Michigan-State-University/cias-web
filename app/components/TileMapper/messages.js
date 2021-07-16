import { defineMessages } from 'react-intl';

export const scope = 'app.containers.ParticipantDashboard';

export default defineMessages({
  noResults: {
    id: `${scope}.noResults`,
    defaultMessage:
      'Welcome to CIAS! If you request any reports from your sessions, you will be able to find them here.',
  },
});
