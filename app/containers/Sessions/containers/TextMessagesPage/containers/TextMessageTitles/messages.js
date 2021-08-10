/*
 * TextMessageTiles
 *
 * This contains all the text for the TextMessageTiles container.
 */
import { defineMessages } from 'react-intl';
import { MESSAGES_SCHEDULE_OPTIONS } from 'models/TextMessage';

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
  [MESSAGES_SCHEDULE_OPTIONS.afterFill]: {
    id: `${scope}.${MESSAGES_SCHEDULE_OPTIONS.afterFill}`,
    defaultMessage: 'Send after the session is completed',
  },
  [MESSAGES_SCHEDULE_OPTIONS.daysAfterFill]: {
    id: `${scope}.${MESSAGES_SCHEDULE_OPTIONS.daysAfterFill}`,
    defaultMessage: 'Send {days} days after the session is completed',
  },
});
