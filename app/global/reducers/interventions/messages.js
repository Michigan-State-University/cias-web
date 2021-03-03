import { defineMessages } from 'react-intl';

export const scope = 'app.globals.reducers.interventions';

export default defineMessages({
  defaultError: {
    id: `${scope}.defaultError`,
    defaultMessage: 'Something went wrong.',
  },
  copyError: {
    id: `${scope}.copyError`,
    defaultMessage: 'There was an error during duplicating the Intervention!',
  },
  sendSuccess: {
    id: `${scope}.sendSuccess`,
    defaultMessage: 'Duplicated "{name}" Intervention is now on the Dashboard',
  },
});
