/*
 * UserList Messages
 *
 * This contains all the text for the UserList container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.UserList';

export default defineMessages({
  manageAccount: {
    id: `${scope}.manageAccount`,
    defaultMessage: 'Manage accounts',
  },
  inviteResearcher: {
    id: `${scope}.inviteResearcher`,
    defaultMessage: '+ Invite researcher',
  },
  showInactive: {
    id: `${scope}.showInactive`,
    defaultMessage: 'Show inactive accounts',
  },
  name: {
    id: `${scope}.name`,
    defaultMessage: 'Name',
  },
  role: {
    id: `${scope}.role`,
    defaultMessage: 'Role',
  },
  email: {
    id: `${scope}.email`,
    defaultMessage: 'Email',
  },
});
