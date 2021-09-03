import { defineMessages } from 'react-intl';

export const scope = 'app.globals.reducers.session';

export default defineMessages({
  editSessionSuccess: {
    id: `${scope}.editSessionSuccess`,
    defaultMessage: 'Session updated correctly',
  },
  editSessionError: {
    id: `${scope}.editSessionError`,
    defaultMessage: `Couldn't update session`,
  },
});
