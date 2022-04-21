/*
 * UserDetails Messages
 *
 * This contains all the text for the UserDetails container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.UserDetails';

export default defineMessages({
  pageTitle: {
    id: `${scope}.pageTitle`,
    defaultMessage: 'User Details',
  },
  canCreateCatMhSession: {
    id: `${scope}.canCreateCatMhSession`,
    defaultMessage: 'Can create CAT-MH™ sessions',
  },
});
