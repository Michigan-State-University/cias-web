import { defineMessages } from 'react-intl';

export const scope = 'app.global.reducers.textMessages';

export default defineMessages({
  copyError: {
    id: `${scope}.copyError`,
    defaultMessage: 'Cannot copy the sms plan!',
  },
});
