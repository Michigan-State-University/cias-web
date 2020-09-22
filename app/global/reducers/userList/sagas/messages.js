/*
 * User List Messages
 *
 * This contains all the text for the Problem saga.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.Problem';

export default defineMessages({
  changeStatusSuccess: {
    id: `${scope}.changeStatusSuccess`,
    defaultMessage: 'User status has changed',
  },
  changeStatusFailure: {
    id: `${scope}.changeStatusFailure`,
    defaultMessage: 'Cannot change user status',
  },
});
