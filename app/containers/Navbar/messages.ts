/*
 * Navbar Messages
 *
 * This contains all the text for the Navbar container.
 */
import { defineMessages } from 'react-intl';

export const scope = 'app.containers.Navbar';

export default defineMessages({
  editAccount: {
    id: `${scope}.editAccount`,
    defaultMessage: 'Edit account',
  },
  logOut: {
    id: `${scope}.logOut`,
    defaultMessage: 'Log out',
  },
  placeholder: {
    id: `${scope}.placeholder`,
    defaultMessage: 'e-Session Name',
  },
  users: {
    id: `${scope}.users`,
    defaultMessage: 'Users',
  },
  notifications: {
    id: `${scope}.notifications`,
    defaultMessage: 'Notifications',
  },
  toggleNotifications: {
    id: `${scope}.toggleNotifications`,
    defaultMessage: 'Toggle notifications visibility',
  },
  noUnreadNotifications: {
    id: `${scope}.noUnreadNotifications`,
    defaultMessage: "You don't have any unread notifications.",
  },
  defaultDisplayedName: {
    id: `${scope}.defaultDisplayedName`,
    defaultMessage: 'My account',
  },
});
