/*
 * ParticipantDashboard Messages
 *
 * This contains all the text for the ParticipantDashboard container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.ParticipantDashboard';

export default defineMessages({
  interventions: {
    id: `${scope}.interventions`,
    defaultMessage: 'My Interventions',
  },
  noResults: {
    id: `${scope}.noResults`,
    defaultMessage: 'No Results',
  },
});
