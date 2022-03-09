import { CalendarData } from 'models/Tlfb';

import { CalendarDataResponseItem } from './types';

export const mapCalendarDataResponse = (
  calendarDataResponse: CalendarDataResponseItem[],
): CalendarData =>
  calendarDataResponse.reduce(
    (calendarData: CalendarData, { date, events, substances }) => ({
      ...calendarData,
      [date]: {
        events,
        answer: substances?.[0],
      },
    }),
    {},
  );
