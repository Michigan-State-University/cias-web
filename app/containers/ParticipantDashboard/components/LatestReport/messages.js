/*
 * ParticipantDashboard Messages
 *
 * This contains all the text for the ParticipantDashboard container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.ParticipantDashboard';

export default defineMessages({
  latestReport: {
    id: `${scope}.latestReport`,
    defaultMessage: 'Latest Report',
  },
  allReports: {
    id: `${scope}.allReports`,
    defaultMessage: 'View All Reports',
  },
});
