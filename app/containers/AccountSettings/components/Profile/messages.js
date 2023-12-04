/*
 * AccountSettings Messages
 *
 * This contains all the text for the AccountSettings container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.AccountSettings.components.Profile';

export default defineMessages({
  changePassword: {
    id: `${scope}.changePassword`,
    defaultMessage: 'Reset password',
  },
  header: {
    id: `${scope}.header`,
    defaultMessage: 'Profile',
  },
});
