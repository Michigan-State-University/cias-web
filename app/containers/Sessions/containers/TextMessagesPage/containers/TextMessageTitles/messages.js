import { defineMessages } from 'react-intl';

export const scope = 'app.containers.TextMessageTitles';

export default defineMessages({
  createTextMessage: {
    id: `${scope}.createTextMessage`,
    defaultMessage: 'Create a new SMS',
  },
  oneWayHeader: {
    id: `${scope}.oneWayHeader`,
    defaultMessage: 'One-way messages',
  },
  defaultName: {
    id: `${scope}.defaultName`,
    defaultMessage: 'One-way message',
  },
  alertMessageDescription: {
    id: `${scope}.alertMessageDescription`,
    defaultMessage: 'Send an alert to the specified number.',
  },
});
