import { defineMessages } from 'react-intl';

export const scope = 'app.globals.reducers.navigatorSetup';

export default defineMessages({
  updateError: {
    id: `${scope}.updateError`,
    defaultMessage: 'There was an error during update of navigator settings!',
  },
});
