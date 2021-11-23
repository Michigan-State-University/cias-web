/*
 * TextMessageScheduling
 *
 * This contains all the text for the TextMessageScheduling.
 */
import { defineMessages } from 'react-intl';

import {
  TextMessageScheduleOption,
  TextMessageScheduleFrequency,
} from 'models/TextMessage';

export const scope = 'app.containers.TextMessageScheduling';

export default defineMessages({
  [TextMessageScheduleOption.DAYS_AFTER_FILL]: {
    id: `${scope}.${TextMessageScheduleOption.DAYS_AFTER_FILL}`,
    defaultMessage: 'Send [X] days after session completed date',
  },
  [TextMessageScheduleOption.AFTER_FILL]: {
    id: `${scope}.${TextMessageScheduleOption.AFTER_FILL}`,
    defaultMessage: 'Send immediately after session completion',
  },
  send: {
    id: `${scope}.send`,
    defaultMessage: 'Send',
  },
  number: {
    id: `${scope}.number`,
    defaultMessage: 'Number',
  },
  frequency: {
    id: `${scope}.frequency`,
    defaultMessage: 'Frequency:',
  },
  sendDays: {
    id: `${scope}.sendDays`,
    defaultMessage: 'days after the session is completed',
  },
  [TextMessageScheduleFrequency.ONCE]: {
    id: `${scope}.${TextMessageScheduleFrequency.ONCE}`,
    defaultMessage: 'Once',
  },
  [TextMessageScheduleFrequency.ONCE_DAY]: {
    id: `${scope}.${TextMessageScheduleFrequency.ONCE_DAY}`,
    defaultMessage: 'Once a day',
  },
  [TextMessageScheduleFrequency.ONCE_WEEK]: {
    id: `${scope}.${TextMessageScheduleFrequency.ONCE_WEEK}`,
    defaultMessage: 'Once a week',
  },
  [TextMessageScheduleFrequency.ONCE_MONTH]: {
    id: `${scope}.${TextMessageScheduleFrequency.ONCE_MONTH}`,
    defaultMessage: 'Once a month',
  },
  finishBy: {
    id: `${scope}.finishBy`,
    defaultMessage: 'finish by ',
  },
  date: {
    id: `${scope}.date`,
    defaultMessage: 'Date',
  },
  provideDate: {
    id: `${scope}.provideDate`,
    defaultMessage: 'Provide completion date',
  },
});
