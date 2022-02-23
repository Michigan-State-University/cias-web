import { Dayjs } from 'dayjs';

import { DayData } from 'models/Tlfb';

export type CalendarData = Record<string, DayData>;

export type CalendarRef = {
  setMonth: (month: Dayjs) => void;
};
