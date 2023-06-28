import { defineMessages } from 'react-intl';

export const scope = 'app.components.SelectResearchers';

export default defineMessages({
  name: {
    id: `${scope}.name`,
    defaultMessage: 'Name',
  },
  email: {
    id: `${scope}.email`,
    defaultMessage: 'Email',
  },
  waitingForActivation: {
    id: `${scope}.waitingForActivation`,
    defaultMessage: 'Waiting for activation',
  },
  success: {
    id: `${scope}.success`,
    defaultMessage: 'Success',
  },
  byEmail: {
    id: `${scope}.byEmail`,
    defaultMessage: 'by email',
  },
  yourTeamMembers: {
    id: `${scope}.yourTeamMembers`,
    defaultMessage: 'Your team members',
  },
});
