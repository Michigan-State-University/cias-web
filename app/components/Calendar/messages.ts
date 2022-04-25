import { defineMessages } from 'react-intl';

export const scope = 'app.components.Calendar';

export default defineMessages({
  defaultEventName: {
    id: `${scope}.defaultEventName`,
    defaultMessage: 'Event',
  },
  moreEvents: {
    id: `${scope}.moreEvents`,
    defaultMessage: '+{count} more',
  },
  events: {
    id: `${scope}.events`,
    defaultMessage: 'Events',
  },
  substances: {
    id: `${scope}.substances`,
    defaultMessage: '{count, plural, one {# substance} other {# substances}}',
  },
});
