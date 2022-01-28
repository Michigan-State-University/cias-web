import { defineMessages } from 'react-intl';

export const scope = 'app.global.reducers.tlfb';

export default defineMessages({
  addTlfbEventError: {
    id: `${scope}.addTlfbEventError`,
    defaultMessage: `Couldn't add a new event`,
  },
  editTlfbEventError: {
    id: `${scope}.editTlfbEventError`,
    defaultMessage: `Couldn't edit the event name`,
  },
});
