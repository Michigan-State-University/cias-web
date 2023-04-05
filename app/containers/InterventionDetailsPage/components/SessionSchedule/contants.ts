import { SessionSchedule } from 'models/Session';

import { formatMessage } from 'utils/intlOutsideReact';

import { SessionScheduleOption } from './types';
import messages from './messages';

export const SESSION_SCHEDULE_OPTIONS: Record<
  SessionSchedule,
  SessionScheduleOption
> = {
  [SessionSchedule.AFTER_FILL]: {
    id: SessionSchedule.AFTER_FILL,
    label: formatMessage(messages[SessionSchedule.AFTER_FILL]),
  },
  [SessionSchedule.DAYS_AFTER]: {
    id: SessionSchedule.DAYS_AFTER,
    label: formatMessage(messages[SessionSchedule.DAYS_AFTER]),
  },
  [SessionSchedule.DAYS_AFTER_FILL]: {
    id: SessionSchedule.DAYS_AFTER_FILL,
    label: formatMessage(messages[SessionSchedule.DAYS_AFTER_FILL]),
  },
  [SessionSchedule.DAYS_AFTER_DATE]: {
    id: SessionSchedule.DAYS_AFTER_DATE,
    label: formatMessage(messages[SessionSchedule.DAYS_AFTER_DATE]),
  },
  [SessionSchedule.EXACT_DATE]: {
    id: SessionSchedule.EXACT_DATE,
    label: formatMessage(messages[SessionSchedule.EXACT_DATE]),
  },
  [SessionSchedule.IMMEDIATELY]: {
    id: SessionSchedule.IMMEDIATELY,
    label: formatMessage(messages[SessionSchedule.IMMEDIATELY]),
  },
};
