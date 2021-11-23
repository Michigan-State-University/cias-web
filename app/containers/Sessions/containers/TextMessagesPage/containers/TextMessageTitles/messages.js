/*
 * TextMessageTiles
 *
 * This contains all the text for the TextMessageTiles container.
 */
import { defineMessages } from 'react-intl';

import { TextMessageScheduleOption } from 'models/TextMessage';

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
  [TextMessageScheduleOption.AFTER_FILL]: {
    id: `${scope}.${TextMessageScheduleOption.AFTER_FILL}`,
    defaultMessage: 'Send after the session is completed',
  },
  [TextMessageScheduleOption.DAYS_AFTER_FILL]: {
    id: `${scope}.${TextMessageScheduleOption.DAYS_AFTER_FILL}`,
    defaultMessage: 'Send {days} days after the session is completed',
  },
  alertMessageDescription: {
    id: `${scope}.alertMessageDescription`,
    defaultMessage: 'Send an alert to the specified number.',
  },
});
