import { defineMessages } from 'react-intl';

export const scope = 'app.global.reducers.userIntervention';

export default defineMessages({
  acceptInvitation: {
    id: `${scope}.acceptInvitation`,
    defaultMessage: 'There was an error with accepting your invitation',
  },
  acceptBlockedInvitation: {
    id: `${scope}.acceptBlockedInvitation`,
    defaultMessage: `Invitation is accepted but you don't have access to intervention. Please contact your researcher`,
  },
});
