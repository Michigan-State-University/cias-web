import { defineMessages } from 'react-intl';

export const scope = 'app.components.EventInput';

export default defineMessages({
  eventNameLabel: {
    id: `${scope}.eventNameLabel`,
    defaultMessage: 'Please label your event (birthday, etc.)',
  },
  eventNamePlaceholder: {
    id: `${scope}.eventNamePlaceholder`,
    defaultMessage: 'e.g. Paul’s Birthday',
  },
  delete: {
    id: `${scope}.delete`,
    defaultMessage: 'Delete event',
  },
});
