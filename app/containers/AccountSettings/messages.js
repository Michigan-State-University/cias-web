/*
 * AccountSettings Messages
 *
 * This contains all the text for the AccountSettings container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.AccountSettings';

export default defineMessages({
  pageTitle: {
    id: `${scope}.pageTitle`,
    defaultMessage: 'Profile',
  },
  back: {
    id: `${scope}.back`,
    defaultMessage: 'Back to dashboard',
  },
  header: {
    id: `${scope}.header`,
    defaultMessage: 'Account Settings',
  },
  backToUsers: {
    id: `${scope}.backToUsers`,
    defaultMessage: 'Back to user list',
  },
  backToMyTeam: {
    id: `${scope}.backToMyTeam`,
    defaultMessage: 'Back to My Team',
  },
  backToTeamDetails: {
    id: `${scope}.backToTeamDetails`,
    defaultMessage: 'Back to Team Details',
  },
});
