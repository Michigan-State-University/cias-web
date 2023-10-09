import { defineMessages } from 'react-intl';

import { SessionSchedule } from 'models/Session';

export const scope = 'app.global.SessionSchedules';

export default defineMessages<SessionSchedule>({
  after_fill: {
    id: `${scope}.after_fill`,
    defaultMessage:
      'This module will be available when you finish previous module',
  },
  exact_date: {
    id: `${scope}.exact_date`,
    defaultMessage:
      'This module will be available on <secondaryColorBold>{scheduleAt}</secondaryColorBold> and when you finish previous module',
  },
  days_after_fill: {
    id: `${scope}.days_after_fill`,
    defaultMessage:
      'This module will be available <secondaryColorBold>{schedulePayload} days</secondaryColorBold> after filling in the previous module',
  },
  days_after: {
    id: `${scope}.days_after`,
    defaultMessage:
      'This module will be available when you finish previous module and <secondaryColorBold>{schedulePayload} day</secondaryColorBold> after previous session is available',
  },
  days_after_date: {
    id: `${scope}.days_after_date`,
    defaultMessage:
      'This module will be available <secondaryColorBold>{schedulePayload} days</secondaryColorBold> after date provided in previous session in this intervention',
  },
  immediately: {
    id: `${scope}.immediately`,
    defaultMessage:
      'This module will start immediately when you finish previous module',
  },
});
