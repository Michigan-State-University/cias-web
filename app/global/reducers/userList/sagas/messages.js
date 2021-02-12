/*
 * User List Messages
 *
 * This contains all the text for the Intervention saga.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.Intervention';

export default defineMessages({
  changeStatusSuccess: {
    id: `${scope}.changeStatusSuccess`,
    defaultMessage: 'User status has changed',
  },
  changeStatusFailure: {
    id: `${scope}.changeStatusFailure`,
    defaultMessage: 'Cannot change user status',
  },
  deleteUserFromTeamSuccess: {
    id: `${scope}.deleteUserFromTeamSuccess`,
    defaultMessage: 'Successfully deleted user from the team',
  },
  deleteUserFromTeamFailure: {
    id: `${scope}.deleteUserFromTeamFailure`,
    defaultMessage: 'Failed to delete user from the team',
  },
});
