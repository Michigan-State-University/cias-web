/*
 * UserSelector Messages
 *
 * This contains all the text for the UserSelector component.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.components.UserSelector';

export default defineMessages({
  inputPlaceholder: {
    id: `${scope}.inputPlaceholder`,
    defaultMessage: 'Select a user',
  },
  noUsersMessage: {
    id: `${scope}.noUsersMessage`,
    defaultMessage: 'There are no users matching given criteria',
  },
});
