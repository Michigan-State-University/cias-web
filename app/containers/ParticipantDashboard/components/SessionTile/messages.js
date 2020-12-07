/*
 * ParticipantDashboard Messages
 *
 * This contains all the text for the ParticipantDashboard container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.ParticipantDashboard';

export default defineMessages({
  startSession: {
    id: `${scope}.startSession`,
    defaultMessage: 'Start session',
  },
  completed: {
    id: `${scope}.completed`,
    defaultMessage: 'Completed',
  },
  download: {
    id: `${scope}.download`,
    defaultMessage: 'Download Report',
  },
});
