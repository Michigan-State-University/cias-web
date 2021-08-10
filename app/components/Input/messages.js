import { defineMessages } from 'react-intl';

export const scope = 'app.components.Input';

export default defineMessages({
  preview: {
    id: `${scope}.preview`,
    defaultMessage: 'Try it out!',
  },
  clearButtonLabel: {
    id: `${scope}.clearButtonLabel`,
    defaultMessage: 'Clear input',
  },
});
