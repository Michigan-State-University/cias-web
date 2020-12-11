/*
 * AccountSettings Messages
 *
 * This contains all the text for the AccountSettings container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.AccountSettings';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'Notifications',
  },
  emailNotifications: {
    id: `${scope}.emailNotifications`,
    defaultMessage: 'Enable email notifications',
  },
  phoneNotifications: {
    id: `${scope}.phoneNotifications`,
    defaultMessage: 'Enable phone notifications',
  },
});
