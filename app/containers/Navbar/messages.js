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
    defaultMessage: 'e-Intervention Name',
  },
});
