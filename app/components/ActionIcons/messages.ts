import { defineMessages } from 'react-intl';

export const scope = 'app.components.ActionIcons';

export default defineMessages({
  playButtonLabel: {
    id: `${scope}.playButtonLabel`,
    defaultMessage: 'Play audio',
  },
  stopButtonLabel: {
    id: `${scope}.stopButtonLabel`,
    defaultMessage: 'Stop audio',
  },
  clearFiltersLabel: {
    id: `${scope}.clearFiltersLabel`,
    defaultMessage: `Reset filters to default values`,
  },
});
