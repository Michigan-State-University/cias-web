import { defineMessages } from 'react-intl';

export const scope = 'app.globals.reducers.navigatorSetup';

export default defineMessages({
  updateError: {
    id: `${scope}.updateError`,
    defaultMessage: 'There was an error during update of navigator settings!',
  },
  removeNavigatorEmailInvitationError: {
    id: `${scope}.removeNavigatorEmailInvitationError`,
    defaultMessage: `Couldn't remove navigator invitation!`,
  },
  navigatorInvitationError: {
    id: `${scope}.navigatorInvitationError`,
    defaultMessage: `Couldn't invite navigators!`,
  },
  removeInterventionNavigatorError: {
    id: `${scope}.removeInterventionNavigatorError`,
    defaultMessage: `Couldn't remove navigator from intervention!`,
  },
});
