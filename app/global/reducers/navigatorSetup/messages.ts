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
  navigatorHasBeenInvited: {
    id: `${scope}.navigatorHasBeenInvited`,
    defaultMessage: `Navigator(s) invitation has been send. Keep in mind only navigators that are not invited already will receive an e-mail`,
  },
  navigatorInvitationRemovedSuccess: {
    id: `${scope}.navigatorInvitationRemovedSuccess`,
    defaultMessage: `Navigator invitation has been removed`,
  },
  navigatorRemovedSuccess: {
    id: `${scope}.navigatorRemovedSuccess`,
    defaultMessage: `Navigator has been successfully removed`,
  },
  teamNavigatorHasBeenInvited: {
    id: `${scope}.teamNavigatorHasBeenInvited`,
    defaultMessage: `Team navigator has been invited`,
  },
  teamNavigatorHasBeenInvitedError: {
    id: `${scope}.teamNavigatorHasBeenInvitedError`,
    defaultMessage: `There was a problem with inviting team navigator`,
  },
});
