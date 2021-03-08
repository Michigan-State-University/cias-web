import React from 'react';
import { FormattedMessage, defineMessages } from 'react-intl';

const scope = 'app.navbarNames';

const navbarMessages = defineMessages({
  preview: {
    id: `${scope}.preview`,
    defaultMessage: 'Preview',
  },
  adminInterventions: {
    id: `${scope}.adminInterventions`,
    defaultMessage: 'Interventions',
  },
  adminAccounts: {
    id: `${scope}.adminAccounts`,
    defaultMessage: 'Manage accounts',
  },
  adminTeams: {
    id: `${scope}.adminTeams`,
    defaultMessage: 'Manage teams',
  },
  teamAdminTeam: {
    id: `${scope}.teamAdminTeam`,
    defaultMessage: 'My Team',
  },
  researcherInterventions: {
    id: `${scope}.researcherInterventions`,
    defaultMessage: 'Interventions',
  },
  researcherAccounts: {
    id: `${scope}.researcherAccounts`,
    defaultMessage: 'Manage My Participants',
  },
  participantInterventions: {
    id: `${scope}.participantInterventions`,
    defaultMessage: 'Dashboard',
  },
  participantReports: {
    id: `${scope}.participantReports`,
    defaultMessage: 'Reports',
  },
  guestInterventions: {
    id: `${scope}.guestInterventions`,
    defaultMessage: 'CIAS',
  },
});

const navbarNames = {
  preview: <FormattedMessage {...navbarMessages.preview} />,
  adminInterventions: (
    <FormattedMessage {...navbarMessages.adminInterventions} />
  ),
  adminAccounts: <FormattedMessage {...navbarMessages.adminAccounts} />,
  adminTeams: <FormattedMessage {...navbarMessages.adminTeams} />,
  teamAdminTeam: <FormattedMessage {...navbarMessages.teamAdminTeam} />,
  researcherInterventions: (
    <FormattedMessage {...navbarMessages.researcherInterventions} />
  ),
  researcherAccounts: (
    <FormattedMessage {...navbarMessages.researcherAccounts} />
  ),
  participantInterventions: (
    <FormattedMessage {...navbarMessages.participantInterventions} />
  ),
  participantReports: (
    <FormattedMessage {...navbarMessages.participantReports} />
  ),
  guestInterventions: (
    <FormattedMessage {...navbarMessages.guestInterventions} />
  ),
};

export default navbarNames;
