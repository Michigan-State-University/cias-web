import { defineMessages } from 'react-intl';

export const scope = 'app.utils.useInterventionChannel';

export default defineMessages({
  startEditModeError: {
    id: `${scope}.startEditModeError`,
    defaultMessage: 'An error occurred while starting Edit Mode.',
  },
  stopEditModeError: {
    id: `${scope}.stopEditModeError`,
    defaultMessage: 'An error occurred while stopping Edit Mode.',
  },
});
