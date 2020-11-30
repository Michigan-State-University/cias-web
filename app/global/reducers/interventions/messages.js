import { defineMessages } from 'react-intl';

export const scope = 'app.globals.reducers.problems';

export default defineMessages({
  defaultError: {
    id: `${scope}.defaultError`,
    defaultMessage: 'Something went wrong.',
  },
  copyError: {
    id: `${scope}.copyError`,
    defaultMessage: 'Cannot copy problem',
  },
  sendSuccess: {
    id: `${scope}.sendSuccess`,
    defaultMessage: 'You have successfuly sent a copy of the session!',
  },
});
