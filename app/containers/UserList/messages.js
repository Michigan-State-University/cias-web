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
    defaultMessage: 'Activate/Deactivate',
  },
  deleteFromTeamColumn: {
    id: `${scope}.deleteFromTeamColumn`,
    defaultMessage: 'Remove',
  },
  deleteFromTeam: {
    id: `${scope}.deleteFromTeam`,
    defaultMessage: 'Remove from team',
  },
  deactivateAccountConfirm: {
    id: `${scope}.deactivateAccountConfirm`,
    defaultMessage: 'Are you sure you want to deactivate this account',
  },
  deleteFromTeamConfirm: {
    id: `${scope}.deleteFromTeamConfirm`,
    defaultMessage:
      'Are you sure you want to delete this account from the team?',
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
  paginationAriaLabel: {
    id: `${scope}.paginationAriaLabel`,
    defaultMessage: 'Data list pagination',
  },
  paginationPreviousPageAriaLabel: {
    id: `${scope}.paginationPreviousPageAriaLabel`,
    defaultMessage: 'Go to previous page',
  },
  paginationNextPageAriaLabel: {
    id: `${scope}.paginationNextPageAriaLabel`,
    defaultMessage: 'Go to next page',
  },
  paginationXPageAriaLabel: {
    id: `${scope}.paginationNextAriaLabel`,
    defaultMessage: 'Go to page: {page}',
  },
});
