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
  researcherInterventions: {
    id: `${scope}.researcherInterventions`,
    defaultMessage: 'My Interventions',
  },
  researcherAccounts: {
    id: `${scope}.researcherAccounts`,
    defaultMessage: 'Manage My Participants',
  },
  participantInterventions: {
    id: `${scope}.participantInterventions`,
    defaultMessage: 'CIAS',
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
  researcherInterventions: (
    <FormattedMessage {...navbarMessages.researcherInterventions} />
  ),
  researcherAccounts: (
    <FormattedMessage {...navbarMessages.researcherAccounts} />
  ),
  participantInterventions: (
    <FormattedMessage {...navbarMessages.participantInterventions} />
  ),
  guestInterventions: (
    <FormattedMessage {...navbarMessages.guestInterventions} />
  ),
};

export default navbarNames;
