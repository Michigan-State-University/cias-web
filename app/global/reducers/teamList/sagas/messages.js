/*
 * Team List Messages
 *
 * This contains all the text for the TeamList saga.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.TeamList';

export default defineMessages({
  deleteTeamSuccess: {
    id: `${scope}.deleteTeamSuccess`,
    defaultMessage: 'Successfully deleted the team',
  },
  deleteTeamFailure: {
    id: `${scope}.deleteTeamFailure`,
    defaultMessage: 'Failed to delete the team',
  },
  createTeamSuccess: {
    id: `${scope}.createTeamSuccess`,
    defaultMessage: 'Successfully created the team',
  },
  createTeamFailure: {
    id: `${scope}.createTeamFailure`,
    defaultMessage: 'Failed to create the team',
  },
});
