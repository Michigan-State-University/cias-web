import { defineMessages } from 'react-intl';

import { SessionSchedule } from 'models/Session';

export const scope = 'app.global.SessionSchedules';

export default defineMessages<SessionSchedule>({
  [SessionSchedule.AFTER_FILL]: {
    id: `${scope}.after_fill`,
    defaultMessage: 'Complete the previous module to unlock this one.',
  },
  [SessionSchedule.EXACT_DATE]: {
    id: `${scope}.exact_date`,
    defaultMessage:
      'This module will be available on <secondaryColorBold>{scheduleAt}</secondaryColorBold> upon completion of the previous module.',
  },
  [SessionSchedule.DAYS_AFTER_FILL]: {
    id: `${scope}.days_after_fill`,
    defaultMessage:
      'This module will be available <secondaryColorBold>{schedulePayload} days</secondaryColorBold> after filling in the previous module.',
  },
  [SessionSchedule.DAYS_AFTER]: {
    id: `${scope}.days_after`,
    defaultMessage:
      'This module will be available when you finish previous module and <secondaryColorBold>{schedulePayload} day</secondaryColorBold> after previous session is available.',
  },
  [SessionSchedule.DAYS_AFTER_DATE]: {
    id: `${scope}.days_after_date`,
    defaultMessage:
      'This module will be available <secondaryColorBold>{schedulePayload} days</secondaryColorBold>, after the date provided in a previous module.',
  },
  [SessionSchedule.IMMEDIATELY]: {
    id: `${scope}.immediately`,
    defaultMessage:
      'This module will start immediately when you finish previous module.',
  },
});
