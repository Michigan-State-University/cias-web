/*
 * TextMessageScheduling
 *
 * This contains all the text for the TextMessageScheduling.
 */
import { defineMessages } from 'react-intl';

import {
  MESSAGES_SCHEDULE_OPTIONS,
  MESSAGES_SCHEDULE_FREQUENCIES,
} from 'models/TextMessage';

export const scope = 'app.containers.TextMessageScheduling';

export default defineMessages({
  [MESSAGES_SCHEDULE_OPTIONS.daysAfterFill]: {
    id: `${scope}.${MESSAGES_SCHEDULE_OPTIONS.daysAfterFill}`,
    defaultMessage: 'Send [X] days after session completed date',
  },
  [MESSAGES_SCHEDULE_OPTIONS.afterFill]: {
    id: `${scope}.${MESSAGES_SCHEDULE_OPTIONS.afterFill}`,
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
  [MESSAGES_SCHEDULE_FREQUENCIES.once]: {
    id: `${scope}.${MESSAGES_SCHEDULE_FREQUENCIES.once}`,
    defaultMessage: 'Once',
  },
  [MESSAGES_SCHEDULE_FREQUENCIES.onceDay]: {
    id: `${scope}.${MESSAGES_SCHEDULE_FREQUENCIES.onceDay}`,
    defaultMessage: 'Once a day',
  },
  [MESSAGES_SCHEDULE_FREQUENCIES.onceWeek]: {
    id: `${scope}.${MESSAGES_SCHEDULE_FREQUENCIES.onceWeek}`,
    defaultMessage: 'Once a week',
  },
  [MESSAGES_SCHEDULE_FREQUENCIES.onceMonth]: {
    id: `${scope}.${MESSAGES_SCHEDULE_FREQUENCIES.onceMonth}`,
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
