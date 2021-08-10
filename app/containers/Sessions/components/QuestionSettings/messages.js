import { defineMessages } from 'react-intl';

export const scope = 'app.containers.QuestionSettings';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'Screen Details',
  },
  settingsButtonLabel: {
    id: `${scope}.settingsButtonLabel`,
    defaultMessage: 'Toggle Settings visibility',
  },
});
