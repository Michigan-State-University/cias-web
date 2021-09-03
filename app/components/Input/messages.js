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
  quillLinkLabel: {
    id: `${scope}.quillLinkLabel`,
    defaultMessage: 'Provide an URL:',
  },
  playButtonLabel: {
    id: `${scope}.playButtonLabel`,
    defaultMessage: 'Play audio',
  },
  stopButtonLabel: {
    id: `${scope}.stopButtonLabel`,
    defaultMessage: 'Stop audio',
  },
});
