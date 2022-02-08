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
});
