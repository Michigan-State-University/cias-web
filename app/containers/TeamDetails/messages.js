/*
 * TeamDetails Messages
 *
 * This contains all the text for the TeamDetails container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.TeamDetails';

export default defineMessages({
  pageTitle: {
    id: `${scope}.pageTitle`,
    defaultMessage: 'Team details',
  },
  backButton: {
    id: `${scope}.backButton`,
    defaultMessage: 'Back to Team List',
  },
  header: {
    id: `${scope}.header`,
    defaultMessage: 'Team Details',
  },
  editSectionHeader: {
    id: `${scope}.editSectionHeader`,
    defaultMessage: 'Edit Team',
  },
  researcherSectionTitle: {
    id: `${scope}.researcherSectionTitle`,
    defaultMessage: 'Change Team Admin',
  },
  nameSectionTitle: {
    id: `${scope}.nameSectionTitle`,
    defaultMessage: 'Change Team name',
  },
  teamNameInput: {
    id: `${scope}.teamNameInput`,
    defaultMessage: 'e.g Team n.o. 1',
  },
  saveButton: {
    id: `${scope}.saveButton`,
    defaultMessage: 'Save',
  },
  inviteToTeam: {
    id: `${scope}.inviteToTeam`,
    defaultMessage: '+ Invite to team',
  },
});
