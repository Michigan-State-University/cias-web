/*
 * UserAvatar Messages
 *
 * This contains all the text for the UserAvatar container.
 */
import { defineMessages } from 'react-intl';

export const scope = 'app.containers.UserAvatar';

export default defineMessages({
  editAccount: {
    id: `${scope}.editAccount`,
    defaultMessage: 'Edit account',
  },
  logOut: {
    id: `${scope}.logOut`,
    defaultMessage: 'Log out',
  },
});
