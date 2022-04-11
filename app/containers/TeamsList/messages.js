/*
 * TeamsList Messages
 *
 * This contains all the text for the TeamsList container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.TeamsList';

export default defineMessages({
  pageTitle: {
    id: `${scope}.pageTitle`,
    defaultMessage: 'Manage Teams',
  },
  manageTeams: {
    id: `${scope}.manageTeams`,
    defaultMessage: 'Manage teams',
  },
  createTeam: {
    id: `${scope}.createTeam`,
    defaultMessage: '+ Create team',
  },
  showInactive: {
    id: `${scope}.showInactive`,
    defaultMessage: 'Show inactive accounts',
  },
  name: {
    id: `${scope}.name`,
    defaultMessage: 'Name',
  },
  teamAdmin: {
    id: `${scope}.teamAdmin`,
    defaultMessage: 'Team Admin name',
  },
  teamAdminEmail: {
    id: `${scope}.teamAdminEmail`,
    defaultMessage: 'Team Admin email',
  },
  delete: {
    id: `${scope}.delete`,
    defaultMessage: ' ',
  },
  deleteTeamConfirm: {
    id: `${scope}.deleteTeamConfirm`,
    defaultMessage: 'Are you sure you want to delete this Team?',
  },
  deleteTeam: {
    id: `${scope}.deleteTeam`,
    defaultMessage: 'Delete team',
  },
  noTeams: {
    id: `${scope}.noTeams`,
    defaultMessage: 'There are no teams matching given criteria',
  },
  invalidEmail: {
    id: `${scope}.invalidEmail`,
    defaultMessage: 'Invalid e-mail address',
  },
  modalTitle: {
    id: `${scope}.modalTitle`,
    defaultMessage: 'Create team',
  },
  createTeamButtonText: {
    id: `${scope}.createTeamButtonText`,
    defaultMessage: 'Create team',
  },
  nameSectionTitle: {
    id: `${scope}.nameSectionTitle`,
    defaultMessage: 'Team name',
  },
  researcherSectionTitle: {
    id: `${scope}.researcherSectionTitle`,
    defaultMessage: 'Choose Researcher or Team Admin',
  },
  createTeamNameInput: {
    id: `${scope}.createTeamNameInput`,
    defaultMessage: 'e.g Team n.o. 1',
  },
  searchPlaceholder: {
    id: `${scope}.searchPlaceholder`,
    defaultMessage: 'Filter users by name',
  },
});
