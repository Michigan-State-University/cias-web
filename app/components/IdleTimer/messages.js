/*
 * IdleTimer Messages
 *
 * This contains all the text for the IdleTimer container.
 */
import { defineMessages } from 'react-intl';

export const scope = 'app.components.IdleTimer';

export default defineMessages({
  logoutMessage: {
    id: `${scope}.logoutMessage`,
    defaultMessage: 'You have been logged out due to inactivity!',
  },
});
