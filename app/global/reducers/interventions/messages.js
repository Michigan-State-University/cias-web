import { defineMessages } from 'react-intl';

export const scope = 'app.globals.reducers.interventions';

export default defineMessages({
  defaultError: {
    id: `${scope}.defaultError`,
    defaultMessage: 'Something went wrong.',
  },
  duplicateError: {
    id: `${scope}.duplicateError`,
    defaultMessage: 'There was an error during duplicating the Intervention!',
  },
  copyError: {
    id: `${scope}.copyError`,
    defaultMessage: 'There was an error during copying the Intervention!',
  },
  duplicateSuccess: {
    id: `${scope}.duplicateSuccess`,
    defaultMessage: 'Duplicated "{name}" Intervention is now on the Dashboard',
  },
  copySuccess: {
    id: `${scope}.copySuccess`,
    defaultMessage: `Copy of "{name}" was sent to the chosen {
      userCount, plural, 
        one {researcher}
        other {researchers}
    }`,
  },
});
