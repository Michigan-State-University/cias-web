/*
 * ConfirmationBox Messages
 *
 * This contains all the text for the ConfirmationBox component.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.components.ConfirmationBox';

export default defineMessages({
  cancel: {
    id: `${scope}.cancel`,
    defaultMessage: 'Cancel',
  },
  confirmCanceling: {
    id: `${scope}.confirmCanceling`,
    defaultMessage: `Confirm`,
  },
  defaultDescription: {
    id: `${scope}.defaultDescription`,
    defaultMessage: 'Are you sure you want to perform this action?',
  },
});
