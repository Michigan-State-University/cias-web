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
  editTeamFailure: {
    id: `${scope}.editTeamFailure`,
    defaultMessage: 'Failed to edit the team',
  },
  inviteToTeamSuccess: {
    id: `${scope}.inviteToTeamSuccess`,
    defaultMessage:
      'Invitation request is being sent. Bear in mind that in the case of existing users only Researcher will get the invitation.',
  },
  inviteToTeamFailure: {
    id: `${scope}.inviteToTeamFailure`,
    defaultMessage: 'Failed to invite researcher to the team',
  },
});
