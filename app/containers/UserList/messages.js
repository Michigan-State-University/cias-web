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
  activate: {
    id: `${scope}.activate`,
    defaultMessage: ' ',
  },
  deactivateAccountConfirm: {
    id: `${scope}.deactivateAccountConfirm`,
    defaultMessage: 'Are you sure you want to deactivate this account',
  },
  activateAccountConfirm: {
    id: `${scope}.activateAccountConfirm`,
    defaultMessage: 'Are you sure you want to activate this account',
  },
  deactivateAccount: {
    id: `${scope}.deactivateAccount`,
    defaultMessage: 'Deactivate account',
  },
  activateAccount: {
    id: `${scope}.activateAccount`,
    defaultMessage: 'Activate account',
  },
  noUsers: {
    id: `${scope}.noUsers`,
    defaultMessage: 'There are no users matching given criteria',
  },
  resetRoles: {
    id: `${scope}.resetRoles`,
    defaultMessage: 'Reset role filters',
  },
  waitingForActivation: {
    id: `${scope}.waitingForActivation`,
    defaultMessage: 'Waiting for activation',
  },
});
